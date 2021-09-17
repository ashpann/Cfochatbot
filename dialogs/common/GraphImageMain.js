const { CardFactory, ActivityTypes } = require('botbuilder');
const {
    Dialog,
    DialogSet,
    WaterfallDialog,
    ComponentDialog,
    DialogTurnStatus
} = require('botbuilder-dialogs');

const graphImageWaterfall = "graphImageWaterfall"
const config = require('../../utility/config')
const graphImageCard = require('../../cards/common/graphImageCard')
const serviceList = require('../../cards/common/serviceList')

class graphImageMain extends ComponentDialog {
    constructor(userData) {
        super(graphImageWaterfall);
        this.addDialog(new WaterfallDialog(graphImageWaterfall, [
            this.graphImageMainStep1.bind(this),
            this.graphImageMainStep2.bind(this)
        ]));
        this.initialDialogId = graphImageWaterfall
    }
    async graphImageMainStep1(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        if (step.context.activity.value && step.context.activity.value.action === config.purchaseManagerServiceList[0]) {
            var cardToSend = await graphImageCard.graphImage(config.logoToDisplay[0], config.purchaseManagerServiceList[0])
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToSend)] })
            await (1000);
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
        } else if (step.context.activity.value && step.context.activity.value.action === config.purchaseManagerServiceList[1]) {
            var cardToSend = await graphImageCard.graphImage(config.logoToDisplay[0], config.purchaseManagerServiceList[1])
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToSend)] })
            await (1000);
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
        } else if (step.context.activity.value && step.context.activity.value.action === config.purchaseManagerServiceList[2]) {
            var cardToSend = await graphImageCard.graphImage(config.logoToDisplay[0], config.purchaseManagerServiceList[2])
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(cardToSend)] })
            await (1000);
            await step.context.sendActivity({ attachments: [CardFactory.adaptiveCard(serviceList.cardToDisplay(config.purchaseManagerServiceList))] })
        } else {
            await step.next()
        }
        return Dialog.EndOfTurn
    }
    async graphImageMainStep2(step) {
        await step.context.sendActivity({ type: ActivityTypes.Typing });
        return await step.beginDialog('mainWaterfall', step.options)
    }
}

module.exports.graphImageMain = graphImageMain
module.exports.graphImageWaterfall = graphImageWaterfall