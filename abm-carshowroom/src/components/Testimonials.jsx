import React from 'react'
import Testimonial from './Testimonial'

import './Testimonials.css'

function Testimonials(vehicle) {
    
    const reviews = vehicle.vehicle.reviews

    console.log(reviews);
    

  return (
    <div className='testimonials'>
        {reviews.map(review => {
            return <Testimonial review={review} key={review.reviewerName}/>
        })}
    </div>
  )
}

export default Testimonials