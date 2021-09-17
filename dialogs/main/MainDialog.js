const { CardFactory, ActivityTypes, InputHints, TeamsInfo, TurnContext } = require('botbuilder');
const { LuisRecognizer } = require('botbuilder-ai');
const {
    Dialog,
    DialogSet,
    WaterfallDialog,
    ComponentDialog,
    DialogTurnStatus
} = require('botbuilder-dialogs');

// importing all the required files for working of bot
const personaCard = require('../../cards/personaCard')
const config = require('../../utility/config')
const poData = require('../../data/database/purchaseManager/poData')
const databaseConnection = require('../../data/database/DatabaseConnection')

const { purchaseManagerMain, purchaseManagerWaterfall } = require('../purchaseManager/PurchaseManagerMain')
const { prMain, prWaterfall } = require('../purchaseManager/PRMain')
const { poMain, poWaterfall } = require('../purchaseManager/POMain')
const { CFOMain, CFOWaterfall } = require('../cfo/CFOMain')
const { teamMain, teamWaterfall } = require('../common/teamMemberMain')
const { graphImageMain, graphImageWaterfall } = require('../common/GraphImageMain')
const detailCard = require('../../cards/common/detailCard')


// declaring dialog variable
const mainWaterfall = 'mainWaterfall';

class MainDialog extends ComponentDialog {
    constructor(conversationState, luisRecognizer) {
        super(mainWaterfall);
        this.userData = conversationState.createProperty('USER_PROFILE_PROPERTY'); //creating property to store user details
        // configuring luis
        this.recognizer = luisRecognizer
        this.topIntent = 'test'
        // initializing all classes
        this.addDialog(new purchaseManagerMain(this.userData))
        this.addDialog(new prMain(this.userData))
        this.addDialog(new poMain(this.userData))
        this.addDialog(new CFOMain(this.userData))
        this.addDialog(new teamMain(this.userData))
        this.addDialog(new graphImageMain(this.userData))
        this.addDialog(new WaterfallDialog(mainWaterfall, [
            this.mainDialogStep1.bind(this),
            this.mainDialogStep2.bind(this),
            this.mainDialogStep3.bind(this)
        ]));

        this.initialDialogId = mainWaterfall
    }
    // function to continue flow
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);
        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }
    async mainDialogStep1(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context) // creating object to store details of account
            if (accountDetails === undefined) {
                accountDetails = {}
                await this.userData.set(step.context, accountDetails)
            }
            if (step.context.activity.value === undefined) {
                step.context.activity.value = {}
            }
            if (step.context.activity.text) {
                var luisResult = await this.recognizer.recognize(step.context) // recognizing luis results
                this.topIntent = await LuisRecognizer.topIntent(luisResult); //extracting intent from it
                // checking intent or action to move to next flow
                if (this.topIntent) {
                    step.context.activity.value.action = this.topIntent.replace(/_/g, " ") // assigning intent value to action to ease flow
                    await step.next();
                } else {
                    await step.next();
                }
            }
            else {// if nothing matches show persona card
                if (step.context.activity.value && step.context.activity.value.id) {
                    accountDetails.Id = step.context.activity.value.id
                    await this.userData.set(step.context, accountDetails)
                }
                await step.next();
            }
        } catch (error) {
            console.error("---", error);
            await step.context.sendActivity("I'm still learning, could not understand this. Here are few options you can try!");
            return await this.beginDialog('mainWaterfall')
        }

        return Dialog.EndOfTurn
    }
    async mainDialogStep2(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context)
            if (step.context.activity.value && step.context.activity.value.action) {
                // console.log(step.context.activity.value.action)
                switch (step.context.activity.value.action) {
                    // routing personas
                    case config.personaList[0].nameToDisplay:
                        return await step.beginDialog('purchaseManagerWaterfall', step.options)
                    case config.personaList[1].nameToDisplay:
                        return await step.beginDialog('CFOWaterfall', step.options)

                    // routing services in purchase manager persona
                    case config.purchaseManagerServiceList[0]: case config.purchaseManagerServiceList[1]: case config.purchaseManagerServiceList[2]:
                        return await step.beginDialog('graphImageWaterfall', step.options)
                    case config.purchaseManagerServiceList[3]:
                        return await step.beginDialog('teamWaterfall', step.options)
                    case config.purchaseManagerServiceList[4]: case config.listCardAction.pr:
                        if (step.context.activity.value.id) {
                            accountDetails.prId = step.context.activity.value.id
                        }
                        return await step.beginDialog('prWaterfall', step.options)
                    case config.purchaseManagerServiceList[5]: case config.listCardAction.po:
                        if (step.context.activity.value.id) {
                            accountDetails.poId = step.context.activity.value.id
                        }
                        return await step.beginDialog('poWaterfall', step.options) 
                        
                    // routing default persona
                    default:
                        await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(personaCard.cardToDisplay(step.context.activity.from.name))] })
                }
            }  
            else {
                return await step.replaceDialog('mainWaterfall')
            }
        } catch (error) {
            console.error(error);
        }
        return Dialog.EndOfTurn
    }
    async mainDialogStep3(step) {
        return await step.beginDialog('mainWaterfall', { "persona": "mainWaterfall" })
    }
}

module.exports.MainDialog = MainDialog;
module.exports.mainWaterfall = mainWaterfall



