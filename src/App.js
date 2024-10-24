import React, { useEffect, useState } from 'react';
import './App.css'
import BettingForm from './components/BettingForm';
import RouletteWheelComponent from './components/RouletteWheelComponent';
import ConfettiDisplay from './components/ConfettiDisplay'
import CurrentBets from './components/CurrentBets';
import BalanceAndUpdates from './components/BalanceAndUpdates';
import BettingHistory from './components/BettingHistory';

function App() {

  const initialBalance = 1000;
  const [balance, setBalance] = useState(initialBalance);
  const [previousBalance, setPreviousBalance] = useState(initialBalance); 
  const [currentBets, setCurrentBets] = useState([]);
  const [bettingHistory, setBettingHistory] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(200);
  const [balanceChange, setBalanceChange] = useState(null);
  const [showBalanceChange, setShowBalanceChange] = useState(false); 
  
  useEffect(() => {
    if (balance !== initialBalance) {
      const changeAmount = Math.abs(balance - previousBalance);
      const positiveChange = balance > previousBalance;
      
      setBalanceChange({
        amount: changeAmount,
        positive: positiveChange,
      });

      setShowBalanceChange(true);

      const timer = setTimeout(() => {
        setShowBalanceChange(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [balance]);

  const placeBet = (betAmount, betValue) => {
    if (betAmount > balance) {
      alert('Insufficient balance!');
      return;
    }
    setPreviousBalance(balance);
    setBalance((prevBalance) => prevBalance - betAmount);
    setCurrentBets([...currentBets, { amount: betAmount, value: betValue }]);
    setShowConfetti(false);
    setConfettiPieces(200);
  };

  const resolveBet = (result) => {
    if (currentBets.length === 0) {
      alert('Please place a bet before spinning!');
      return;
    }

    currentBets.forEach((bet) => {
      let didWinNum = false;
      let didWinColor = false;

      if (bet.value === String(result.number)) {
        didWinNum = true;
      } else if (bet.value.toLowerCase() === result.color) {
        didWinColor = true;
      }

      if (didWinColor || didWinNum) {
        setPreviousBalance(balance);
        if(didWinColor){
          setBalance(prevBalance => prevBalance + bet.amount * 2);
        }
        if(didWinNum){
          setBalance(prevBalance => prevBalance + bet.amount * 35);
        }
        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
          setConfettiPieces(10000);
        }, 2000);
      }

      setBettingHistory(prevHistory => [
        ...prevHistory,
        { ...bet, result: didWinColor || didWinNum ? 'Win' : 'Loss', outcome: result }
      ]);
    });

    setCurrentBets([]); // Clear current bets after resolving
  };

  return (
  <div className="app-container">

    <ConfettiDisplay showConfetti={showConfetti} />


    <CurrentBets currentBets = {currentBets}/>

    {/* Center Area: Roulette Wheel and Betting Form */}
    <div className="center-area">
      {/* Current Balance and Balance Change */}
      <div className="balance-container">
      <BalanceAndUpdates
        balance={balance} 
        showBalanceChange={showBalanceChange} 
        balanceChange={balanceChange} 
      />
      </div>

      {/* Betting Form */}
      <BettingForm placeBet={placeBet} style={{ marginBottom: '60px' }} />

      {/* Roulette Wheel */}
      <div className="roulette-wheel">
        <RouletteWheelComponent resolveBet={resolveBet} />
      </div>
    </div>

    {/* Betting History - Right Side */}
    <BettingHistory bettingHistory={bettingHistory} />
  </div>
  );
}

export default App;