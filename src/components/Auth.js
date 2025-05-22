import React, { useState } from 'react';
import { auth } from '../firebase/config';
import firebase from '../firebase/config';

function Auth({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        setUser(userCredential.user);
      } else {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        setUser(userCredential.user);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const userCredential = await auth.signInWithPopup(provider);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleAuth} className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="button">{isSignUp ? 'Sign Up' : 'Log In'}</button>
      </form>
      <button onClick={handleGoogleSignIn} className="button">Sign in with Google</button>
      <p>
        {isSignUp ? 'Already have an account?' : 'No account?'}
        <button onClick={() => setIsSignUp(!isSignUp)} className="button">
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}

export default Auth;