import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';

function Notification({ user }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('notifications')
      .where('userId', '==', user.uid)
      .onSnapshot((snapshot) => {
        const notificationData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNotifications(notificationData);
      });
    return () => unsubscribe();
  }, [user]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>{notif.message} - {new Date(notif.createdAt?.toDate()).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;