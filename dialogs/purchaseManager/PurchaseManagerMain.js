const { CardFactory, ActivityTypes } = require('botbuilder');
const {
    Dialog,
    DialogSet,
    WaterfallDialog,
    ComponentDialog,
    DialogTurnStatus
} = require('botbuilder-dialogs');

const serviceList = require('../../cards/common/serviceList')
const timeOut = require('../../utility/timeout')
const config = require('../../utility/config')
const graphImageCard = require('../../cards/common/graphImageCard')

const purchaseManagerWaterfall = 'purchaseManagerWaterfall'


class purchaseManagerMain extends ComponentDialog {
    constructor(userData) {
        super(purchaseManagerWaterfall);
        this.userData = userData
        this.addDialog(new WaterfallDialog(purchaseManagerWaterfall, [
            this.purchaseManagerWaterfallStep1.bind(this),
            this.purchaseManagerWaterfallStep2.bind(this)
        ]));
        this.initialDialogId = purchaseManagerWaterfall
    }
    async purchaseManagerWaterfallStep1(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            // let accountDetails = await this.userData.get(step.context);
            var cardToSend = await graphImageCard.graphImage(config.logoToDisplay[0], config.purchaseManagerServiceList[0])
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToSend)] })
            await (1000);
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })

        } catch (error) {
            console.error();
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
        }
        return Dialog.EndOfTurn
    }
    async purchaseManagerWaterfallStep2(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        try {
            let accountDetails = await this.userData.get(step.context);
            accountDetails.Id = null
            accountDetails.accountId = null
            accountDetails.accountName = null
            await this.userData.set(step.context, accountDetails);
        } catch (error) {
            console.error(error);
        }
        return await step.replaceDialog('mainWaterfall', { "persona": config.personaList[0].nameToDisplay })
    }
}

module.exports.purchaseManagerMain = purchaseManagerMain
module.exports.purchaseManagerWaterfall = purchaseManagerWaterfall
