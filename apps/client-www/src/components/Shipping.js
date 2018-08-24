import React from 'react';

export default ({ shipping }) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7, paddingBottom: 7 }}>
    <div>{shipping.address}</div>
    <div>{shipping.date}</div>
  </div>
);