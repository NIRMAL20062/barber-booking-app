import React, { useState } from 'react';
import { db } from '../firebase/config';
import firebase from '../firebase/config';

function BookingForm({ user, shops }) {
  const [shopId, setShopId] = useState('');
  const [service, setService] = useState('');
  const [time, setTime] = useState('');
  const [bookingType, setBookingType] = useState('custom');

  const handleBooking = async (e) => {
    e.preventDefault();
    const booking = {
      userId: user.uid,
      shopId,
      service,
      time,
      type: bookingType,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    try {
      await db.collection('bookings').add(booking);
      alert('Booking request sent!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Book a Service</h2>
      <form onSubmit={handleBooking} className="form-group">
        <label>Select Shop:</label>
        <select value={shopId} onChange={(e) => setShopId(e.target.value)}>
          <option value="">Select a shop</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </select>
        <label>Select Service:</label>
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">Select a service</option>
          {shops.find((s) => s.id === shopId)?.services.map((s) => (
            <option key={s.name} value={s.name}>{s.name} (₹{s.price})</option>
          ))}
        </select>
        <label>Booking Type:</label>
        <select value={bookingType} onChange={(e) => setBookingType(e.target.value)}>
          <option value="custom">Custom Slot</option>
          <option value="instant">Instant Booking</option>
        </select>
        {bookingType === 'custom' ? (
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        ) : (
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Select a time slot</option>
            {shops.find((s) => s.id === shopId)?.availability.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        )}
        <button type="submit" className="button">Book Now</button>
      </form>
    </div>
  );
}

export default BookingForm;