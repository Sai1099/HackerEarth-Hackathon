document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Send message to the bot when the button is clicked
    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        if (message) {
            sendMessageToBot(message);
            messageInput.value = '';
        }
    });
});

function sendMessageToBot(message) {
    // Simulate sending a message to the bot (you'd typically connect via API)
    console.log(`Sending message to bot: ${message}`);
    // Insert logic to communicate with bot server (via REST API, WebSocket, etc.)
}
