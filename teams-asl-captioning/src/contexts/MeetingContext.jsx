import React, { createContext, useState, useContext, useEffect } from 'react';

const MeetingContext = createContext();

export const useMeeting = () => useContext(MeetingContext);

export const MeetingProvider = ({ children }) => {
  const [isCaptioning, setIsCaptioning] = useState(false);
  const [isASLEnabled, setIsASLEnabled] = useState(false);
  const [captionSettings, setCaptionSettings] = useState({
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
  });
  const [aslSettings, setASLSettings] = useState({
    interpreterPosition: 'right',
    interpreterSize: 'medium',
  });

  const value = {
    isCaptioning,
    setIsCaptioning,
    isASLEnabled,
    setIsASLEnabled,
    captionSettings,
    setCaptionSettings,
    aslSettings,
    setASLSettings,
  };

  return (
    <MeetingContext.Provider value={value}>
      {children}
    </MeetingContext.Provider>
  );
};