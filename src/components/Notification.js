import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';

function Notification({ user, role }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('notifications')
      .where(role === 'user' ? 'userId' : 'shopId', '==', user.uid)
      .where('status', '==', 'unread')
      .onSnapshot((snapshot) => {
        const notifs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNotifications(notifs);
      });
    return () => unsubscribe();
  }, [user.uid, role]);

  const markAsRead = async (id) => {
    await db.collection('notifications').doc(id).update({ status: 'read' });
  };

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id}>
              {notif.message}
              <button className="button" onClick={() => markAsRead(notif.id)}>Mark as Read</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;