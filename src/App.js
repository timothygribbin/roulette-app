import React, { useState } from 'react';
import BettingForm from './components/BettingForm';
import RouletteWheelComponent from './components/RouletteWheelComponent';
import Confetti from 'react-confetti';

import './App.css'

function App() {

  const initialBalance = 1000;
  const [balance, setBalance] = useState(initialBalance);
  const [currentBets, setCurrentBets] = useState([]);
  const [bettingHistory, setBettingHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(200);

  const placeBet = (betAmount, betValue) => {
    if (betAmount > balance) {
      alert('Insufficient balance!');
      return;
    }

    setBalance(prevBalance => prevBalance - betAmount);
    setCurrentBets([...currentBets, { amount: betAmount, value: betValue }]);
    setMessage('');
    setShowConfetti(false);
    setConfettiPieces(200);
  };

  const resolveBet = (result) => {
    if (currentBets.length === 0) {
      alert('Please place a bet before spinning!');
      return;
    }

    currentBets.forEach((bet) => {
      let didWin = false;

      if (bet.value === String(result.number)) {
        didWin = true;
      } else if (bet.value.toLowerCase() === result.color) {
        didWin = true;
      }

      if (didWin) {
        setMessage('You won! 🎉');
        setBalance(prevBalance => prevBalance + bet.amount * 2);
        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
          setConfettiPieces(0);
        }, 3000);
      } else {
        setMessage('You lost! 😔');
      }

      setBettingHistory(prevHistory => [
        ...prevHistory,
        { ...bet, result: didWin ? 'Win' : 'Loss', outcome: result }
      ]);
    });

    setCurrentBets([]); // Clear current bets after resolving
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #0e0b16 0%, #1d2671 100%)', 
      fontFamily: "'Poppins', sans-serif", 
      color: '#fff' 
    }}>
      {/* Current Placed Bets */}
      <div style={{
        width: '20%',
        marginRight: '20px',
        backgroundColor: '#444c7e',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        maxHeight: '600px',
        overflowY: 'auto',
        color: '#333' 
      }}>
        <h2>Current Placed Bets</h2>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {currentBets.map((bet, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <div style={{
                backgroundColor: '#666',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px 0',
              }}>
                Bet {index + 1}: ${bet.amount} on {bet.value}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Center Area: Roulette Wheel and Betting Form */}
      <div style={{
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        {/* Current Balance */}
        <div style={{ marginBottom: '20px', fontSize: '1.5em' }}>
          Current Balance: ${balance}
        </div>

        {/* Betting Form */}
        <BettingForm placeBet={placeBet} style={{ marginBottom: '60px' }} />

        {/* Roulette Wheel */}
        <div style={{ marginBottom: '40px' }}>  {/* Adding space between the form and wheel */}
          <RouletteWheelComponent resolveBet={resolveBet} />
        </div>

        {/* Result Message */}
        <h2 style={{ fontSize: '2em', margin: '5px', color: message.includes('won') ? 'green' : 'red' }}>
          {message}
        </h2>

        {showConfetti && <Confetti numberOfPieces={100} recycle={false} />}
      </div>

      {/* Betting History - Right Side */}
      <div style={{
        width: '20%',
        marginLeft: '20px',
        backgroundColor: '#444c7e',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        maxHeight: '600px',
        overflowY: 'auto',
        color: '#333'
      }}>
        <h2>Betting History</h2>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {bettingHistory.map((bet, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <div style={{
                backgroundColor: '#666',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px 0',
              }}>
                Bet {index + 1}: ${bet.amount} on {bet.value} - {bet.result}
                (Outcome: {bet.outcome.number} - {bet.outcome.color})
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
