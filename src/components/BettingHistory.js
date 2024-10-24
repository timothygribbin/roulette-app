// BettingHistory.js
import React from 'react';

function BettingHistory({ bettingHistory }) {
  return (
    <div className="history-list">
      <h2>Betting History</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {bettingHistory.map((bet, index) => (
          <li key={index} className="history-item">
            <div className="history-item-content">
              Bet {index + 1}: ${bet.amount} on {bet.value} - {bet.result}
              (Outcome: {bet.outcome.number} - {bet.outcome.color})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BettingHistory;