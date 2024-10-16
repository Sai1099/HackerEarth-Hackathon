const { ActivityHandler, MessageFactory } = require('botbuilder');
const { AzureSpeechService } = require('./speechService');
const { GestureController } = require('./gestureController');

class ASLBot extends ActivityHandler {
    constructor() {
        super();

        // Initialize speech service and gesture controller
        this.speechService = new AzureSpeechService();
        this.gestureController = new GestureController();

        // Handle incoming messages
        this.onMessage(async (context, next) => {
            try {
                const messageText = context.activity.text.toLowerCase();
                console.log(`Received message: ${messageText}`);

                // Transcribe speech (optional, depending on need)
                const transcription = await this.speechService.transcribeMessage(messageText);

                // Match transcription with an avatar gesture
                const gesture = this.gestureController.getGestureFromMessage(transcription);

                if (gesture) {
                    await context.sendActivity(`Gesture "${gesture}" triggered for: "${messageText}".`);
                    // Trigger the avatar gesture logic here (communicate with frontend if needed)
                } else {
                    await context.sendActivity(`No gesture found for: "${messageText}".`);
                }

                // Continue with next middleware
                await next();
            } catch (error) {
                console.error('Error handling message:', error);
                await context.sendActivity('There was an error processing your request.');
            }
        });

        // Welcome message for new users
        this.onMembersAdded(async (context, next) => {
            const welcomeText = 'Welcome to the ASL-Captioning Bot! Type a message to see it in ASL.';
            await context.sendActivity(MessageFactory.text(welcomeText));
            await next();
        });
    }
}

module.exports.ASLBot = ASLBot;
