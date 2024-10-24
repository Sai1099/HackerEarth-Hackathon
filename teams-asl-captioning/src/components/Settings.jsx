import React from 'react';
import { useMeeting } from '../contexts/MeetingContext';

const Settings = () => {
  const {
    isCaptioning,
    setIsCaptioning,
    isASLEnabled,
    setIsASLEnabled,
    captionSettings,
    setCaptionSettings,
    aslSettings,
    setASLSettings,
  } = useMeeting();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Accessibility Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Captioning</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableCaptions"
                checked={isCaptioning}
                onChange={(e) => setIsCaptioning(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="enableCaptions">Enable Live Captions</label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Font Size</label>
                <input
                  type="number"
                  value={captionSettings.fontSize}
                  onChange={(e) => setCaptionSettings({
                    ...captionSettings,
                    fontSize: parseInt(e.target.value),
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">Text Color</label>
                <input
                  type="color"
                  value={captionSettings.color}
                  onChange={(e) => setCaptionSettings({
                    ...captionSettings,
                    color: e.target.value,
                  })}
                  className="w-full p-1 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">ASL Interpretation</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableASL"
                checked={isASLEnabled}
                onChange={(e) => setIsASLEnabled(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="enableASL">Enable ASL Interpreter</label>
            </div>
            
            <div>
              <label className="block mb-1">Interpreter Position</label>
              <select
                value={aslSettings.interpreterPosition}
                onChange={(e) => setASLSettings({
                  ...aslSettings,
                  interpreterPosition: e.target.value,
                })}
                className="w-full p-2 border rounded"
              >
                <option value="right">Right</option>
                <option value="left">Left</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-1">Interpreter Size</label>
              <select
                value={aslSettings.interpreterSize}
                onChange={(e) => setASLSettings({
                  ...aslSettings,
                  interpreterSize: e.target.value,
                })}
                className="w-full p-2 border rounded"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};