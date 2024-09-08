// Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVehicles } from "../components/context/CarContext";
import CarCard from "../components/CarCard";

export default function Home() {
  const { vehicles, loading, error } = useVehicles();
  const [selectedBrand, setSelectedBrand] = useState("");
  
  // availabilityStatus : "In Stock"

  const filteredVehicles = selectedBrand ? vehicles.filter((vehicle) => vehicle.brand === selectedBrand) : vehicles;

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };

  const handleBrandFilterSelect = (e) => {
    setSelectedBrand(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicles.</div>;

  return (
    <div>
      <h1>Car List</h1>

      <div className="filter-controls">
        <label htmlFor="car-select">Choose a car:</label>
        <select onChange={handleBrandFilterSelect} name="cars" id="car-select">
          <option value="">--Please choose an option--</option>
          <option value="Chrysler">Chrysler</option>
          <option value="Dodge">Dodge</option>
        </select>
        <button onClick={() => handleBrandFilter("Chrysler")}>Chrysler</button>
        <button onClick={() => handleBrandFilter("Dodge")}>Dodge</button>
        <button
          onClick={() => {
            document.querySelector("#car-select").value = "";
            return setSelectedBrand("");
          }}
        >
          Show All
        </button>
      </div>

      <div className="car-list">
        {filteredVehicles.map((vehicle) => (
          <Link key={vehicle.id} to={`/vehicles/${vehicle.id}`} className="car-card-link">
            <CarCard vehicle={vehicle} />
          </Link>
        ))}
      </div>
    </div>
  );
}
