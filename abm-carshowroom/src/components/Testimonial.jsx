import React from 'react'

function Testimonial(review) {

  return (
    <div className='testimonial'>
        <p className='testimonials-review'>{review.review.comment}</p>
    </div>
  )
}

export default Testimonial