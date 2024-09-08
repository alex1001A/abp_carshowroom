import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useVehicles } from "../components/context/CarContext";

import Testimonials from "./Testimonials";

import "./CarDetails.css";

export default function CarDetails() {
  const { vehicleId } = useParams();
  const { vehicles, loading, error } = useVehicles();

  const [review, setReview] = useState(''); // изменили на строку для хранения отзыва
  const [allReviews, setAllReviews] = useState([]); // состояние для хранения всех отзывов

  const addReview = () => {
    if (review.trim() === '') return; // проверка на пустой отзыв

    // Добавляем новый отзыв в список
    const updatedReviews = [...allReviews, review];

    // Сохраняем обновленный список отзывов в localStorage
    localStorage.setItem(`reviews-${vehicleId}`, JSON.stringify(updatedReviews));

    // Обновляем состояние
    setAllReviews(updatedReviews);
    setReview(''); // очищаем поле ввода после добавления
  };

  // Загрузка отзывов из localStorage при первой загрузке компонента
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${vehicleId}`)) || [];
    setAllReviews(savedReviews);
  }, [vehicleId]);

  console.log(allReviews);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicle details.</div>;

  const vehicle = vehicles.find((v) => v.id === parseInt(vehicleId));

  if (!vehicle) return <div>Vehicle not found.</div>;

  return (
    <div className="car-details-page">
      <a href="/vehicles">Back to Car showroom</a>
      <h1>{vehicle.title}</h1>
      <img src={vehicle.thumbnail} alt={vehicle.title} />
      <p>{vehicle.description}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Brand: {vehicle.brand}</p>
      <Testimonials vehicle={vehicle} />
      <textarea
        id="comment"
        value={review}
        onChange={(e) => setReview(e.target.value)} // обновляем состояние при изменении текста
        placeholder="Write your review here"
      ></textarea>
      {/* Кнопка для добавления отзыва */}
      <button onClick={addReview}>Add Review</button>
    </div>
  );
}
