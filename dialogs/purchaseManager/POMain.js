const { BotFrameworkAdapter, CardFactory, TurnContext, ActivityTypes } = require('botbuilder');
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
const poData = require('../../data/database/purchaseManager/poData')
const poWaterfall = 'poWaterfall'

class poMain extends ComponentDialog {
    constructor(userData) {
        super(poWaterfall)
        this.userData = userData;

        this.addDialog(new WaterfallDialog(poWaterfall, [
            this.poWaterfallStep1.bind(this),
            this.poWaterfallStep2.bind(this),
            this.poWaterfallStep3.bind(this)
        ]));

        this.initialDialogId = poWaterfall
    }

    async poWaterfallStep1(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        let accountDetails = await this.userData.get(step.context);
        try {
            if (accountDetails && accountDetails.Id) {
                await step.next()
            } else {
                let result = await poData.getPOData()
                if ((result.length > 0) && (result !== config.errorMessage)) {
                    let cardToSend = await listCard.itemListCard(result, config.logoToDisplay[0],
                        config.cardTitle.poListCard, config.listCardAction.po)
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToSend)] })
                    await timeOut.timeout(1000);
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
                } else {
                    await step.context.sendActivity("No Purchase Order found, Please try again!")
                }
            }
        } catch (error) {
            console.error(error);
            await step.context.sendActivity("Error occured while showing Purchase Order List, Please try again!")
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
        }
        return Dialog.EndOfTurn
    }
    async poWaterfallStep2(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context);
            if ((step.context.activity.value && step.context.activity.value.action === config.listCardAction.po) || accountDetails.Id) {
                if (step.context.activity.value.action === config.listCardAction.po) {
                    accountDetails.Id = step.context.activity.value.id
                    await this.userData.set(step.context, accountDetails);
                }
                let result = await poData.getPOData(accountDetails.Id)
                if ((result.length > 0) && (result !== config.errorMessage)) {

                    let cardToSend = await detailCard.detailCard(result[0], config.poDetailCard, 'po', config.logoToDisplay[0],
                        config.cardTitle.poDetailCard, config.poDetailCardButtons[0])
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToSend)] })

                    await timeOut.timeout(1000);
                    await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
                } else {
                    await step.context.sendActivity("No Purchase Order found with given details. Here are some Purchase Orders you might want to see!")
                    accountDetails.Id = null
                    await this.userData.set(step.context, accountDetails)
                    return await step.beginDialog(this.id, step.options)
                }
            } else {
                await step.next()
            }
        } catch (error) {
            console.error(error);
            await step.context.sendActivity("Error occured while showing Purchase Order Detail, Please try again!")
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
        }
        return Dialog.EndOfTurn
    }


    async poWaterfallStep3(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context);
            let result = await poData.getPOData(accountDetails.Id)

            if ((step.context.activity.value && step.context.activity.value.action === config.listCardAction.po)) {
                accountDetails.Id = step.context.activity.value.id
                await this.userData.set(step.context, accountDetails);
            } else if ((step.context.activity.value && step.context.activity.value.action === config.detailCardAction[0])) {
                accountDetails.Id = step.context.activity.value.id
                await this.userData.set(step.context, accountDetails);
            } else if ((step.context.activity.value && step.context.activity.value.action === config.detailCardAction[1])) {
                accountDetails.Id = step.context.activity.value.id
                await this.userData.set(step.context, accountDetails);
            }
            else {
                accountDetails.Id = null
                await this.userData.set(step.context, accountDetails)
            }
        } catch (error) {
            console.error(error);
        }
        return await step.beginDialog('mainWaterfall', { "persona": config.personaList[2].nameToDisplay })
    }
}

module.exports.poMain = poMain
module.exports.poWaterfall = poWaterfall


