import React, { useState } from 'react';

function ShopList({ shops }) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ distance: '', rating: '', price: '' });

  const filteredShops = shops.filter((shop) => {
    return (
      shop.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filters.distance || shop.distance <= filters.distance) &&
      (!filters.rating || shop.rating >= filters.rating) &&
      (!filters.price || shop.services.some((s) => s.price <= filters.price))
    );
  });

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Search shops..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label>Max Distance (km):</label>
        <input
          type="number"
          value={filters.distance}
          onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
        />
        <label>Min Rating:</label>
        <input
          type="number"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        />
        <label>Max Price:</label>
        <input
          type="number"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        />
      </div>
      <div className="shop-list">
        {filteredShops.map((shop) => (
          <div key={shop.id} className="shop-card">
            <img src={shop.photo || '/assets/placeholder.png'} alt={shop.name} />
            <h3>{shop.name}</h3>
            <p>Rating: {shop.rating || 'N/A'}</p>
            <p>Location: {shop.location}</p>
            <p>Services: {shop.services.map((s) => `${s.name} (₹${s.price})`).join(', ')}</p>
            <p>Availability: {shop.availability.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopList;