import React from 'react';
import { useParams } from 'react-router-dom';
import { useVehicles } from '../components/context/CarContext';

export default function CarDetails() {
  const { vehicleId } = useParams();
  const { vehicles, loading, error } = useVehicles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicle details.</div>;

  const vehicle = vehicles.find(v => v.id === parseInt(vehicleId));

  if (!vehicle) return <div>Vehicle not found.</div>;

  return (
    <div>
      <h1>{vehicle.title}</h1>
      <p>{vehicle.description}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Brand: {vehicle.brand}</p>
      {/* Добавь другие данные по необходимости */}
    </div>
  );
}