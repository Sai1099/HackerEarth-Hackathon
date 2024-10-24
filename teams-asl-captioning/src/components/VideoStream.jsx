import React, { forwardRef } from 'react';

const VideoStream = forwardRef(({ className, ...props }, ref) => {
  return (
    <video
      ref={ref}
      className={`object-cover ${className}`}
      playsInline
      {...props}
    />
  );
});