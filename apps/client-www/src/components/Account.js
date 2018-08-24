import React from 'react';

export default ({ account }) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7, paddingBottom: 7 }}>
    <div>{account.name}</div>
    <div>{account.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
  </div>
);