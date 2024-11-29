import React from 'react'

const ReviewItem = ({data}) => {
  return (
    <div className='border rounded-md w-36 text-center'>
        <img src={data.image}/>
        <p className='text-xs'><b>{data.title}</b></p>
        <p className='text-xs'>{data.numService}</p>
    </div>
  )
}

export default ReviewItem