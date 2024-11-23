import { AiOutlineLike } from "react-icons/ai"
import { BiStar } from "react-icons/bi"
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa"
import { FaStar } from "react-icons/fa6"

const RateItem = ({data}) => {
  return (
    <div className='w-full flex border border-black bg-[#DCF2F1] rounded-xl'>
        <div className='flex flex-col p-2 border-r border-black lg:w-2/5 sm:w-full justify-center items-center text-center'>
            <img src={data.avatar} className="rounded-full"/>
            <div className='col-span-4 font-semibold text-xl'>{data.name}</div>
            <div>{data.room} </div>
            <div className="flex gap-1 items-center text-xl">
                {data.rate}
                <FaStar className="fill-yellow-400"/>
            </div>
        </div>
        <div className='justify-center m-2'>
            <h1 className="font-bold text-xl text-center">"{data.title}"</h1>
            <div className="flex gap-2 text-sm">
                <FaPlusSquare className="sm:size-14 lg:size-10 fill-green-500"/>
                {data.advantage}
            </div>
            <div className="flex gap-2 text-sm">
                <FaMinusSquare className="size-14 lg:size-10 fill-red-500"/>
                {data.disadvantage}
            </div>
            <div className="grid grid-cols-2">
                <div className="text-left text-xs">
                    Đã nhận xét vào {data.date}
                </div>
                <div className="flex justify-end">
                    <button className="flex items-center bg-[#90EFEB] text-sm px-2 font-semibold">Hữu ích? <AiOutlineLike/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RateItem