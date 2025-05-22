import React, { useState } from 'react';
import { db } from '../firebase/config';

function ShopSetup({ user }) {
  const [shopDetails, setShopDetails] = useState({
    name: '',
    location: '',
    services: [{ name: '', price: '' }],
    availability: ['9:00 AM', '10:00 AM'],
    photo: '',
    contact: '',
    hours: '9:00 AM - 6:00 PM',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('shops').doc(user.uid).set({
        ...shopDetails,
        ownerId: user.uid,
      });
      alert('Shop details saved!');
    } catch (error) {
      alert(error.message);
    }
  };

  const addService = () => {
    setShopDetails({
      ...shopDetails,
      services: [...shopDetails.services, { name: '', price: '' }],
    });
  };

  return (
    <div>
      <h2>Setup Your Shop</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label>Shop Name:</label>
        <input
          type="text"
          value={shopDetails.name}
          onChange={(e) => setShopDetails({ ...shopDetails, name: e.target.value })}
          required
        />
        <label>Location:</label>
        <input
          type="text"
          value={shopDetails.location}
          onChange={(e) => setShopDetails({ ...shopDetails, location: e.target.value })}
          required
        />
        <label>Contact Number:</label>
        <input
          type="text"
          value={shopDetails.contact}
          onChange={(e) => setShopDetails({ ...shopDetails, contact: e.target.value })}
          required
        />
        <label>Working Hours:</label>
        <input
          type="text"
          value={shopDetails.hours}
          onChange={(e) => setShopDetails({ ...shopDetails, hours: e.target.value })}
          required
        />
        <label>Services:</label>
        {shopDetails.services.map((service, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => {
                const newServices = [...shopDetails.services];
                newServices[index].name = e.target.value;
                setShopDetails({ ...shopDetails, services: newServices });
              }}
            />
            <input
              type="number"
              placeholder="Price"
              value={service.price}
              onChange={(e) => {
                const newServices = [...shopDetails.services];
                newServices[index].price = e.target.value;
                setShopDetails({ ...shopDetails, services: newServices });
              }}
            />
          </div>
        ))}
        <button type="button" onClick={addService} className="button">Add Service</button>
        <button type="submit" className="button">Save Shop Details</button>
      </form>
    </div>
  );
}

export default ShopSetup;