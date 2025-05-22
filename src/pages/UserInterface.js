import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import ShopList from '../components/ShopList';
import BookingForm from '../components/BookingForm';
import BookingHistory from '../components/BookingHistory';
import Profile from '../components/Profile';

function UserInterface({ user }) {
  const [shops, setShops] = useState([]);
  const [view, setView] = useState('shops');

  useEffect(() => {
    const unsubscribe = db.collection('shops').onSnapshot((snapshot) => {
      const shopData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setShops(shopData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="header">
        <h1>User Dashboard</h1>
        <button className="button" onClick={() => setView('shops')}>Browse Shops</button>
        <button className="button" onClick={() => setView('booking')}>Book Now</button>
        <button className="button" onClick={() => setView('history')}>Booking History</button>
        <button className="button" onClick={() => setView('profile')}>Profile</button>
      </div>
      {view === 'shops' && <ShopList shops={shops} />}
      {view === 'booking' && <BookingForm user={user} shops={shops} />}
      {view === 'history' && <BookingHistory user={user} />}
      {view === 'profile' && <Profile user={user} />}
    </div>
  );
}

export default UserInterface;