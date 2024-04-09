// BhookaPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BhookaPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch all restaurants and their data, using axios, since it is simpler than fetch,also kyunki prac ho jaega.
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurants');
        setRestaurants(response.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>BhookaPage</h2>
      <div>
        <h3>Restaurants</h3>
        <div>
          {/* all restraunts info and data */}
          {restaurants.map((restaurant, index) => (
            <div key={index}>
              <h4>{restaurant.name}</h4>
              <p>Address: {restaurant.address}</p>
              <p>Food available: {restaurant.food}</p>
              {/* Addition of more info if needed*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


