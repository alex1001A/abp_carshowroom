import React from 'react'

function Testimonial(review) {

  return (
    <div className='testimonial'>
      <h4>{review.review.reviewerName}</h4>
        <p className='testimonials-review'>{review.review.comment}</p>
    </div>
  )
}

export default Testimonial