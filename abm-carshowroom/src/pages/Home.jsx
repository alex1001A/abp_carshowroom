// Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVehicles } from "../components/context/CarContext";
import CarCard from "../components/CarCard";
import "./Home.css";

export default function Home() {
  const { vehicles, loading, error } = useVehicles();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(""); // Новое состояние для фильтрации по цене

  console.log(vehicles);

  // Функция фильтрации по бренду и цене
  const filteredVehicles = vehicles.filter((vehicle) => {
    // Фильтрация по бренду: если выбран бренд, проверяем, иначе пропускаем фильтр
    const brandMatch = selectedBrand ? vehicle.brand === selectedBrand : true;

    // Фильтрация по цене: проверяем диапазоны цен в зависимости от выбранного значения
    const priceMatch = selectedPriceRange === "more than 30k"
        ? vehicle.price > 30000
        : selectedPriceRange === "less than 30k"
        ? vehicle.price < 30000
        : true; // если диапазон цены не выбран, возвращаем true (без фильтрации)

    // Возвращаем true, если совпадают оба фильтра
    return brandMatch && priceMatch;
  });

  // Обработчик для выбора бренда из select
  const handleBrandFilterSelect = (e) => {
    setSelectedBrand(e.target.value); // Обновляем состояние по бренду
  };

  // Обработчик для изменения диапазона цены
  const handlePriceFilter = (e) => {
    setSelectedPriceRange(e.target.value); // Обновляем состояние по цене
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicles.</div>;

  return (
    <div>
      <h1>Car List</h1>

      {/* Радиокнопки для фильтрации по стоимости */}
      <div className="radios">
        <input
          onChange={handlePriceFilter}
          id="expensive-cars-inp"
          type="radio"
          name="price"
          value="more than 30k"
        />
        <label htmlFor="expensive-cars-inp">Expensive (more than 30k)</label>
        <input
          onChange={handlePriceFilter}
          id="cheap-cars-inp"
          type="radio"
          name="price"
          value="less than 30k"
        />
        <label htmlFor="cheap-cars-inp">Cheap (less than 30k)</label>
      </div>

      {/* Фильтрация по бренду */}
      <div className="filter-controls">
        <label htmlFor="car-select">Choose a car:</label>
        <select onChange={handleBrandFilterSelect} name="cars" id="car-select">
          <option value="">--Please choose an option--</option>
          <option value="Chrysler">Chrysler</option>
          <option value="Dodge">Dodge</option>
        </select>
        <button
          onClick={() => {
            document.querySelector("#car-select").value = "";
            setSelectedBrand("");
            setSelectedPriceRange("")
          }}
        >
          Show All
        </button>
      </div>

      {/* Отображение отфильтрованных автомобилей */}
      <div className="car-list">
        {filteredVehicles.map((vehicle) => (
          <Link
            key={vehicle.id}
            to={`/vehicles/${vehicle.id}`}
            className="car-card-link"
          >
            <CarCard vehicle={vehicle} />
          </Link>
        ))}
      </div>
    </div>
  );
}
