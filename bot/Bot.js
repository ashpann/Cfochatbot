const { ActivityHandler,TurnContext } = require("botbuilder");

class DialogBot extends ActivityHandler {
    constructor(conversationState, userState, dialog) {
        super();
        if (!conversationState) throw new Error('ConversationState is required')
        if (!userState) throw new Error('UserState is required')
        if (!dialog) throw new Error('Dialog is required')

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');
        this.onMessage(async (context, next) => {
            await this.dialog.run(context, this.dialogState);
            await next();
        });
        this.onMembersAdded(async (context, next) => {
            for (const idx in context.activity.membersAdded) {
                if (context.activity.membersAdded[idx].id !== context.activity.recipient.id) {
                    await context.sendActivity(`Welcome to **CRM and ERP Bot**!`)
                    await context.sendActivity("I can help you to manage your accounts, access various KPIs, Create Opportunities and much more.")
                    await context.sendActivity("To access my all capabilities, type anything and get started!")
                }
            }
            await next();
        })
    }
    async run(context) {
        await super.run(context);
        await this.conversationState.saveChanges(context, this);
        await this.userState.saveChanges(context, this);
    }
}
module.exports.DialogBot = DialogBot;
