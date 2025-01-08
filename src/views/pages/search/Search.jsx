import { useState, useEffect } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import MenuFilter from "../../components/menufilter/MenuFilter";
import RoomList from "../../components/roomlist/RoomList";
import SearchBar from "../../components/searchbar/SearchBar";
import GPT from "../../components/GPT/GPT"

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, filterHotel } from "../../../viewModel/hotelAction";
import PlaceInfo from "../../components/placeInfo/placeInfo";
import { fetchCoffeeTypes } from "../../../model/restaurantSlice";
import { getAllRestaurants } from "../../../viewModel/serviceActions";

const Search = (type) => {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotel);
  const place = useSelector((state) => state.place); // Get place data from Redux
  const filters = useSelector((state) => state.filters);


  const serviceState = useSelector(state => state.serviceState);
  const { loading, restaurants } = serviceState;

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  console.log("RES", serviceState)

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

  //console.log( "Capacity",newCap)
 // console.log("DAY22222", formattedDates)

 
  const filterData = {
    priceCategories:  filters?.filters?.priceCategories || [],
    suitabilities: filters?.filters?.suitabilities || [],
    facilities: filters?.filters?.facilities || [],
    facilityTypes: filters?.filters?.facilityTypes || [],
    hotelTypes: filters?.filters?.hotelTypes || [],
    latitude: place?.selectedPlace?.coordinates?.lat,
    longitude: place?.selectedPlace?.coordinates?.lng,
    distance: place.distance,
    capacity: newCap,
    dates: formattedDates
  };
  console.log("PLACE", place)

 // console.log("FILLDATA",filterData)
  console.log("ATADLLIF",filters)
  useEffect(() => {
   
    dispatch(filterHotel(filterData));
  }, [dispatch, hotels.error, filters, place,numRoom, numAldult, numChildren,selectedDate]);

  
  const generateReviewList = (inputHotels) => {
   // console.log("INNNNNN",inputHotels)
    return inputHotels
      .filter((hotel) => hotel.serviceID?.status === "Active") // Filter by active status
      .map((hotel) => {
        const amenities = hotel.serviceID.facilities?.map((facility) => facility.name) || [];
  
        return {
          _id: hotel.serviceID._id,
          id: hotel._id,
          images: hotel.serviceID.images,
          avatar: "https://via.placeholder.com/40x40", // Default avatar
          title: hotel.serviceID.serviceName, // Service name
          location: hotel.serviceID.locationID?.locationName || "Unknown location", // Location name
          reviews: Math.floor(Math.random() * 200 + 50), // Random reviews
          amenities: amenities,
          overview: hotel.starRating,
          dprice: hotel.lowestDiscountPrice,
          price: hotel.correspondingPrice,
        };
      });
  };
  


  // Helper function to convert degrees to radians
const toRad = (deg) => deg * (Math.PI / 180);

// Haversine formula to calculate the distance between two points on the Earth
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c; // Distance in kilometers (Earth radius)
};
const combinedFilters = [
  ...filters?.filters?.priceCategories || [],
  ...filters?.filters?.suitabilities || [],
  ...filters?.filters?.facilities || [],
  ...filters?.filters?.cuisines || [],
  ...filters?.filters?.restaurants || [],
  ...filters?.filters?.dishes || []
];

const generateReviewList2 = (inputHotels) => {
  return inputHotels
    ?.filter((hotel) => {
      const isActive = hotel.serviceID?.status === "Active";
      if (!isActive) return false;

      const hotelLat = hotel.serviceID.locationID?.latitude;
      const hotelLon = hotel.serviceID.locationID?.longitude;
      const placeLat = place?.selectedPlace?.coordinates?.lat;
      const placeLon = place?.selectedPlace?.coordinates?.lng;

      if (!hotelLat || !hotelLon || !placeLat || !placeLon) return false;

      const distance = calculateDistance(hotelLat, hotelLon, placeLat, placeLon);

      const m1 = hotel?.cuisineTypeIDs?.map((a) => a._id);
      const m2 = hotel?.dishes?.map((a) => a._id);
      const m3 = hotel?.restaurantTypeID?._id;
      const m4 = hotel?.serviceID?.facilities?.map((a) => a._id);
      const m5 = hotel?.serviceID?.suitability?.map((a) => a._id);
      const m6 = hotel?.serviceID?.priceCategories?.map((a) => a._id);
      const combinedArray = [].concat(m1, m2, m3, m4, m5, m6);

      return distance <= place.distance && combinedFilters.every((filter) => combinedArray.includes(filter));
    })
    .map((hotel) => {
      const amenities = hotel.serviceID.facilities?.map((facility) => facility.name) || [];

      return {
        _id: hotel.serviceID._id,
        id: hotel._id,
        images: hotel.serviceID.images,
        avatar: "https://via.placeholder.com/40x40",
        title: hotel.serviceID.serviceName,
        location: hotel.serviceID.locationID?.locationName || "Unknown location",
        reviews: Math.floor(Math.random() * 200 + 50),
        amenities: amenities,
        overview: hotel.starRating,
        dprice: hotel.serviceID.price,
        price: hotel.serviceID.discountPrice,
        distance: calculateDistance(
          hotel.serviceID.locationID?.latitude,
          hotel.serviceID.locationID?.longitude,
          place?.selectedPlace?.coordinates?.lat,
          place?.selectedPlace?.coordinates?.lng
        ),
      };
    })
    .sort((a, b) => {
      const field = sortCriteria?.field;
      const order = sortCriteria?.order === "asc" ? 1 : -1;
console.log("VARRRR",field)
      if (field === "price" || field === "distance" ) {
        console.log("Vãi" ,a[field] )
        return (a[field] - b[field]) * order;
      }
      return 0;
    });
};



