const restify = require('restify');
const path = require('path');
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

// import required classes and dialogs
const { BotFrameworkAdapter, ConversationState, MemoryStorage, UserState } = require('botbuilder');
const { DialogBot } = require('./bot/Bot');
const { MainDialog } = require('./dialogs/main/MainDialog');
const { LuisRecognizer } = require('botbuilder-ai');

// adapter to access bot details
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// defining various states to converse data during conversation
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

//luis recognizer initiate
const luisRecognizer = new LuisRecognizer({
    applicationId: process.env.LuisAppId,
    endpointKey: process.env.LuisAPIKey,
    endpoint: process.env.LuisAPIHostName
}, {
    includeAllIntents: true,
    includeInstanceData: true
}, true);

// initializing class and dialogs
const dialog = new MainDialog(conversationState, luisRecognizer);
const bot = new DialogBot(conversationState, userState, dialog);

// creating server to run bot
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3979, function () {
    console.log(`\n${server.name} listening to ${server.url}.`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

// handle all unhandled error or bug in code
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${error}`);

    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${error}`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    await context.sendActivity(`I was unable to understand this, I'm still learing. Please try with following options`);
    await conversationState.delete(context);
};



// route to send and recieve bot messages
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});