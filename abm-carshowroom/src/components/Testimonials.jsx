import React from 'react'
import Testimonial from './Testimonial'

function Testimonials({allReviews}) {

  return (
    <div className='testimonials'>
        {allReviews.map(review => {          
            return <Testimonial review={review} key={review.reviewerName}/>
        })}
    </div>
  )
}

export default Testimonials