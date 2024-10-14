import React from 'react';

function BalanceDisplay({ balance }) {
  return (
    <div>
      <h2>Current Balance: ${balance}</h2>
    </div>
  );
}

export default BalanceDisplay;