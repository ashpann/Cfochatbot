const { CardFactory, ActivityTypes, MessageFactory } = require('botbuilder');
const {
    Dialog,
    DialogSet,
    WaterfallDialog,
    ComponentDialog,
    DialogTurnStatus
} = require('botbuilder-dialogs');

const teamCard = require('../../cards/common/teamCard')
const config = require('../../utility/config')
const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const teamData = require('../../data/database/common/teamData')

const teamWaterfall = 'teamWaterfall'

class teamMain extends ComponentDialog {
    constructor(userData) {
        super(teamWaterfall)
        this.userData = userData;

        this.addDialog(new WaterfallDialog(teamWaterfall, [
            this.teamWaterfallStep1.bind(this),
            this.teamWaterfallStep2.bind(this)
        ]));

        this.initialDialogId = teamWaterfall
    }

    async teamWaterfallStep1(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        let accountDetails = await this.userData.get(step.context);
        try {
            if (step.context.activity && step.context.activity.text) {
                if (step.context.activity.text.toLowerCase().includes('purchase')) {
                    step.options.persona = config.personaList[0].nameToDisplay
                    var cardsResult = await teamCard.teamCard('procurement', config.procurmentTeamCard)
                    await step.context.sendActivity(MessageFactory.carousel(cardsResult));
                    await timeOut.timeout(1000);
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
                } 
            }
            else if ((step.options.persona === config.personaList[0].nameToDisplay)) {
                var cardsResult = await teamCard.teamCard('procurement', config.procurmentTeamCard)
                step.options.persona = config.personaList[0].nameToDisplay
                await step.context.sendActivity(MessageFactory.carousel(cardsResult));
                await timeOut.timeout(1000);
                await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
            }
        } catch (error) {
            console.error(error);
            await step.context.sendActivity("Error occured while showing team List, Please try again!")
        }
        return Dialog.EndOfTurn
    }
    async teamWaterfallStep2(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        let accountDetails = await this.userData.get(step.context);
        if ((step.context.activity && step.context.activity.text && (step.context.activity.text.toLowerCase().includes('purchase')) || (step.options.persona === config.personaList[2].nameToDisplay))) {
            return await step.beginDialog('mainWaterfall', { "persona": config.personaList[0].nameToDisplay })
        } else {
            return await step.beginDialog('mainWaterfall', { "persona": config.personaList[0].nameToDisplay })
        }
    }

}

module.exports.teamMain = teamMain
module.exports.teamWaterfall = teamWaterfall