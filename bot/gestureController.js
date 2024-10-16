class GestureController {
    constructor() {
        this.gestureMap = {
            hello: 'wave',
            yes: 'nod',
            no: 'shake_head',
            thanks: 'thumbs_up',
            // Add more gesture mappings here
        };
    }

    getGestureFromMessage(messageText) {
        // Return the corresponding gesture or null if not found
        return this.gestureMap[messageText] || null;
    }
}

module.exports.GestureController = GestureController;
