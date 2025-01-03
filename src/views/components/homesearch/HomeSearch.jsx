import { FaHotel, } from 'react-icons/fa6'
import { GrRestaurant } from 'react-icons/gr'
import { FaCoffee } from 'react-icons/fa'
import SearchInput from '../searchinput/SearchInput'
import SearchDate from '../searchdate/SearchDate'
import SearchMember from '../searchmember/SearchMember'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notification } from 'antd'
import { useSelector } from 'react-redux'

const typeSearch = [
  {
    title: 'Chỗ ở',
    id: 'hotel',
    icon: <FaHotel/>,
  },
  {
    title: 'Nhà hàng',
    id: 'restaurant',
    icon: <GrRestaurant/>,
  },
  {
    title: 'Cà phê',
    id: 'cafe',
    icon: <FaCoffee/>,
  },
]

// eslint-disable-next-line react/prop-types


const HomeSearch = ({ suggestSearch }) => {
  const [type, setType] = useState(['hotel']);
  const navigate = useNavigate(); // Hook điều hướng

  // Lấy giá trị từ Redux store
  const place = useSelector((state) => state.place.selectedPlace);  // Lấy giá trị place từ Redux
  const member = useSelector((state) => state.memberValue);  // Lấy giá trị member từ Redux
  const date = useSelector((state) => state.date.selectedDate);  // Lấy giá trị date từ Redux

  const click = (e) => {
    setType(e.target.id);
  };

  console.log("Ngày",date)
  const handleSearch = () => {
    // Kiểm tra nếu place, member và date đều không rỗng
    if (!place || !member.numRoom || !member.numAldult || date.length === 0) {
      notification.warning({
        message: 'Lỗi',
        description: 'Vui lòng chọn địa điểm, thành viên và ngày để tìm kiếm!',
        placement: 'topRight', // Vị trí thông báo
      });
      return;
    }
    
    // Chuyển hướng đến trang tìm kiếm
    navigate('/search', { state: { searchType: type } });
  };

  return (
    <div className="w-4/5 mx-auto">
      <SearchInput suggestSearch={suggestSearch} />

      <div className="h-fit relative flex justify-center">
        <div className="w-full h-[150px] bg-[#F2F9F9] absolute top-10 left-1/2 -translate-x-1/2 border-2 shadow-[#DEEBF0] rounded-3xl" />

        <div className="relative m-3">
          <div className="mx-auto mb-2 w-3/5 md:min-w-max h-fit bg-white grid grid-cols-3 border rounded shadow-md shadow-gray-300 md:text-nowrap">
            {typeSearch.map((item) => (
              <button
                id={item.id}
                key={item.id}
                className="flex p-2 items-center gap-1 justify-center focus:text-[#7FC7D9] focus:shadow-md focus:shadow-blue-500"
                onClick={click}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          {type === 'cafe' && (
            <div className="w-full items-center my-10 grid md:grid-cols-2 sm:grid-cols-1 gap-5">
              <label>Chọn loại quán cà phê: </label>
              <select className="py-2 rounded-lg">
                <option>Chọn quán cà phê</option>
                <option>Cafe 24h</option>
              </select>
            </div>
          )}
          {type !== 'cafe' && (
            <div className="w-full items-center my-10 grid md:grid-cols-2 sm:grid-cols-1 gap-5">
              <SearchDate searchType={type || 'hotel'} />
              <SearchMember />
            </div>
          )}

          <div className="w-2/5 col-span-2 mx-auto">
            <button
              className="w-full bg-[#0B8C86] py-1 text-white text-xl border rounded-lg z-10"
              onClick={handleSearch}
            >
              Tìm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;




