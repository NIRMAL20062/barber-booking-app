import React, { useState } from 'react';
import './styles/App.css';
import Home from './pages/Home';
import UserInterface from './pages/UserInterface';
import ShopkeeperInterface from './pages/ShopkeeperInterface';
import Auth from './components/Auth';

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="app">
      {!user ? (
        <Auth setUser={setUser} />
      ) : !role ? (
        <Home onRoleSelect={handleRoleSelect} />
      ) : role === 'user' ? (
        <UserInterface user={user} />
      ) : (
        <ShopkeeperInterface user={user} />
      )}
    </div>
  );
}

export default App;