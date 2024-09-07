// Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVehicles } from "../components/context/CarContext";
import CarCard from "../components/CarCard";

export default function Home() {
  const { vehicles, loading, error } = useVehicles();
  const [selectedBrand, setSelectedBrand] = useState('');

console.log(vehicles);


// availabilityStatus : "In Stock"

  // Фильтрация по выбранному бренду
  const filteredVehicles = selectedBrand
    ? vehicles.filter(vehicle => vehicle.brand === selectedBrand)
    : vehicles;

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicles.</div>;

  return (
    <div>
      <h1>Car List</h1>
      
      {/* Фильтрация  */}
      <div className="filter-controls">
        <button onClick={() => handleBrandFilter('Chrysler')}>Chrysler</button>
        <button onClick={() => handleBrandFilter('Dodge')}>Dodge</button>
        <button onClick={() => setSelectedBrand('')}>Show All</button>
      </div>
      
      <div className="car-list">
        {filteredVehicles.map(vehicle => (
          <Link key={vehicle.id} to={`/vehicles/${vehicle.id}`} className="car-card-link">
            <CarCard vehicle={vehicle} />
          </Link>
        ))}
      </div>
    </div>
  );
}
