import { useState } from 'react'
import { BiBath } from 'react-icons/bi'
import { CiHome } from 'react-icons/ci'
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa'
import { GoPlusCircle } from 'react-icons/go'
import { IoBedOutline } from 'react-icons/io5'
import { MdOutlineGroups, MdOutlineSmokeFree } from 'react-icons/md'

const iconUtilites = [
    <IoBedOutline key={1}/>,
    <CiHome key={2}/>,
    <MdOutlineSmokeFree key={3}/>,
    <BiBath key={4}/>,
]
const currency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
})

const RoomBookItem = ({data}) => {
    const [numberRoom, setNumberRoom] = useState(['1']);
    const upNumberRoom = (value) => {
        setNumberRoom(value++)
    }
    
    const downNumberRoom = (value) => {
        setNumberRoom(value--)
    }

  return (
    <div className='w-full border border-black'>
        <div className='grid grid-cols-5 bg-[#DCF2F1] p-2 border-b border-black'>
            <div className='col-span-4 font-semibold text-xl'>{data.name}</div>
            <div className='text-right'>
                <button className='bg-[#0B8C86] text-white w-3/5 rounded-md text-lg'>Đặt</button>
            </div>
        </div>
        <div className='grid grid-cols-5 justify-center'>
            <div className='text-center border-r border-black p-2'>
                <p className='font-semibold'>Ảnh</p>
                <img src={data.image} />
            </div>
            <div className='text-center border-r border-black p-2'>
                <p className='font-semibold'>Tiện ích</p>
                {data.utilites.map((utilit, index) => (
                    <div key={index} className='flex gap-1 text-left items-center'>
                        <p>{iconUtilites[index]}</p>
                        <p className='text-sm'>{utilit}</p>
                    </div>
                ))}
                <button className='flex gap-1 text-left'>
                    <GoPlusCircle className='fill-[#6FA9E5]'/>
                    <p className='text-[#6FA9E5] text-sm'>Các tiện ích khác</p>
                </button>
            </div>
            <div className='text-center border-r border-black p-2'>
                <p className='font-semibold'>Sức chứa</p>
                <MdOutlineGroups className='mx-auto fill-[#359894]' size={40} />
                {data.capacities.map((capacity, index) => (
                    <div key={index} className='flex gap-1 text-left text-sm items-center'>
                        <p>{capacity}</p>
                        <p>
                            {index == 0 && ('người lớn')}
                            {index == 1 && ('trẻ em')}
                        </p>
                    </div>
                ))}
            </div>
            <div className='text-center border-r border-black p-2'>
                <p className='font-semibold'>Giá phòng/đêm</p>
                <div className='flex justify-end w-full'>
                    {data.discount!=0 && (
                        <p className='bg-red-500 text-white text-sm px-1 shadow-md'>
                            Giảm {data.discount}%
                        </p>
                    )}
                </div>
                <div className='sm:flex lg:grid lg:grid-cols-2 gap-1 text-sm'>
                    <p className='font-bold text-left'>Giá gốc: </p>
                    <p className='text-right text-gray-400'>{currency.format(data.price)}</p>
                </div>
                {data.discount!=0 && (   
                    <div className='sm:flex lg:grid lg:grid-cols-2 gap-1 text-sm'>
                        <p className='font-bold text-left'>Giá ưu đãi: </p>
                        <p className='text-right text-red-500'>{currency.format(data.price * (100-data.discount) / 100)}</p>
                    </div>
                )}
            </div>
            <div className='flex flex-col items-center gap-1 border-r border-black p-2'>
                <input type='text' className='w-8 h-8 border border-black text-center' value={numberRoom}/>
                <button onClick={e => upNumberRoom(e.target.value)}><FaPlusSquare className='w-5 h-5 fill-[#0B8C86]'/></button>
                <button onClick={e => downNumberRoom(e.target.value)}><FaMinusSquare className='w-5 h-5 fill-[#0B8C86]'/></button>
            </div>
        </div>
    </div>
  )
}

export default RoomBookItem