import React from 'react'
import { reviewItems } from '../../../models/test-data'
import ReviewItem from './ReviewItem'

const ReviewList = () => {
  return (
    <div className='relative mx-auto w-4/5 flex gap-5 justify-center'>
      {reviewItems.map(item => {
        return (
          <ReviewItem key={item} data={item}/>
        )
      })}
    </div>
  )
}

export default ReviewList