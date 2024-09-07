// CarCard.jsx
import React from 'react';
import './CarCard.css'; // Импорт стилей для компонента

export default function CarCard({ vehicle }) {
  const {
    thumbnail,
    title,
    brand,
    price,
    rating,
    description,
    availabilityStatus,
    warrantyInformation,
  } = vehicle;

  return (
    <div className="car-card">
      <img src={thumbnail} alt={title} className="car-image" />
      <h2 className="car-title">{title}</h2>
      <p className="car-brand">Brand: {brand}</p>
      <p className="car-price">${price}</p>
      <p className="car-rating">Rating: {rating} ⭐</p>
      <p className="car-description">{description}</p>
      <p className="car-availability">Availability: {availabilityStatus}</p>
      <p className="car-warranty">Warranty: {warrantyInformation}</p>
    </div>
  );
}
