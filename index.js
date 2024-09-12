const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Create adapter.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Create server.
const server = restify.createServer();
server.listen(process.env.port || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === 'message') {
            await context.sendActivity(`You said '${context.activity.text}'`);
        }
    });
});
