import React from 'react';
import Confetti from 'react-confetti';

function ConfettiDisplay({ showConfetti }) {
  const fixedWidth = window.innerWidth;
  const fixedHeight = window.innerHeight;

  return  showConfetti ? (
    <Confetti
      numberOfPieces={500}
      recycle={false}
      gravity={0.2}
      width={fixedWidth}
      height={fixedHeight}
    />
  ) : null
}

export default ConfettiDisplay;