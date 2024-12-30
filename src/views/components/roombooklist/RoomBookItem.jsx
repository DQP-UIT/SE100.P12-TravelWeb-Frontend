import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { BiBath } from 'react-icons/bi';
import { CiHome } from 'react-icons/ci';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import { GoPlusCircle } from 'react-icons/go';
import { IoBedOutline } from 'react-icons/io5';
import { MdOutlineGroups, MdOutlineSmokeFree } from 'react-icons/md';
import { useSelector } from 'react-redux';

const iconUtilites = [
    <IoBedOutline key={1} />,
    <CiHome key={2} />,
    <MdOutlineSmokeFree key={3} />,
    <BiBath key={4} />,
];
const currency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const RoomBookItem = ({ data, provider,service }) => {
    const [numberRoom, setNumberRoom] = useState(1);
    const navigate = useNavigate(); // Initialize navigate

    const upNumberRoom = () => {
        setNumberRoom((prev) => prev + 1);
    };

    const downNumberRoom = () => {
        setNumberRoom((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleBookRoom = () => {
        const bookingDetails = {
            roomInfo: data,
            provider,
            numberBooked: numberRoom,
            service
        };
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails)); // Save to localStorage
        navigate('/payment'); // Redirect to /payment
    };


const date = useSelector((state) => state.date.selectedDate);  // Lấy giá trị date từ Redux
console.log("DAAAAAA",date)

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month =  String(d.getDate()).padStart(2, "0");  // Tháng 0-indexed
    const day = String(d.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
const checkRoomAvailability = () => {
    if (!data.roomAvailability || date.length === 0) return false;

    return date.every((selectedDate) => {

        
        const selectedDateFormatted = formatDate(selectedDate);
        
        const roomAvailabilityCheck = data.roomAvailability.some((room) => {
            const roomDateFormatted = new Date(room.date).toISOString().slice(0, 10);
            
            // Log các giá trị
            console.log("Selected Date:", selectedDateFormatted);
            console.log("Room Date:", roomDateFormatted);

            return roomDateFormatted === selectedDateFormatted && room.availableRooms > 0;
        });

        return roomAvailabilityCheck;
    });
};

const isRoomAvailable = checkRoomAvailability(); // Kết quả kiểm tra phòng
    return (
        <div className='w-full border border-black'>
            <div className='grid grid-cols-5 bg-[#DCF2F1] p-2 border-b border-black'>
                <div className='col-span-4 font-semibold text-xl'>{data.name}</div>
                <div className='text-right'>
                    <button
                        className={`bg-[${isRoomAvailable ? '#0B8C86' : '#CCCCCC'}] text-white w-3/5 rounded-md text-lg`}
                        onClick={handleBookRoom}
                        disabled={!isRoomAvailable}
                    >
                        {isRoomAvailable ? 'Đặt' : 'Hết Phòng'}
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-5 justify-center'>
                <div className='text-center border-r border-black p-2'>
                    <p className='font-semibold'>Ảnh</p>
                    <img src={data.image} alt='Room' />
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
                        <GoPlusCircle className='fill-[#6FA9E5]' />
                        <p className='text-[#6FA9E5] text-sm'>Các tiện ích khác</p>
                    </button>
                </div>
                <div className='text-center border-r border-black p-2'>
                    <p className='font-semibold'>Sức chứa</p>
                    <MdOutlineGroups className='mx-auto fill-[#359894]' size={40} />
                    {data.capacities.map((capacity, index) => (
                        <div key={index} className='flex gap-1 text-left text-sm items-center'>
                            <p>{capacity !== 0 && capacity}</p>
                            <p>
                                {capacity !== 0 && index === 0 && 'phòng'}
                                {capacity !== 0 && index === 1 && 'người lớn'}
                                {capacity !== 0 && index === 2 && 'trẻ em'}
                            </p>
                        </div>
                    ))}
                </div>
                <div className='text-center border-r border-black p-2'>
                    <p className='font-semibold'>Giá phòng/đêm</p>
                    <div className='flex justify-end w-full'>
                        {data.discount !== 0 && (
                            <p className='bg-red-500 text-white text-sm px-1 shadow-md'>
                                Giảm {Math.floor(((data.price - data.discount) / data.price) * 100)}%
                            </p>
                        )}
                    </div>
                    <div className='sm:flex lg:grid lg:grid-cols-2 gap-1 text-sm'>
                        <p className='font-bold text-left'>Giá gốc: </p>
                        <p className='text-right text-gray-400'>{currency.format(data.price)}</p>
                    </div>
                    {data.discount !== 0 && (
                        <div className='sm:flex lg:grid lg:grid-cols-2 gap-1 text-sm'>
                            <p className='font-bold text-left'>Giá ưu đãi: </p>
                            <p className='text-right text-red-500'>{currency.format(data.discount)}</p>
                        </div>
                    )}
                </div>
                <div className='flex flex-col items-center gap-1 border-r border-black p-2'>
                    <input
                        type='number'
                        min='1'
                        className='w-8 h-8 border border-black text-center'
                        value={numberRoom}
                        readOnly
                    />
                    <button onClick={upNumberRoom}>
                        <FaPlusSquare className='w-5 h-5 fill-[#0B8C86]' />
                    </button>
                    <button onClick={downNumberRoom}>
                        <FaMinusSquare className='w-5 h-5 fill-[#0B8C86]' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomBookItem;
