import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Carousel, Image, Tag } from 'antd'; // Ant Design Carousel
import { BiBath } from 'react-icons/bi';
import { CiHome } from 'react-icons/ci';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import { GoPlusCircle } from 'react-icons/go';
import { IoBedOutline } from 'react-icons/io5';
import { MdOutlineGroups, MdOutlineSmokeFree } from 'react-icons/md';


const iconUtilities = [
    <IoBedOutline key={1} />,
    <CiHome key={2} />,
    <MdOutlineSmokeFree key={3} />,
    <BiBath key={4} />,
];

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const RoomBookItem = ({ data, provider, service }) => {
    console.log(data,  provider,service  )
    const [numberRoom, setNumberRoom] = useState(1);
    const navigate = useNavigate();
    const selectedDates = useSelector((state) => state.date.selectedDate);

    const handleIncreaseRoom = () => setNumberRoom((prev) => prev + 1);
    const handleDecreaseRoom = () => setNumberRoom((prev) => (prev > 1 ? prev - 1 : 1));

    const handleBookRoom = () => {
        const bookingDetails = {
            roomInfo: data,
            provider,
            numberBooked: numberRoom,
            service,
        };
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        navigate('/payment');
    };

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        const date = new Date(`${year}-${month}-${day}`);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    
    console.log("SELLLEC" ,selectedDates)
    const checkRoomAvailability = () => {
        if (!data.roomAvailability || selectedDates.length === 0) return false;
        return selectedDates.every((selectedDate) => {
            const formattedSelectedDate = formatDate(selectedDate);
            return data.roomAvailability.some((room) => {
                const formattedRoomDate = new Date(room.date).toISOString().slice(0, 10);
                console.log("SELLLEC" ,formattedRoomDate)
                return formattedRoomDate === formattedSelectedDate && room.availableRooms > 0;
            });
        });
    };

    const isRoomAvailable = checkRoomAvailability();

    return (
        <div className='w-full border border-black'>
            {/* Header */}
            <div className='grid grid-cols-5 bg-[#DCF2F1] p-2 border-b border-black'>
                <div className='col-span-4 font-semibold text-xl'>{data.name}</div>
                <div className='text-right'>
                    <button
                        className={`text-white w-3/5 rounded-md text-lg ${
                            isRoomAvailable ? 'bg-[#0B8C86]' : 'bg-[#CCCCCC]'
                        }`}
                        onClick={handleBookRoom}
                        disabled={!isRoomAvailable}
                    >
                        {isRoomAvailable ? 'Đặt' : 'Hết Phòng'}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className='grid grid-cols-5 justify-center'>
                {/* Images Section */}
                <div className='text-center border-r border-black p-2'>
    <p className='font-semibold'>Ảnh</p>
    <Carousel autoplay>
        {data?.image?.map((image, index) => (
            <div key={index}>
                <Image
                    src={image}
                    alt={`Room ${index + 1}`}
                   
                    style={{ width: '192px', height: '192px', objectFit: 'cover' }} // Set fixed width and height
                />
            </div>
        ))}
    </Carousel>
</div>

                {/* Utilities Section */}
                <div className='text-center border-r border-black p-2'>
                    <p className='font-semibold'>Tiện ích</p>
                    <div className="gap-2">
    {data.utilites.map((utilit, index) => (
        <Tag key={index} color="blue" className='text-sm'>
            {utilit}
        </Tag>
    ))}
</div>
                    
                </div>

                {/* Capacity Section */}
                <div className='text-center border-r border-black p-2'>
                    <p className='font-semibold'>Sức chứa</p>
                    <MdOutlineGroups className='mx-auto fill-[#359894]' size={40} />
                    <p>
    {data.meter !== 0 && `${data.meter} m²`}
</p>

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

                {/* Price Section */}
                <div className='text-center border-r border-black p-2'>
                    <p className='font-semibold'>Giá phòng/đêm</p>
                    {data.discount !== 0 && (
                        <p className='bg-red-500 text-white text-sm px-1 shadow-md'>
                            Giảm {Math.floor(((data.price - data.discount) / data.price) * 100)}%
                        </p>
                    )}
                    <div className='sm:flex lg:grid lg:grid-cols-2 gap-1 text-sm'>
                        <p className='font-bold text-left'>Giá gốc:</p>
                        <p className='text-right text-gray-400'>{currencyFormatter.format(data.price)}</p>
                    </div>
                    {data.discount !== 0 && (
                        <div className='sm:flex lg:grid lg:grid-cols-2 gap-1 text-sm'>
                            <p className='font-bold text-left'>Giá ưu đãi:</p>
                            <p className='text-right text-red-500'>{currencyFormatter.format(data.discount)}</p>
                        </div>
                    )}
                </div>

                {/* Room Selection Section */}
                <div className='flex flex-col items-center gap-1 border-r border-black p-2'>
                    <input
                        type='number'
                        min='1'
                        className='w-8 h-8 border border-black text-center'
                        value={numberRoom}
                        readOnly
                    />
                    <button onClick={handleIncreaseRoom}>
                        <FaPlusSquare className='w-5 h-5 fill-[#0B8C86]' />
                    </button>
                    <button onClick={handleDecreaseRoom}>
                        <FaMinusSquare className='w-5 h-5 fill-[#0B8C86]' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomBookItem;
