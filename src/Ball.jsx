import React from 'react';

const Ball = ({ x, y, ballRadius }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x - ballRadius,
        top: y - ballRadius,
        width: `${ballRadius * 2}px`,
        height: `${ballRadius * 2}px`,
        borderRadius: '50%',
        backgroundColor: '#0095DD',
      }}
    />
  );
};

export default Ball;
