const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.onBookingCreated = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const booking = snap.data();
    const shop = await admin.firestore().collection('shops').doc(booking.shopId).get();
    const user = await admin.firestore().collection('users').doc(booking.userId).get();

    const notification = {
      message: `New booking request for ${booking.service} at ${booking.time}`,
      shopId: booking.shopId,
      userId: booking.userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await admin.firestore().collection('notifications').add(notification);
    return null;
  });

exports.onBookingUpdated = functions.firestore
  .document('bookings/{bookingId}')
  .onUpdate(async (change, context) => {
    const newBooking = change.after.data();
    const oldBooking = change.before.data();

    if (newBooking.status !== oldBooking.status && newBooking.status === 'cancelled') {
      const notification = {
        message: `Booking for ${newBooking.service} at ${newBooking.time} was cancelled`,
        userId: newBooking.userId,
        shopId: newBooking.shopId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      await admin.firestore().collection('notifications').add(notification);
    }
    return null;
  });