import { useNavigate } from "react-router-dom";
import SearchDate from "../searchdate/SearchDate"
import SearchInput from "../searchinput/SearchInput"
import SearchMember from "../searchmember/SearchMember"
import { useSelector } from "react-redux";
import { notification } from "antd";

const SearchBar = ({type}) => {
  const navigate = useNavigate(); // Hook điều hướng

  // Lấy giá trị từ Redux store
  const place = useSelector((state) => state.place.selectedPlace);  // Lấy giá trị place từ Redux
  const member = useSelector((state) => state.memberValue);  // Lấy giá trị member từ Redux
  const date = useSelector((state) => state.date.selectedDate);  // Lấy giá trị date từ Redux
  const selectedServiceType = useSelector((state) => state.serviceType.selectedServiceType);
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
    <div className="w-screen bg-[#9BE1DE] flex py-3 items-center justify-center">
      <div className="w-1/3">
        <SearchInput/>
      </div>
      {selectedServiceType === 'hotel' && (
        <>
          <div className="w-1/6">
            <SearchDate searchType={type}/>
          </div>
          <div className="w-1/6 mx-8">
            <SearchMember/>
          </div>
        </>
      )}
      <div className="w-1/6">
        <button className='bg-[#0B8C86] px-4 py-2 text-white text-xl border rounded-lg' onClick={handleSearch}>Tìm</button>
      </div>
    </div>
  )
}

export default SearchBar