import React, { useEffect } from 'react';
import RouletteWheel from '../roulette-wheel';  // Import the RouletteWheel class

function RouletteWheelComponent({ resolveBet }) {
  useEffect(() => {
    //Reference the container where the roulette wheel will be rendered
    const container = document.getElementById('roulette-wheel-container');
    const options = {
      speed: 10, //Speed of the wheel spin
      duration: 5000, //Duration of the wheel spin (5 seconds)
      onComplete: (result) => {
        //When the spin is complete, call the resolveBet function with the result
        resolveBet({ number: result, color: getColor(result) });
      }
    };

    const wheel = new RouletteWheel(container, options);  //Initialize the wheel

    //Trigger the wheel to spin when the button is clicked
    document.getElementById('spinButton').addEventListener('click', () => {
      wheel.spin();  //This triggers the wheel to start spinning and generate a random number
    });
  }, [resolveBet]);

  return (
    <div>
      <div id="roulette-wheel-container" style={{ width: '300px', height: '300px' }}></div>
      <button id="spinButton">Spin the Wheel</button>
    </div>
  );
}

export default RouletteWheelComponent;
