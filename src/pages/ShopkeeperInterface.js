import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import ShopSetup from '../components/ShopSetup';
import Notification from '../components/Notification';

function ShopkeeperInterface({ user }) {
  const [view, setView] = useState('setup');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('bookings')
      .where('shopId', '==', user.uid)
      .where('status', '==', 'pending')
      .onSnapshot((snapshot) => {
        const bookingData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingData);
      });
    return () => unsubscribe();
  }, [user.uid]);

  const handleBookingAction = async (bookingId, action) => {
    try {
      await db.collection('bookings').doc(bookingId).update({ status: action });
      await db.collection('notifications').add({
        message: `Booking ${action} for ${bookingId}`,
        userId: bookings.find((b) => b.id === bookingId).userId,
        shopId: user.uid,
        status: 'unread',
        createdAt: db.FieldValue.serverTimestamp(),
      });
      alert(`Booking ${action}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Shopkeeper Dashboard</h1>
        <button className="button" onClick={() => setView('setup')}>Shop Setup</button>
        <button className="button" onClick={() => setView('bookings')}>Manage Bookings</button>
        <button className="button" onClick={() => setView('notifications')}>Notifications</button>
      </div>
      {view === 'setup' && <ShopSetup user={user} />}
      {view === 'bookings' && (
        <div>
          <h2>Pending Bookings</h2>
          {bookings.map((booking) => (
            <div key={booking.id} className="shop-card">
              <p>Service: {booking.service}</p>
              <p>Time: {booking.time}</p>
              <button className="button" onClick={() => handleBookingAction(booking.id, 'confirmed')}>
                Confirm
              </button>
              <button className="button" onClick={() => handleBookingAction(booking.id, 'cancelled')}>
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
      {view === 'notifications' && <Notification user={user} role="shopkeeper" />}
    </div>
  );
}

export default ShopkeeperInterface;