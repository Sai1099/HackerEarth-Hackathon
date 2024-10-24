import React, { useState, useEffect, useRef } from 'react';
import { useMeeting } from '../contexts/MeetingContext';
import CaptioningOverlay from './CaptioningOverlay';
import ASLInterpreter from './ASLInterpreter';
import VideoStream from './VideoStream';
import WebRTCService from '../services/webrtc';

const MeetingRoom = () => {
  const {
    isCaptioning,
    isASLEnabled,
    captionSettings,
    aslSettings,
  } = useMeeting();
  const [participants, setParticipants] = useState([]);
  const [speechText, setSpeechText] = useState('');
  const localVideoRef = useRef();

  useEffect(() => {
    const initializeRoom = async () => {
      try {
        // Initialize WebRTC
        const localStream = await WebRTCService.initialize();
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        // Set up WebRTC callbacks
        WebRTCService.onParticipantJoinedCallback = (participantId, stream) => {
          setParticipants(prev => [
            ...prev,
            { id: participantId, stream }
          ]);
        };

        WebRTCService.onParticipantLeftCallback = (participantId) => {
          setParticipants(prev =>
            prev.filter(p => p.id !== participantId)
          );
        };

      } catch (error) {
        console.error('Error initializing meeting room:', error);
      }
    };

    initializeRoom();

    return () => {
      WebRTCService.cleanup();
    };
  }, []);

  // Handle speech recognition updates
  const handleSpeechUpdate = (text) => {
    setSpeechText(text);
  };

  return (
    <div className="relative w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VideoStream
          ref={localVideoRef}
          className="w-full h-64 bg-black rounded-lg"
          autoPlay
          muted
        />
        {participants.map((participant) => (
          <VideoStream
            key={participant.id}
            stream={participant.stream}
            className="w-full h-64 bg-black rounded-lg"
          />
        ))}
      </div>
      
      {isCaptioning && (
        <CaptioningOverlay
          settings={captionSettings}
          onSpeechUpdate={handleSpeechUpdate}
        />
      )}
      {isASLEnabled && (
        <ASLInterpreter
          settings={aslSettings}
          speechText={speechText}
        />
      )}
    </div>
  );
};