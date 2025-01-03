import { useState, useEffect } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import MenuFilter from "../../components/menufilter/MenuFilter";
import RoomList from "../../components/roomlist/RoomList";
import SearchBar from "../../components/searchbar/SearchBar";


import { useDispatch, useSelector } from "react-redux";
import { clearErrors, filterHotel } from "../../../viewModel/hotelAction";
import PlaceInfo from "../../components/placeInfo/placeInfo";

const Search = (type) => {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotel);
  const place = useSelector((state) => state.place); // Get place data from Redux
  const filters = useSelector((state) => state.filters);

  const [sortCriteria, setSortCriteria] = useState({
    field: "distance", // Default sorting field
    order: "asc", // "asc" for ascending, "desc" for descending
  });
  const { numRoom, numAldult, numChildren } = useSelector(state => state.memberValue);
  const { selectedDate, dateRange } = useSelector((state) => state.date);
  let day = JSON.parse( localStorage.getItem('selectedDateRange'));
  const formattedDates = selectedDate.map(date => {
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  });

  let cap = JSON.parse( localStorage.getItem('memberValues'))
  let newCap = { adults: numAldult     ,children: numChildren      , roomNumber: numRoom  }

  console.log( "Capacity",newCap)
  console.log("DAY22222", formattedDates)

 
  const filterData = {
    priceCategories:  filters?.filters?.priceCategories || [],
    suitabilities: filters?.filters?.suitabilities || [],
    facilities: filters?.filters?.facilities || [],
    facilityTypes: filters?.filters?.facilityTypes || [],
    hotelTypes: filters?.filters?.hotelTypes || [],
    latitude: place.selectedPlace.coordinates.lat,
    longitude: place.selectedPlace.coordinates.lng,
    distance: place.distance,
    capacity: newCap,
    dates: formattedDates
  };


  console.log("FILLDATA",filterData)
  console.log("ATADLLIF",filters)
  useEffect(() => {
    if (hotels.error) {
      alert.error(hotels.error);
      dispatch(clearErrors());
    }

    dispatch(filterHotel(filterData));
  }, [dispatch, hotels.error, filters, place,numRoom, numAldult, numChildren,selectedDate]);

  const generateReviewList = (inputHotels) => {
    return inputHotels.map((hotel) => {
      const amenities = hotel.serviceID.facilities?.map((facility) => facility.name) || [];

      return {
        id: hotel._id,
        images: hotel.serviceID.images,
        avatar: "https://via.placeholder.com/40x40", // Default avatar
        title: hotel.serviceID.serviceName, // Service name
        location: hotel.serviceID.locationID?.locationName || "Unknown location", // Location name
        reviews: Math.floor(Math.random() * 200 + 50), // Random reviews
        amenities: amenities,
        overview: hotel.starRating,
        dprice: hotel.lowestDiscountPrice ,
        price:  hotel.correspondingPrice,
      };
    });
  };

  const sortHotels = () => {
    if (!hotels.datas) return [];

    return [...hotels.datas].sort((a, b) => {
      const field = sortCriteria.field;

      const valueA = field === "price" ? a.lowestDiscountPrice : field === "distance" ? a.distance : a.starRating;
      const valueB = field === "price" ? b.lowestDiscountPrice : field === "distance" ? b.distance : b.starRating;

      if (sortCriteria.order === "asc") return valueA - valueB;
      return valueB - valueA;
    });
  };

  console.log("HOTEL",hotels)
  const handleSortChange = (field) => {
    setSortCriteria((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const sortedHotels = sortHotels();


  const filteredHotels = sortedHotels.filter(hotel => {
    // Gộp tất cả roomsAvailable từ mọi phần tử trong mảng rooms
    const availableDates = hotel.rooms
      .flatMap(room => room.roomsAvailable)
      .filter(room => room.availableRooms > 0) 
      .map(room => room.date.split('T')[0]); // Chỉ lấy ngày (không lấy giờ)
  
    // Kiểm tra tất cả ngày requiredDates có trong availableDates
    return formattedDates.every(date => availableDates.includes(date));
  });
  console.log("CHUAN",filteredHotels )
  const reviewList = generateReviewList(filteredHotels);

  return (
    <div className="md:w-full font-['Roboto']">
      <SearchBar type={type ? "hotel" : type} />
      <div className="my-4 relative flex justify-center">
        <div className="flex gap-4">
          {/* MenuFilter nằm bên trái */}
          <div className="w-[300px]">
            <MenuFilter type={type ? "hotel" : type} />
          </div>
  
          {/* Nội dung chính: RoomList và thanh sắp xếp nằm dọc */}
          <div className="flex gap-0 w-[900px] flex-col">
            {/* Thanh sắp xếp */}
            <div className="w-full bg-[#F6FFFF] border rounded-xl font-bold mb-4">
              <ul className="w-auto grid grid-cols-4 mx-2 cursor-pointer items-center">
                <li>Sắp xếp:</li>
                <li
                  className="flex p-2 border-l border-[#90EFEB] justify-center items-center hover:bg-[#D9D9D9]"
                  onClick={() => handleSortChange("starRating")}
                >
                  Đánh giá
                  {sortCriteria.field === "starRating" &&
                    (sortCriteria.order === "asc" ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />)}
                </li>
                <li
                  className="flex p-2 border-l border-[#90EFEB] justify-center items-center hover:bg-[#D9D9D9]"
                  onClick={() => handleSortChange("distance")}
                >
                  Khoảng cách
                  {sortCriteria.field === "distance" &&
                    (sortCriteria.order === "asc" ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />)}
                </li>
                <li
                  className="flex p-2 border-l border-[#90EFEB] justify-center items-center hover:bg-[#D9D9D9]"
                  onClick={() => handleSortChange("price")}
                >
                  Giá
                  {sortCriteria.field === "price" &&
                    (sortCriteria.order === "asc" ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />)}
                </li>
              </ul>
            </div>
  
            {/* RoomList */}
            <div className="my-2 w-full">
              <RoomList rooms={reviewList} />
            </div>
          </div>
  
          {/* PlaceInfo */}
          <div className="w-[350px] bg-[#F6FFFF] border rounded-xl p-4">
            <PlaceInfo data={place.selectedPlace} />
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
  
};

export default Search;