const combinedFilters2 = [
  ...filters?.filters?.priceCategories || [],
  ...filters?.filters?.suitabilities || [],
  ...filters?.filters?.facilities || [],
  
  ...filters?.filters?.coffeeTypes || []
];

const generateReviewList3 = (inputHotels) => {
  return inputHotels
    ?.filter((hotel) => {
      // Check if hotel is active
      const isActive = hotel.serviceID?.status === "Active";
      if (!isActive) return false;

      // Get the hotel's coordinates and the place's coordinates
      const hotelLat = hotel.serviceID.locationID?.latitude;
      const hotelLon = hotel.serviceID.locationID?.longitude;
      const placeLat = place?.selectedPlace?.coordinates?.lat;
      const placeLon = place?.selectedPlace?.coordinates?.lng;
      console.log(hotelLat , hotelLon ,placeLat ,placeLon)
      // If either the hotel's or place's coordinates are not available, return false
      if (!hotelLat || !hotelLon || !placeLat || !placeLon) return false;
      console.log("DDDDDDDDD")
      // Calculate the distance between the hotel and the place
      const distance = calculateDistance(hotelLat, hotelLon, placeLat, placeLon);
      console.log("DISSSS",distance)
      const m1 = hotel?.coffeeTypes?.map((a)=> a._id)
      const m2 = hotel?.serviceID?.priceCategories?.map((a)=> a._id)
      const m4 = hotel?.serviceID?.facilities?.map((a)=> a._id)
      const m5 = hotel?.serviceID?.suitability?.map((a)=> a._id)
      const combinedArray = [].concat(m1, m2, m4, m5);
      // Check if the distance is less than or equal to the specified max distance
      return distance <= place.distance && combinedFilters2.every((filter) => combinedArray.includes(filter));

    })
    .map((hotel) => {
      const amenities = hotel.serviceID.facilities?.map((facility) => facility.name) || [];
      
      //console.log("HỢP",combinedArray)

      return {
        _id: hotel.serviceID._id,
        id: hotel._id,
        images: hotel.serviceID.images,
        avatar: "https://via.placeholder.com/40x40", // Default avatar
        title: hotel.serviceID.serviceName, // Service name
        location: hotel.serviceID.locationID?.locationName || "Unknown location", // Location name
        reviews: Math.floor(Math.random() * 200 + 50), // Random reviews
        amenities: amenities,
        overview: hotel.starRating,
       
        dprice: hotel.serviceID.discountPrice,
        price: hotel.serviceID.discountPrice,
        distance: calculateDistance(
          hotel.serviceID.locationID?.latitude,
          hotel.serviceID.locationID?.longitude,
          place?.selectedPlace?.coordinates?.lat,
          place?.selectedPlace?.coordinates?.lng
        ),
        
      };
    }).sort((a, b) => {
      const field = sortCriteria?.field;
      const order = sortCriteria?.order === "asc" ? 1 : -1;
console.log("VARRRR",field)
      if (field === "price" || field === "distance" ) {
        console.log("Vãi" ,a[field] )
        return (a[field] - b[field]) * order;
      }
      return 0;
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

 // console.log("HOTEL",hotels)
  const handleSortChange = (field) => {
    setSortCriteria((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };
  //console.log("INNNNNN",inputHotels)
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
 // console.log("CHUAN",filteredHotels )
  let reviewList = [];
  


  const { coffeeTypes, status, error } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(fetchCoffeeTypes()); // Gọi API lấy coffee types
  }, [dispatch]);

 // console.log("COFFETYPE" ,coffeeTypes)
 const selectedServiceType = useSelector((state) => state.serviceType.selectedServiceType);

 if(selectedServiceType === "hotel"){
  reviewList = generateReviewList(filteredHotels);
 }
 else if(selectedServiceType === "restaurant"){
  reviewList = generateReviewList2(restaurants[0])
 }
 else if(selectedServiceType === "cafe"){
  reviewList = generateReviewList3(restaurants[1])
 }
  return (
    <div className="md:w-full font-['Roboto']">
     <GPT></GPT>
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
