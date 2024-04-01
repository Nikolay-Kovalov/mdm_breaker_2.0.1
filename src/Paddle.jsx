import React from 'react';

const Paddle = ({ x, canvasWidth, paddleWidth }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: x,
        width: paddleWidth,
        height: '10px',
        backgroundColor: '#0095DD',
      }}
    />
  );
};

export default Paddle;