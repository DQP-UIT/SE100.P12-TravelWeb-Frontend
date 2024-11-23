import SearchBar from '../../components/searchbar/SearchBar'
import { hotelList } from '../../models/test-data'
import { FaCheck, FaStar } from 'react-icons/fa6'
import RoomBookList from '../../components/roombooklist/RoomBookList'
import RateList from '../../components/ratelist/RateList'

const starRate = (index) => {
    const stars = []
    for (let i = 0; i < index; i++)
        stars[i] = '*'
    return (
        <div className="flex">
            {stars.map(star => (
                <FaStar key={star} className="text-yellow-400"/>
            ))}
        </div>
    )
}

const averageRate = (data) => {
    let result = 0
    data.map(item => {
        result += item.rate
    })
    result /= data.length
    return result
}

const Detail = ({data, type}) => {
    data = hotelList[0]
  return (
    <div className="md:w-full font-['Roboto']">
      <SearchBar type={type?type:'hotel'}/>

      <div className='md:w-5/6 lg:w-4/6 mx-auto'>
        <div className='flex my-4'>
            <img src={data.images[0]} className='w-2/5 rounded-xl mx-3'/>
            <div className='grid grid-cols-3 grid-rows-2 gap-3'>
                {data.images.map((image, index) => {
                    return index > 0 && index < 7 && (
                        <div>
                            <img key={index} src={image} className='rounded-md'/>
                        </div>
                    )
                })}
            </div>
            <img
                className="w-10 h-10 absolute right-20 rounded-full"
                src={data.avatar}
                alt="Avatar"
            />
        </div>
        <div className='w-full bg-[#9BE1DE] grid grid-cols-2 py-3 items-center justify-center rounded-md'>
            <ul className='grid grid-cols-6 text-center font-bold'>
                <li>Tổng quan</li>
                <li>Tiện nghi</li>
                <li>Phòng nghỉ</li>
                <li>Đánh giá</li>
                <li>Vị trí</li>
                <li>Chính sách</li>
            </ul>
            <div className='flex justify-end gap-2 items-center px-2'>
                <div>Từ </div>
                <div className='text-lg text-red-500 font-bold'>550.000đ </div>
                <button className='bg-[#1EBBB4] rounded-full p-2 font-bold'>Xem giá</button>
            </div>
        </div>    
        <fieldset className='my-5 border border-[#359894] shadow-sm shadow-[#359894]'>
            <legend className='border border-gray-300 px-2 py-1 mx-3 font-bold'>Tổng quan</legend>
            <div className='w-5/6 mx-auto my-3'>
                <p className='font-bold text-xl'>{data.title}</p>
                <p>{data.location} </p>
                <hr className='border border-black'></hr>
                <p className='text-xs'>{data.general} </p>
            </div>
        </fieldset>
        <fieldset className='my-5 border border-[#359894] shadow-sm shadow-[#359894]'>
            <legend className='border border-gray-300 px-2 py-1 mx-3 font-bold'>Tiện nghi</legend>
            <div className='w-5/6 mx-auto my-3 grid grid-cols-3'>
                {data.amenities.map(amenity => {
                    return (
                        <div key={amenity} className='flex gap-1 items-center'>
                            <FaCheck className='fill-blue-500'/>
                            <p className=''>{amenity}</p>
                        </div>
                    )
                })}
            </div>
        </fieldset>
        <fieldset className='my-5 border border-[#359894] shadow-sm shadow-[#359894]'>
            <legend className='border border-gray-300 px-2 py-1 mx-3 font-bold'>Phòng nghỉ</legend>
            <div className='w-5/6 mx-auto my-3'>
                <RoomBookList data={data.room}/>
            </div>
        </fieldset>
        <fieldset className='my-5 border border-[#359894] shadow-sm shadow-[#359894]'>
            <legend className='border border-gray-300 px-2 py-1 mx-3 font-bold'>Đánh giá</legend>
            <div className='w-5/6 mx-auto my-3 items-center'>
                <div className='flex border border-black rounded-2xl p-2 bg-[#BDFFFC]'>
                    <div className='flex flex-col w-1/5 justify-center items-center'>
                        <p className='font-semibold text-xl'> {averageRate(data.rate)} trên 5</p>
                        {starRate(5)}
                    </div>
                    <div className='grid grid-cols-3 w-4/5 gap-1'>
                        {data.numberRate.map(item => (
                            <div key={item} className='w-4/5 mx-auto my-1 flex gap-1 font-semibold bg-[#90EFEB] justify-center py-1 rounded-lg cursor-pointer'>
                                <p>{item.title}</p>
                                <p>({item.number})</p>
                            </div>
                        ))}
                    </div>
                </div>
                <RateList data={data.rate}/>
            </div>
        </fieldset>
      </div>
    </div>
  )
}

export default Detail