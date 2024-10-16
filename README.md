# HackerEarth-Hackathon
# ASL-Captioning-Solution

A Microsoft Teams bot that provides real-time American Sign Language (ASL) interpretation and automated closed captioning, using Azure Cognitive Services.

## Project Setup

### Prerequisites

- Node.js installed
- Azure Cognitive Services for Speech-to-Text
- Microsoft Teams developer account (for bot registration)
- Microsoft Bot Framework SDK

### Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/your-username/ASL-Captioning-Solution.git
    cd ASL-Captioning-Solution
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables in a `.env` file:
    ```bash
    BOT_APP_ID=your-bot-app-id
    BOT_APP_PASSWORD=your-bot-app-password
    AZURE_SPEECH_KEY=your-azure-speech-key
    AZURE_REGION=your-azure-region
    ```

4. Update your bot configuration:
    - Edit `config/botConfig.json` with your bot app credentials.
    - Edit `config/azureConfig.json` with your Azure Speech-to-Text settings.

5. Run the bot:
    ```bash
    npm start
    ```

6. Navigate to `http://localhost:3978` to interact with the bot through the Microsoft Teams platform.

### Features

- **Real-Time ASL Interpretation**: Converts spoken or typed text into American Sign Language using an avatar.
- **Closed Captioning**: Automatically generates captions for meetings using Azure Speech-to-Text.
- **User-Friendly**: Customizable interface for accessibility.

### To Do

- Implement additional ASL gestures.
- Improve avatar animations and interactions.
