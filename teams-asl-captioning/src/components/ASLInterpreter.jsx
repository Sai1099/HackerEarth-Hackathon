import React, { useEffect, useState } from 'react';
import AvatarModel from './Avatar/AvatarModel';
import ASLTranslationService from '../services/asl-translation';

const ASLInterpreter = ({ settings, speechText }) => {
  const [animationSequence, setAnimationSequence] = useState(null);

  useEffect(() => {
    const translateAndAnimate = async () => {
      if (speechText) {
        const sequence = await ASLTranslationService.translateText(speechText);
        setAnimationSequence(sequence);
      }
    };

    translateAndAnimate();
  }, [speechText]);

  const positionClass = {
    left: 'left-0',
    right: 'right-0',
    bottom: 'bottom-0',
  }[settings.interpreterPosition];

  const sizeClass = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64',
  }[settings.interpreterSize];

  return (
    <div className={`absolute ${positionClass} ${sizeClass} bg-gray-800 rounded-lg overflow-hidden`}>
      <AvatarModel animationSequence={animationSequence} />
    </div>
  );
};