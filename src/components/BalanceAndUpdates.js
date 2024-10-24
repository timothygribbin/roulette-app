// BalanceDisplay.js
import React from 'react';

function BalanceAndUpdates({ balance, showBalanceChange, balanceChange }) {
  return (
    <div className="balance-container">
      <div style={{ fontSize: '1.5em' }}>Current Balance: ${balance}</div>
      {showBalanceChange && balanceChange && (
        <div
          className={`balance-change ${balanceChange.positive ? '' : 'negative'}`}
        >
          {balanceChange.positive ? '+' : '-'}${balanceChange.amount}
        </div>
      )}
    </div>
  );
}

export default BalanceAndUpdates;