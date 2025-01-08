import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaMapLocationDot } from 'react-icons/fa6';
import { setPlace } from '../../../model/placeSlice';
import { Modal } from 'antd';
import LocationPicker from '../locationPicker/LocationPicker';

const SearchInput = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleLocationSelect = async  (locationInfo) => {
    setSelectedLocation(locationInfo);
   
    
    let infone = await getDescription(locationInfo.name);
   
      const placeData = {
        name: locationInfo.name,
        coordinates: {
          lat: locationInfo.latitude,
          lng: locationInfo.longitude,
        },
        description: locationInfo.des,
        information: infone || "Không có thông tin gì",
        reviews: locationInfo.reviews,
        photos: locationInfo.photos ? locationInfo.photos : [],
      };

      // Cập nhật Redux và input
      dispatch(
        setPlace({
          place: placeData,
          distance, // Đưa khoảng cách hiện tại vào Redux
        })
      );
      setSearchTerm(placeData); // Hiển thị địa điểm trong input
      
      console.log('Place details:', placeData);
    
  



    console.log('Selected Location:', locationInfo);
  };
  // Lấy giá trị từ Redux Store
  const { initialSearchTerm, initialDistance } = useSelector((state) => ({
    initialSearchTerm: state.place.selectedPlace || '', // Giá trị mặc định
    initialDistance: state.place.distance || 5, // Giá trị mặc định
  }));

  // Khởi tạo state với giá trị từ Redux
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [distance, setDistance] = useState(initialDistance);
  const [activeSearch, setActiveSearch] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Google Places Autocomplete API setup
  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.AutocompleteService();
      if (searchTerm.length > 0) {
        autocomplete.getPlacePredictions({ input: searchTerm }, (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setActiveSearch(predictions.slice(0, 5));
          } else {
            setActiveSearch([]);
          }
        });
      } else {
        setActiveSearch([]); // Xóa gợi ý khi input trống
      }
    }
  }, [searchTerm]);
  const fetchPlaceDescription = async (placeName) => {
    const apiKey = 'AIzaSyDM_A4qPp-29DY2Wcs-WGhfhY0wp_WxtEs';
    const url = `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(placeName)}&key=${apiKey}&limit=1&languages=vi`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.itemListElement.length > 0) {
        const entity = data.itemListElement[0].result;
       
        return entity.detailedDescription?.articleBody;
      } else {
        console.log('Không tìm thấy mô tả');
        return ""
      }
    } catch (error) {
      console.error('Lỗi khi lấy mô tả địa điểm:', error);
    }
  };
  
  const getDescription = async (name) => {
    if(name){
    const description = await fetchPlaceDescription(name);
    console.log("DES",description)
    return description // In ra mô tả hoặc chuỗi rỗng nếu không có mô tả
    }
  };
  
  // Lấy thông tin chi tiết của địa điểm
  const fetchPlaceDetails =  (placeId, description) => {
    if (window.google) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails({ placeId, language: 'vi' }, async (place, status) => {
        let infone = await getDescription(place.name);
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const placeData = {

            
            name: place.name,
            coordinates: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            description: place.formatted_address,
            information: infone || "Không có thông tin gì",
            reviews: place.reviews ? place.reviews.map(review => ({
              author_name: review.author_name,
              rating: review.rating,  // Đánh giá sao (từ 1 đến 5 sao)
              text: review.text,  // Nội dung đánh giá
              time: new Date(review.time * 1000).toLocaleDateString(), // Chuyển đổi thời gian
            })) : [],
            photos: place.photos ? place.photos.map(photo => photo.getUrl({ maxWidth: 400, maxHeight: 400 })) : [],
          };
  
          // Cập nhật Redux và input
          dispatch(
            setPlace({
              place: placeData,
              distance, // Đưa khoảng cách hiện tại vào Redux
            })
          );
          setSearchTerm(placeData); // Hiển thị địa điểm trong input
          setActiveSearch([]); // Ẩn danh sách gợi ý
          setIsFocused(false); // Reset trạng thái focus
          console.log('Place details:', placeData);
        } else {
          console.error('Failed to fetch place details:', status);
        }
      });
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Cập nhật giá trị input
  };

  const handleFocus = () => setIsFocused(true);

  const handleDistanceChange = (e) => {
    const newDistance = parseInt(e.target.value, 10);
    setDistance(newDistance); // Cập nhật state
    dispatch(
      setPlace({
        place: searchTerm,
        distance: newDistance, // Cập nhật khoảng cách
      })
    );
  };

  const handleClickOutside = (e) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(e.target) &&
      suggestionsRef.current &&
      !suggestionsRef.current.contains(e.target)
    ) {
      setActiveSearch([]); // Ẩn gợi ý khi click ra ngoài
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
//console.log("PLACE", searchTerm)





  return (
    <div className="relative flex items-center mx-auto h-fit w-4/5">
      {/* Input Search (70%) */}
      <div className="flex items-center w-[70%]">
        <div className="relative flex-grow" ref={searchInputRef}>
          <button type="button" className="absolute left-3 top-3.5 flex">
            <CiSearch />
          </button>
          <input
            type="search"
            placeholder="Nhập điểm mốc"
            className="w-full py-3 ps-10 pe-2 block text-sm bg-white border-2 rounded-full border-[#DEEBF0] focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            onChange={handleSearch}
            onFocus={handleFocus}
            value={searchTerm.name || searchTerm.description} // Luôn hiển thị theo state
          />
        </div>

        {/* Icon vị trí */}
        <div className="flex items-center ms-4">
          <FaMapLocationDot className="size-8 text-[#359894]"  onClick={handleOpenModal} />
        </div>
      </div>

      {/* Thanh Bán Kính và Tiêu Đề (30%) */}
      <div className="flex flex-col items-center w-[30%]">
        <span className="text-sm text-gray-600 mb-2" style={{ marginLeft: '-35px' }}>
          Bán kính: {distance} km
        </span>

        <div className="flex items-center w-full max-w-[250px]">
          <button
            type="button"
            onClick={() => {
              const updatedDistance = Math.max(1, distance - 1);
              setDistance(updatedDistance);
              dispatch(
                setPlace({
                  place: searchTerm,
                  distance: updatedDistance,
                })
              );
            }}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-bold"
          >
            ↓
          </button>
          <input
            type="range"
            min="1"
            max="200"
            value={distance}
            onChange={handleDistanceChange} // Đồng bộ hóa khoảng cách
            className="mx-2 flex-grow w-[120px]"
          />
          <button
            type="button"
            onClick={() => {
              const updatedDistance = Math.min(200, distance + 1);
              setDistance(updatedDistance);
              dispatch(
                setPlace({
                  place: searchTerm,
                  distance: updatedDistance,
                })
              );
            }}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-bold"
          >
            ↑
          </button>
        </div>
      </div>

      {isFocused && activeSearch.length > 0 && (
        <div
          ref={suggestionsRef}
          className="w-full absolute top-12 bg-white text-black py-2 border-2 rounded-xl left-1/2 -translate-x-1/2 flex flex-col z-20"
        >
          {activeSearch.map((item, index) => (
            <div
              key={index}
              className="w-full flex px-2 py-1 hover:bg-[#7FC7D9] hover:text-white cursor-pointer"
              onClick={() => fetchPlaceDetails(item.place_id, item.description)}
            >
              <div className="mx-2 w-full">
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        title="Chọn vị trí"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null} // Remove default footer buttons
        width={600}
      >
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </Modal>
    </div>
  );
};

export default SearchInput;
