import React from 'react';

function Home({ onRoleSelect }) {
  return (
    <div className="header">
      <h1>Welcome to Barber Booking App</h1>
      <p>Are you a user or a shopkeeper?</p>
      <button className="button" onClick={() => onRoleSelect('user')}>I'm a User</button>
      <button className="button" onClick={() => onRoleSelect('shopkeeper')}>I'm a Shopkeeper</button>
    </div>
  );
}

export default Home;