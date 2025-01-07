import { FaHotel } from 'react-icons/fa6';
import { GrRestaurant } from 'react-icons/gr';
import { FaCoffee } from 'react-icons/fa';
import SearchInput from '../searchinput/SearchInput';
import SearchDate from '../searchdate/SearchDate';
import SearchMember from '../searchmember/SearchMember';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setServiceType } from '../../../model/serviceTypeSlice'; // Import action

const typeSearch = [
  {
    title: 'Chỗ ở',
    id: 'hotel',
    icon: <FaHotel />,
  },
  {
    title: 'Nhà hàng',
    id: 'restaurant',
    icon: <GrRestaurant />,
  },
  {
    title: 'Cà phê',
    id: 'cafe',
    icon: <FaCoffee />,
  },
];

const HomeSearch = ({ suggestSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy dữ liệu từ Redux store
  const selectedServiceType = useSelector((state) => state.serviceType.selectedServiceType);
  const place = useSelector((state) => state.place.selectedPlace);
  const member = useSelector((state) => state.memberValue);
  const date = useSelector((state) => state.date.selectedDate);

  const handleClick = (id) => {
    dispatch(setServiceType(id)); // Cập nhật loại tìm kiếm
  };

  const handleSearch = () => {
    if (selectedServiceType ==='hotel' && (!place || !member.numRoom || !member.numAldult || date.length === 0)) {
      notification.warning({
        message: 'Lỗi',
        description: 'Vui lòng chọn địa điểm, thành viên và ngày để tìm kiếm!',
        placement: 'topRight',
      });
      return;
    }

    navigate('/search', { state: { searchType: selectedServiceType } });
  };

  return (
    <div className="w-2/5 mx-auto">
      <SearchInput suggestSearch={suggestSearch} />

      <div className="h-fit relative flex justify-center">
        {selectedServiceType === 'hotel' && (
          <div className="w-[1000px] h-[150px] bg-[#F2F9F9] absolute top-10 left-1/2 -translate-x-1/2 border-2 shadow-[#DEEBF0] rounded-3xl" />
        )}

        <div className="relative m-3">
          <div className="mx-auto mb-2 w-3/5 md:min-w-max h-fit bg-white grid grid-cols-3 border rounded shadow-md shadow-gray-300 md:text-nowrap">
            {typeSearch.map((item) => (
              <button
                key={item.id}
                className={`flex p-2 items-center gap-1 justify-center ${
                  selectedServiceType === item.id ? 'text-[#7FC7D9] shadow-md shadow-blue-500' : ''
                }`}
                onClick={() => handleClick(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          
          {selectedServiceType === 'hotel' && (
            <div className="w-full items-center my-10 grid md:grid-cols-2 sm:grid-cols-1 gap-5">
              <SearchDate searchType={selectedServiceType || 'hotel'} />
              <SearchMember />
            </div>
          )}

          <div className="w-2/5 col-span-2 mx-auto" style={{marginTop:'50px'}}>
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
