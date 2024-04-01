import React from 'react';

const Brick = ({ x, y, brickWidth, brickHeight }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: brickWidth,
        height: brickHeight,
        backgroundColor: '#0095DD',
      }}
    />
  );
};

export default Brick;