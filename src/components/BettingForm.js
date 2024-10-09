import React, { useState } from 'react';

function BettingForm({ placeBet }) {
  // State to store the amount and type of bet
  const [betAmount, setBetAmount] = useState(0);
  const [betType, setBetType] = useState('number');  // number or color
  const [betValue, setBetValue] = useState('');      // specific number or color
  
  // Function to handle bet submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (betAmount > 0 && betValue !== '') {
      placeBet(betAmount, betValue);  // Call the placeBet function from parent
      setBetAmount(0);  // Reset the form after submitting
      setBetValue('');
    } else {
      alert("Please enter a valid bet amount and selection.");
    }
  };

  return (
    <div>
      <h2>Place Your Bet</h2>
      <form onSubmit={handleSubmit}>
        {/* Input for Bet Amount */}
        <input 
          type="number" 
          placeholder="Bet Amount" 
          value={betAmount} 
          onChange={(e) => setBetAmount(parseInt(e.target.value) || 0)} 
        />
        
        {/* Select between betting on number or color */}
        <select value={betType} onChange={(e) => setBetType(e.target.value)}>
          <option value="number">Number</option>
          <option value="color">Color</option>
        </select>

        {/* Input for Number or Color depending on the selection */}
        {betType === 'number' ? (
          <input 
            type="number" 
            placeholder="Number (0-36)" 
            value={betValue} 
            onChange={(e) => setBetValue(e.target.value)} 
          />
        ) : (
          <select value={betValue} onChange={(e) => setBetValue(e.target.value)}>
            <option value="">Select Color</option>
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="green">Green</option>
          </select>
        )}

        {/* Submit Button */}
        <button type="submit">Place Bet</button>
      </form>
    </div>
  );
}

export default BettingForm;