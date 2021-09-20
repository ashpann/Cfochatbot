const { CardFactory, ActivityTypes, TurnContext } = require('botbuilder');
const {
    Dialog,
    DialogSet,
    WaterfallDialog,
    ComponentDialog,
    DialogTurnStatus
} = require('botbuilder-dialogs');

const listCard = require('../../cards/common/listCard')
const detailCard = require('../../cards/common/detailCard')
const config = require('../../utility/config')
const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const prData = require('../../data/database/purchaseManager/prData')

const prWaterfall = 'prWaterfall'

class prMain extends ComponentDialog {
    constructor(userData) {
        super(prWaterfall)
        this.userData = userData;

        this.addDialog(new WaterfallDialog(prWaterfall, [
            this.prWaterfallStep1.bind(this),
            this.prWaterfallStep2.bind(this),
            this.prWaterfallStep3.bind(this)
        ]));

        this.initialDialogId = prWaterfall
    }

    async prWaterfallStep1(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        let accountDetails = await this.userData.get(step.context);
        try {
            if (accountDetails && accountDetails.Id) {
                await step.next()
            } else {
                let result = await prData.getPRData()
                console.log("data is: ", result);
                if ((result.length > 0) && (result !== config.errorMessage)) {
                    let cardToSend = await listCard.itemListCard(result, config.logoToDisplay[0],
                        config.cardTitle.prListCard, config.listCardAction.pr)
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToSend)] })
                    await timeOut.timeout(1000);
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
                } else {
                    await step.context.sendActivity("No Purchase Requisition found, Please try again!")
                }
            }
        } catch (error) {
            console.error(error);
            await step.context.sendActivity("Error occured while showing Purchase Requisition List, Please try again!")
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
        }
        return Dialog.EndOfTurn
    }
    async prWaterfallStep2(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context);
            if ((step.context.activity.value && step.context.activity.value.action === config.listCardAction.pr) || accountDetails.Id) {
                if (step.context.activity.value.action === config.listCardAction.pr) {
                    accountDetails.Id = step.context.activity.value.id
                    await this.userData.set(step.context, accountDetails);
                }
                let result = await prData.getPRData(accountDetails.Id)
                if ((result.length > 0) && (result !== config.errorMessage)) {

                    let cardToSend = await detailCard.detailCard(result[0], config.poDetailCard, 'po', config.logoToDisplay[0],
                        config.cardTitle.poDetailCard)
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToSend)] })

                    await timeOut.timeout(1000);
                    
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
                } else {
                    await step.context.sendActivity("No Purchase Requisition found with given details. Here are some Purchase Requisition you might want to see!")
                    accountDetails.Id = null
                    await this.userData.set(step.context, accountDetails)
                    return await step.beginDialog(this.id, step.options)
                }
            } else {
                await step.next()
            }
        } catch (error) {
            console.error(error);
            await step.context.sendActivity("Error occured while showing Purchase Requistion Detail, Please try again!")
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
        }
        return Dialog.EndOfTurn
    }
    async prWaterfallStep3(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context);
            if ((step.context.activity.value && step.context.activity.value.action === config.listCardAction.pr)) {
                accountDetails.Id = step.context.activity.value.id
                await this.userData.set(step.context, accountDetails);
            } else {
                accountDetails.Id = null
                await this.userData.set(step.context, accountDetails)
            }
        } catch (error) {
            console.error(error);
        }
        return await step.beginDialog('mainWaterfall', { "persona": config.personaList[2].nameToDisplay })
    }
}

module.exports.prMain = prMain
module.exports.prWaterfall = prWaterfall