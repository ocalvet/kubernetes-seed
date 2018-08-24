import React from 'react';

export default ({ user }) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7, paddingBottom: 7 }}>
    <div>{user.name}</div>
    <div>{user.age} years old</div>
  </div>
);