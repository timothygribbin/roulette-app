import React from 'react';

function CurrentBets({ currentBets }) {
  return (
    <div className="bet-list">
      <h2>Current Placed Bets</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {currentBets.map((bet, index) => (
          <li key={index} className="bet-item">
            <div className="bet-item-content">
              Bet {index + 1}: ${bet.amount} on {bet.value}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrentBets;