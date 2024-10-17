import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';

//Full set of roulette numbers (0-36) with correct color assignments
const data = [
  { option: '0', style: { backgroundColor: 'green'} },
  { option: '32', style: { backgroundColor: 'red' } },
  { option: '15', style: { backgroundColor: 'black' } },
  { option: '19', style: { backgroundColor: 'red' } },
  { option: '4', style: { backgroundColor: 'black' } },
  { option: '21', style: { backgroundColor: 'red' } },
  { option: '2', style: { backgroundColor: 'black' } },
  { option: '25', style: { backgroundColor: 'red' } },
  { option: '17', style: { backgroundColor: 'black' } },
  { option: '34', style: { backgroundColor: 'red' } },
  { option: '6', style: { backgroundColor: 'black' } },
  { option: '27', style: { backgroundColor: 'red' } },
  { option: '13', style: { backgroundColor: 'black' } },
  { option: '36', style: { backgroundColor: 'red' } },
  { option: '11', style: { backgroundColor: 'black' } },
  { option: '30', style: { backgroundColor: 'red' } },
  { option: '8', style: { backgroundColor: 'black' } },
  { option: '23', style: { backgroundColor: 'red' } },
  { option: '10', style: { backgroundColor: 'black' } },
  { option: '5', style: { backgroundColor: 'red' } },
  { option: '24', style: { backgroundColor: 'black' } },
  { option: '16', style: { backgroundColor: 'red' } },
  { option: '33', style: { backgroundColor: 'black' } },
  { option: '1', style: { backgroundColor: 'red' } },
  { option: '20', style: { backgroundColor: 'black' } },
  { option: '14', style: { backgroundColor: 'red' } },
  { option: '31', style: { backgroundColor: 'black' } },
  { option: '9', style: { backgroundColor: 'red' } },
  { option: '22', style: { backgroundColor: 'black' } },
  { option: '18', style: { backgroundColor: 'red' } },
  { option: '29', style: { backgroundColor: 'black' } },
  { option: '7', style: { backgroundColor: 'red' } },
  { option: '28', style: { backgroundColor: 'black' } },
  { option: '12', style: { backgroundColor: 'red' } },
  { option: '35', style: { backgroundColor: 'black' } },
  { option: '3', style: { backgroundColor: 'red' } },
  { option: '26', style: { backgroundColor: 'black' } },
];
export default function RouletteWheelComponent({ resolveBet }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);  //Select a random prize number
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const onComplete = () => {
    const result = {
      number: data[prizeNumber].option,
      color: prizeNumber === 0 ? 'green' : prizeNumber % 2 === 0 ? 'black' : 'red',
    };
    resolveBet(result);
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    const winningData = data[prizeNumber];
    const result = {
      number: winningData.option,
      color: winningData.style.backgroundColor,
    };
    resolveBet(result);
  };
  
  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={onStopSpinning}
        backgroundColors={['#3e3e3e', '#df3428']}  //Wheel colors
        textColors={['#ffffff']} //Text colors
        outerBorderWidth={5}
        radiusLineWidth={5}
        fontSize={15} //Reduces the font size on the wheel
        width={250} 
      />
           <button 
          onClick={() => handleSpinClick()} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff', 
            color: '#fff', 
            borderRadius: '5px', 
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Spin the Wheel
        </button>
        <div>
        <div id="roulette-wheel-container" style={{ width: '300px', height: '300px' }}></div>
        <button id="spinButton">Spin the Wheel</button>
      </div>
    </div>
  );
}

//Helper function to get the color based on the number
const getColor = (number) => {
  if (number === 0) return 'green';  //Green for 0
  return number % 2 === 0 ? 'black' : 'red';  //Even numbers are black, odd numbers are red
};
