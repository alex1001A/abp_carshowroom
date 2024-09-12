import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVehicles } from "../components/context/CarContext";
import Testimonials from "./Testimonials";

export default function CarDetails() {
  const { vehicleId } = useParams();
  const { vehicles, loading, error } = useVehicles();

  const [review, setReview] = useState({ reviewerName: "", comment: "" });
  const [allReviews, setAllReviews] = useState([]);
  const [errors, setErrors] = useState({ reviewerName: "", comment: "" });

  const vehicle = vehicles.find((v) => v.id === parseInt(vehicleId));

  const addReview = () => {
    const { reviewerName, comment } = review;
    const newErrors = { reviewerName: "", comment: "" };

    if (comment.trim() === "") {
      newErrors.comment = "Comment cannot be empty.";
    }
    if (reviewerName.length < 6) {
      newErrors.reviewerName = "Name must be at least 6 characters.";
    }

    if (newErrors.reviewerName || newErrors.comment) {
      setErrors(newErrors);
      return;
    }

    const updatedReviews = [...allReviews, review];

    localStorage.setItem(`reviews-${vehicleId}`, JSON.stringify(updatedReviews));

    setAllReviews(updatedReviews);
    setReview({ reviewerName: "", comment: "" });
    setErrors({ reviewerName: "", comment: "" });
  };

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${vehicleId}`)) || [];
    const initialReviews = vehicle?.reviews || [];

    if (allReviews.length === 0) {
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
            onSubmit={(e) => {
              e.preventDefault();
              addReview();
            }}
          >
            <div className="review-form">
              <input placeholder="Type your name and surname" type="text" value={review.reviewerName} onChange={(e) => setReview({ ...review, reviewerName: e.target.value })} />
              {errors.reviewerName && <p className="error-message">{errors.reviewerName}</p>}
              <textarea id="comment" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} placeholder="Write your review here"></textarea>
              {errors.comment && <p className="error-message">{errors.comment}</p>}
              <button type="submit">Add comment</button>
            </div>
          </form>
          <Testimonials vehicle={vehicle} allReviews={allReviews} />
        </div>
      </div>
    </div>
  );
}
