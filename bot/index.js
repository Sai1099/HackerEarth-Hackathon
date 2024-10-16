const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { ASLBot } = require('./bot');
const { asyncHandler } = require('../../utils/asyncHandler');

// Environment variables
require('dotenv').config();

// Create the adapter to handle incoming requests from Microsoft Teams
const adapter = new BotFrameworkAdapter({
    appId: process.env.BOT_APP_ID,
    appPassword: process.env.BOT_APP_PASSWORD
});

// Create the bot
const bot = new ASLBot();

// Handle errors
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    await context.sendActivity('Oops. Something went wrong!');
};

// Create HTTP server
const server = restify.createServer();
server.listen(process.env.port || 3978, () => {
    console.log(`\nBot is running on port ${server.url}`);
    console.log(server.url);
    
});

// Listen for incoming activities from Microsoft Teams

server.post('/api/messages',  (req,res,next)=>{
    try {
        adapter.processActivity(req, res, async (context) => {
             await bot.run(context);
    })}
     catch (error) {
        
    }
})
// server.post('/api/messages', async(req, res,next) => {
//     try {
//         adapter.processActivity(req, res, async (context) => {
//             await bot.run(context);
//         });
//         next();
//     } catch (error) {
//         throw new Error('Error in process activity')
//     }
// });
