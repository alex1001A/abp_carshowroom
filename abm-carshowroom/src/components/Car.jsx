import React from 'react';
import './Car.css'; 

export default function Car ( {car} ) {
  const {
    thumbnail,
    title,
    brand,
    price,
    rating,
    description,
    availabilityStatus,
    warrantyInformation,
  } = car;

  return (
    <div className="car-card">
      <img src={thumbnail} alt={title} className="car-image" />
      <h2 className="car-title">{title}</h2>
      <p className="car-brand">Brand: {brand}</p>
      <p className="car-price">${price}</p>
      <p className="car-rating">Rating: {rating} ⭐</p>
      <p className="car-description">{description}</p>
      <p className="car-availability">{availabilityStatus}</p>
      <p className="car-warranty">{warrantyInformation}</p>
    </div>
  );
};