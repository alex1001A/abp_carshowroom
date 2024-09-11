import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useVehicles } from "../components/context/CarContext";

import Testimonials from "./Testimonials";

export default function CarDetails() {
  const { vehicleId } = useParams();
  const { vehicles, loading, error } = useVehicles();

  const [review, setReview] = useState({ reviewerName: "", comment: "" });
  const [allReviews, setAllReviews] = useState([]);

  const vehicle = vehicles.find((v) => v.id === parseInt(vehicleId));

  const addReview = () => {
    if (review.comment.trim() === "") return;

    // Объединение существующих отзывов с новым отзывом
    const updatedReviews = [...allReviews, review];

    // Сохранение обновленного списка отзывов в localStorage
    localStorage.setItem(`reviews-${vehicleId}`, JSON.stringify(updatedReviews));

    // Обновление состояния
    setAllReviews(updatedReviews);
    setReview({ reviewerName: "", comment: "" });
  };

  // Загрузка отзывов из localStorage при первой загрузке компонента
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${vehicleId}`)) || [];
    const initialReviews = vehicle?.reviews || [];

    // Объединение отзывов из localStorage и исходных отзывов, если еще не объединены
    if (allReviews.length === 0) {
      // Проверка на уникальные отзывы, чтобы избежать дублирования
      const combinedReviews = [...new Set([...initialReviews, ...savedReviews])];
      setAllReviews(combinedReviews);
    }
  }, [vehicleId, vehicle?.reviews, allReviews.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicle details.</div>;

  if (!vehicle) return <div>Vehicle not found.</div>;

  return (
    <div className="car-details-page">
      <div className="container">
        <div className="car-detail-column">
        <a href="/vehicles">{`< Back to Showroom`}</a>
          <h1 className="title">{vehicle.title}</h1>
          <img className="car-details-image" src={vehicle.thumbnail} alt={vehicle.title} />
          <p>{vehicle.description}</p>
          <p>Price: ${vehicle.price}</p>
          <p>Brand: {vehicle.brand}</p>
        </div>
        <div className="car-detail-column">
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              addReview();
            }}
          >
            <div className="review-form">
              {/* правильно обновляем state */}
              <input placeholder="Type your name" type="text" value={review.reviewerName} onChange={(e) => setReview({ ...review, reviewerName: e.target.value })} />
              <textarea
                id="comment"
                value={review.comment}
                onInput={(e) => setReview({ ...review, comment: e.target.value })} // обновляем состояние при изменении текста
                placeholder="Write your review here"
              ></textarea>
              {/* Кнопка для добавления отзыва */}
              <button type="submit">Add comment</button>
            </div>
          </form>
        <Testimonials vehicle={vehicle} allReviews={allReviews} />
        </div>
      </div>
    </div>
  );
}
