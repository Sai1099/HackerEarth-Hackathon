
export const AvatarGestures = {
    triggerGesture(avatar, gesture) {
        // Define gesture-based animations here (e.g., play specific animations based on gesture input)
        switch (gesture) {
            case 'wave':
                // Add logic to trigger waving animation
                console.log('Waving...');
                break;
            case 'nod':
                // Add logic to trigger nodding animation
                console.log('Nodding...');
                break;
            // Add more cases for other gestures
            default:
                console.log(`Unknown gesture: ${gesture}`);
                break;
        }
    }
};
