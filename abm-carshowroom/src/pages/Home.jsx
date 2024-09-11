// Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVehicles } from "../components/context/CarContext";
import CarCard from "../components/CarCard";
import CustomSelect from "../components/Select"; // Подключаем кастомный селект

export default function Home() {
  const { vehicles, loading, error } = useVehicles();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  console.log(vehicles);

  // Функция фильтрации по бренду и цене
  const filteredVehicles = vehicles.filter((vehicle) => {
    const brandMatch = selectedBrand ? vehicle.brand === selectedBrand.value : true;
    const priceMatch = selectedPriceRange === "more than 30k" ? vehicle.price > 30000 : selectedPriceRange === "less than 30k" ? vehicle.price < 30000 : true;

    return brandMatch && priceMatch;
  });

  // Обработчик для изменения диапазона цены
  const handlePriceFilter = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicles.</div>;

  return (
    <div className="container">
      <h1 className="title">Car List</h1>

      {/* Радиокнопки для фильтрации по стоимости */}
      <div className="radios">
        <div className="radio-opt">
          <input onChange={handlePriceFilter} id="expensive-cars-inp" type="radio" name="price" value="more than 30k" />
          <label htmlFor="expensive-cars-inp">Expensive (more than 30k)</label>
        </div>
        <div className="radio-opt">
          <input onChange={handlePriceFilter} id="cheap-cars-inp" type="radio" name="price" value="less than 30k" />
          <label htmlFor="cheap-cars-inp">Cheap (less than 30k)</label>
        </div>
      </div>

      {/* Кастомный селект для фильтрации по бренду */}
      <div className="filter-controls">
        <CustomSelect onChange={(option) => setSelectedBrand(option)} />
        <button
          onClick={() => {
            setSelectedBrand("");
            setSelectedPriceRange("");
          }}
        >
          Show All
        </button>
      </div>

      {/* Отображение отфильтрованных автомобилей */}
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
