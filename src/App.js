import React, { useState, useEffect } from 'react';
import RouletteWheel from './components/RouletteWheel';
import BettingForm from './components/BettingForm';
import BalanceDisplay from './components/BalanceDisplay';

function App() {
  const [balance, setBalance] = useState(1000); // Starting balance
  const [result, setResult] = useState(null);   // Roulette spin result
  const [bet, setBet] = useState({ amount: 0, value: null }); // Bet details

  // Roulette numbers and their colors
  const rouletteNumbers = [
    { number: 0, color: 'green' },
    { number: 1, color: 'red' },
    { number: 2, color: 'black' },
    { number: 3, color: 'red' },
    { number: 4, color: 'black' },
    { number: 5, color: 'red' },
    { number: 6, color: 'black' },
    { number: 7, color: 'red' },
    { number: 8, color: 'black' },
    { number: 9, color: 'red' },
    { number: 10, color: 'black' },
    // Continue for all numbers 0-36
  ];

  // Function to handle the roulette spin
  const handleSpin = () => {
    const randomIndex = Math.floor(Math.random() * 37); // Random number between 0 and 36
    setResult(rouletteNumbers[randomIndex]);
  };

  // Function to handle bet placement
  const placeBet = (betAmount, betValue) => {
    setBet({ amount: betAmount, value: betValue });
    handleSpin(); // Spin after placing the bet
  };

  // Function to check the result and update balance
  useEffect(() => {
    if (result && bet.value !== null) {
      const isNumberBet = !isNaN(parseInt(bet.value));
      let didWin = false;

      if (isNumberBet) {
        // Check if the bet was on a specific number
        didWin = parseInt(bet.value) === result.number;
      } else {
        // Check if the bet was on a color
        didWin = bet.value === result.color;
      }

      if (didWin) {
        const payout = isNumberBet ? bet.amount * 35 : bet.amount * 2; // 35:1 for number, 2:1 for color
        setBalance(balance + payout);
        alert(`You won! Payout: $${payout}`);
      } else {
        setBalance(balance - bet.amount);
        alert("You lost!");
      }
    }
  }, [result]); // Runs whenever 'result' changes

  return (
    <div className="App">
      <h1>Simple Roulette Game</h1>
      <BalanceDisplay balance={balance} />  {/* Display the balance */}
      <BettingForm placeBet={placeBet} />   {/* Betting form */}
      <RouletteWheel result={result} />     {/* Roulette wheel with result */}
    </div>
  );
}

export default App;