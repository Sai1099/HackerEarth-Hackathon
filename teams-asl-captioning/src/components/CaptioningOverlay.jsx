import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const CaptioningOverlay = ({ settings }) => {
  const { captions, isListening } = useSpeechRecognition();

  return (
    <div
      className="absolute bottom-0 left-0 right-0 p-4"
      style={{
        fontSize: `${settings.fontSize}px`,
        color: settings.color,
        backgroundColor: `${settings.backgroundColor}99`,
      }}
    >
      <div className="text-center">
        {isListening ? captions : 'Speech recognition is not active'}
      </div>
    </div>
  );
};