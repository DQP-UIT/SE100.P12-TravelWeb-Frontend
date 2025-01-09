import SearchBar from "../../components/searchbar/SearchBar";
import { hotelList } from "../../../models/test-data";
import { FaCheck, FaStar } from "react-icons/fa6";
import RoomBookList from "../../components/roombooklist/RoomBookList";
import RateList from "../../components/ratelist/RateList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getHotelDetails } from "../../../viewModel/hotelAction";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Image,
  Modal,
  Rate,
  Row,
  Select,
  TimePicker,
} from "antd";
import GPT from "../../components/GPT/GPT";
import {
  CalendarTodayOutlined,
  SmsFailedOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import { Option } from "antd/es/mentions";
import { AiOutlineClockCircle } from "react-icons/ai";
import { over } from "lodash";
const starRate = (index) => {
  const stars = [];
  for (let i = 0; i < index; i++) stars[i] = "*";
  return (
    <div className="flex">
      {stars.map((star) => (
        <FaStar key={star} className="text-yellow-400" />
      ))}
    </div>
  );
};

const averageRate = (data) => {
  let result = 0;
  data?.map((item) => {
    result += item.rate;
  });
  result /= data?.length;
  return result;
};
const createHotelDataFromObject = (inputData) => {
  try {
    return {
      reviews: inputData.hotel.serviceID.reviews,
      images: inputData.hotel.serviceID.images || [], // Nếu không có images, trả về mảng rỗng
      avatar: inputData.avatar || "", // Nếu không có avatar, trả về chuỗi rỗng
      title: inputData.hotel.serviceID.serviceName || "", // Nếu không có title, trả về chuỗi rỗng
      location: inputData.hotel.serviceID.locationID.locationName || "", // Nếu không có location, trả về chuỗi rỗng
      general: inputData.hotel.serviceID.description || "", // Nếu không có general, trả về chuỗi rỗng
      room: inputData.rooms
        ? inputData.rooms.map((room) => ({
            _id: room._id,
            name: room.roomType || "", // Nếu không có tên phòng, trả về chuỗi rỗng
            image: room.pictures ? room.pictures || "" : "", // Lấy hình ảnh đầu tiên nếu có
            utilites: room.facilities
              ? room.facilities.map((facility) => facility.name)
              : [], // Lấy danh sách tiện nghi
            capacities: room.capacity
              ? [
                  room.capacity.roomNumber,
                  room.capacity.adults,
                  room.capacity.children,
                ]
              : [], // Nếu có capacity, lấy số người lớn và trẻ em
            price: room.price || 0, // Giá phòng, nếu không có thì mặc định là 0
            discount: room.discountPrice || 10, // Giảm giá, nếu không có thì mặc định là 0
            roomAvailability: room.roomsAvailable || [],
            meter: room.area,
          }))
        : [], // Nếu không có rooms, trả về mảng rỗng
      amenities: inputData.hotel.serviceID.facilities
        ? inputData.hotel.serviceID.facilities.map((facility) => facility.name)
        : [], // Nếu không có amenities, trả về mảng rỗng
      amenities2: inputData.hotel.cuisineTypeIDs
        ? inputData.hotel.cuisineTypeIDs.map((facility) => facility.type)
        : [],
      amenities3: inputData.hotel.dishes
        ? inputData.hotel.dishes.map((facility) => facility.name)
        : [],
      numberRate: [
        { title: "Tất cả", number: 1000 },
        { title: "5 sao", number: 200 },
        { title: "4 sao", number: 200 },
        { title: "3 sao", number: 200 },
        { title: "2 sao", number: 200 },
        { title: "1 sao", number: 200 },
      ], // Nếu không có numberRate, trả về mảng mặc định
      rate: [], // Nếu không có rate, trả về mảng rỗng
    };
  } catch (error) {
    console.error("Error creating hotel data:", error);
    return {
      images: [],
      avatar: "",
      title: "",
      location: "",
      general: "",
      room: [],
      amenities: [],
      numberRate: [],
      rate: [],
    }; // Trả về dữ liệu mặc định nếu có lỗi
  }
};

const Detail = ({ data, type }) => {
  const navigate = useNavigate();

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);

  const handleBooking = () => {
    const bookingData = {
      adults,
      children,
      arrivalDate: arrivalDate ? arrivalDate.format("YYYY-MM-DD") : null,
      arrivalTime: arrivalTime ? arrivalTime.format("HH:mm") : null,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    const bookingDetails = {
      provider: hotelDetails?.hotel?.serviceID?.providerID?.userID,
      service: hotelDetails?.hotel?.serviceID,
    };
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    navigate("/payment");

    console.log("BOOOOOK", bookingData);
    alert("Thông tin đặt chỗ đã được lưu!");
  };

  const { hotelId } = useParams();

  const dispatch = useDispatch();

  // Lấy thông tin chi tiết từ state
  const { hotelDetails, loading, error } = useSelector((state) => state.hotel);

  useEffect(() => {
    dispatch(getHotelDetails(hotelId));
  }, [dispatch, hotelId]);

  console.log("DITTT", hotelDetails);

  if (hotelDetails) {
    data = createHotelDataFromObject(hotelDetails);
    console.log(data);
  } else {
    data = hotelList[0];
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigateToGoogleMap = (data) => {
    if (
      hotelDetails.hotel.serviceID.locationID.latitude &&
      hotelDetails.hotel.serviceID.locationID.longitude
    ) {
      const currentLocation = "My+Location"; // Dùng Google Maps để lấy vị trí hiện tại
      const destination = `${hotelDetails.hotel.serviceID.locationID.latitude},${hotelDetails.hotel.serviceID.locationID.longitude}`;
      const googleMapsUrl = `https://www.google.com/maps/dir/${currentLocation}/${destination}`;

      window.open(googleMapsUrl, "_blank");
    } else {
      alert("Không có thông tin vị trí để dẫn đường.");
    }
  };

  const ReviewList = ({ reviews }) => {
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = () => {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const sortedReviews = [...reviews].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.stars - b.stars;
      } else {
        return b.stars - a.stars;
      }
    });

    const overalRating = () => {
      let overalRate = 0;
      for (let i = 0; i < reviews.length; i++) {
        overalRate += reviews[i].stars;
      }
      overalRate = overalRate / reviews.length;
      console.log(overalRate);
      return overalRate;
    };

    return (
      <div className="review-list">
        <div className="flex justify-center mb-4">
          <Rate disabled value={overalRating()} style={{ color: "#faad14" }} />
        </div>
        <div className="flex justify-end mb-4">
          <Button onClick={handleSort} type="primary">
            Sắp xếp ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </Button>
        </div>
        {sortedReviews?.map((review) => (
          <Card
            key={review._id.$oid}
            className="review-card"
            bordered
            style={{ marginBottom: "16px", borderRadius: "8px" }}
          >
            <Row
              justify="space-between"
              align="middle"
              className="review-header"
            >
              <Col>
                <p className="font-bold" style={{ marginBottom: 4 }}>
                  Khách hàng:{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {review.userID.fullName}
                  </span>
                </p>
                <p style={{ color: "gray", fontSize: "12px", marginBottom: 0 }}>
                  Ngày: {review.date.slice(0, 10)}
                </p>
              </Col>
              <Col>
                <Rate
                  disabled
                  value={review.stars}
                  style={{ color: "#faad14" }}
                />
              </Col>
            </Row>

            <div className="review-body" style={{ marginTop: "12px" }}>
              <p style={{ color: "green", marginBottom: 0 }}>
                <strong></strong>{" "}
                {review.positiveComment || "No positive comments"}
              </p>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const calculateNumberRate = (reviews) => {
    const numberRate = [0, 0, 0, 0, 0]; // Mảng lưu số lượng đánh giá từ 1 đến 5 sao
    reviews?.forEach((review) => {
      if (review.stars >= 1 && review.stars <= 5) {
        numberRate[review.stars - 1]++;
      }
      console.log(review);
    });
    return numberRate.map((count, index) => ({
      title: `${index + 1} sao`,
      number: count,
    }));
  };

  if (hotelDetails?.hotel?.serviceID?.type === "hotel") {
    return (
      <div className="md:w-full font-['Roboto']">
        <GPT></GPT>
        <SearchBar type={type ? type : "hotel"} />

        <div className="md:w-5/6 lg:w-4/6 mx-auto">
          <div className="grid grid-cols-5 gap-3 my-4 relative w-full">
            {/* Ảnh chính - chiều cao gấp đôi */}
            <div className="col-span-2 row-span-2 relative">
              <Image
                src={data.images[0]}
                className="w-full h-[500px] rounded-xl object-cover"
                style={{ aspectRatio: "1/1" }}
                alt="Main"
              />
            </div>

            {/* Thư viện ảnh nhỏ */}
            {data.images.slice(1, 7).map((image, index) => (
              <div
                key={index}
                className="col-span-1 row-span-1 relative overflow-hidden"
              >
                <Image
                  src={image}
                  className="w-full h-[250px] rounded-md object-cover"
                  style={{ aspectRatio: "1/1" }}
                  alt={`Thumbnail ${index}`}
                />
              </div>
            ))}

            {/* Modal hiển thị tất cả ảnh */}
            {isModalOpen && (
              <Modal
                title="Tất cả ảnh"
                visible={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
              >
                <div className="grid grid-cols-3 gap-3">
                  {data.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      className="rounded-md object-cover w-full"
                      style={{ aspectRatio: "16/9" }}
                      alt={`Image ${index}`}
                    />
                  ))}
                </div>
              </Modal>
            )}
          </div>

          <Button
            className="mt-4 bg-blue-200 text-white py-2 px-4 rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Xem tất cả ảnh
          </Button>

          <div className="w-full bg-[#9BE1DE] grid grid-cols-2 py-3 items-center justify-center rounded-md">
            <ul className="grid grid-cols-6 text-center font-bold">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("overview")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Tổng quan
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("amenities")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Tiện nghi
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("rooms")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Đặt phòng
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("reviews")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Đánh giá
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("policies")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Chính sách
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigateToGoogleMap(data)}>
                  Đường đi
                </button>
              </li>
            </ul>
            <div className="flex justify-end gap-2 items-center px-2"></div>
          </div>
          <fieldset
            id="overview"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Tổng quan
            </legend>
            <div className="w-5/6 mx-auto my-3">
              <p className="font-bold text-xl">{data.title}</p>
              <p>{data.location} </p>
              <hr className="border border-black"></hr>
              <p className="text-xs">{data.general} </p>
            </div>
          </fieldset>
          <fieldset
            id="amenities"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Tiện nghi
            </legend>
            <div className="w-5/6 mx-auto my-3 grid grid-cols-3">
              {data.amenities.map((amenity) => {
                return (
                  <div key={amenity} className="flex gap-1 items-center">
                    <FaCheck className="fill-blue-500" />
                    <p className="">{amenity}</p>
                  </div>
                );
              })}
            </div>
          </fieldset>
          <fieldset
            id="rooms"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Phòng nghỉ
            </legend>
            <div className="w-5/6 mx-auto my-3">
              <RoomBookList
                service={hotelDetails?.hotel?.serviceID}
                provider={hotelDetails?.hotel?.serviceID?.providerID?.userID}
                data={data.room}
              />
            </div>
          </fieldset>
          <fieldset
            id="reviews"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Đánh giá
            </legend>
            <div className="w-5/6 mx-auto my-3 items-center">
              <div
                style={{ marginBottom: "50px" }}
                className="flex justify-center border border-black rounded-2xl p-2 bg-[#BDFFFC]"
              >
                <div className="grid grid-cols-5 w-4/5 gap-4">
                  {calculateNumberRate(data.reviews).map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-col items-center gap-1 font-semibold bg-[#90EFEB] justify-center py-2 rounded-lg cursor-pointer"
                    >
                      <p>{item.title}</p>
                      <p>({item.number})</p>
                    </div>
                  ))}
                </div>
              </div>

              <ReviewList reviews={data.reviews} />
            </div>
          </fieldset>

          {/* <RateList data={data.rate} /> */}
          <fieldset
            id="policies"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Chính sách của khách sạn
            </legend>
            <div className="w-5/6 mx-auto my-3">
              <p className="font-semibold">Trẻ em và giường phụ</p>
              <p>
                Giường phụ phụ thuộc vào loại phòng bạn chọn. Vui lòng kiểm tra
                công suất phòng cụ thể để biết thêm chi tiết.
              </p>
              <p>Mọi trẻ em đều được chào đón.</p>
              <hr className="my-3" />
              <p className="font-semibold">Khác</p>
              <ul className="list-disc pl-5">
                <li>
                  Khi đặt trên 5 phòng, các chính sách khác và phụ phí có thể
                  được áp dụng.
                </li>
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    );
  } else if (hotelDetails?.hotel?.serviceID?.type === "restaurant") {
    return (
      <div className="md:w-full font-['Roboto']">
        <GPT></GPT>
        <SearchBar type={type ? type : "hotel"} />

        <div className="md:w-5/6 lg:w-4/6 mx-auto">
          <div className="grid grid-cols-5 gap-3 my-4 relative w-full">
            {/* Ảnh chính - chiều cao gấp đôi */}
            <div className="col-span-2 row-span-2 relative">
              <Image
                src={data.images[0]}
                className="w-full h-[500px] rounded-xl object-cover"
                style={{ aspectRatio: "1/1" }}
                alt="Main"
              />
            </div>

            {/* Thư viện ảnh nhỏ */}
            {data.images.slice(1, 7).map((image, index) => (
              <div
                key={index}
                className="col-span-1 row-span-1 relative overflow-hidden"
              >
                <Image
                  src={image}
                  className="w-full h-[250px] rounded-md object-cover"
                  style={{ aspectRatio: "1/1" }}
                  alt={`Thumbnail ${index}`}
                />
              </div>
            ))}

            {/* Modal hiển thị tất cả ảnh */}
            {isModalOpen && (
              <Modal
                title="Tất cả ảnh"
                visible={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
              >
                <div className="grid grid-cols-3 gap-3">
                  {data.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      className="rounded-md object-cover w-full"
                      style={{ aspectRatio: "16/9" }}
                      alt={`Image ${index}`}
                    />
                  ))}
                </div>
              </Modal>
            )}
          </div>

          <Button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Xem tất cả ảnh
          </Button>

          <div className="w-full bg-[#9BE1DE] grid grid-cols-2 py-3 items-center justify-center rounded-md">
            <ul className="grid grid-cols-6 text-center font-bold">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("overview")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Tổng quan
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("amenities")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Tiện nghi
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("rooms")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Đặt chổ
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("reviews")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Đánh giá
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("policies")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Chính sách
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigateToGoogleMap(data)}>
                  Đường đi
                </button>
              </li>
            </ul>
            <div className="flex justify-end gap-2 items-center px-2"></div>
          </div>
          <fieldset
            id="overview"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Tổng quan
            </legend>
            <div className="w-5/6 mx-auto my-3">
              <p className="font-bold text-xl">{data.title}</p>
              <p>{data.location} </p>
              <hr className="border border-black"></hr>
              <p className="text-xs">{data.general} </p>
            </div>
          </fieldset>
          <fieldset
            id="amenities"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Phong cách
            </legend>
            <div className="w-5/6 mx-auto my-3 grid grid-cols-3">
              {data.amenities2.map((amenity) => {
                return (
                  <div key={amenity} className="flex gap-1 items-center">
                    <FaCheck className="fill-blue-500" />
                    <p className="">{amenity}</p>
                  </div>
                );
              })}
            </div>
          </fieldset>
          <fieldset
            id="amenities"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Món ăn
            </legend>
            <div className="w-5/6 mx-auto my-3 grid grid-cols-3">
              {data.amenities3.map((amenity) => {
                return (
                  <div key={amenity} className="flex gap-1 items-center">
                    <FaCheck className="fill-blue-500" />
                    <p className="">{amenity}</p>
                  </div>
                );
              })}
            </div>
          </fieldset>
          <fieldset
            id="amenities"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Tiện nghi
            </legend>
            <div className="w-5/6 mx-auto my-3 grid grid-cols-3">
              {data.amenities.map((amenity) => {
                return (
                  <div key={amenity} className="flex gap-1 items-center">
                    <FaCheck className="fill-blue-500" />
                    <p className="">{amenity}</p>
                  </div>
                );
              })}
            </div>
          </fieldset>
          <fieldset
            id="rooms"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Đặt chỗ
            </legend>
            <div className="p-5 max-w-md mx-auto">
              {/* Số người lớn và trẻ em */}
              <div
                className="flex items-center"
                style={{ gap: "16px", marginBottom: "16px" }}
              >
                <div className="flex items-center" style={{ gap: "4px" }}>
                  <span style={{ marginRight: "4px" }}>Người lớn:</span>
                  <Select
                    defaultValue="0"
                    style={{ width: 80 }}
                    onChange={setAdults}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <Option key={num} value={num}>
                        {num}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="flex items-center" style={{ gap: "4px" }}>
                  <span style={{ marginRight: "4px" }}>Trẻ em:</span>
                  <Select
                    defaultValue="0"
                    style={{ width: 100 }}
                    onChange={setChildren}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <Option key={num} value={num}>
                        {num}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Thời gian đến */}
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span>Ngày đến:</span>
                  <DatePicker style={{ flex: 1 }} onChange={setArrivalDate} />
                </div>
                <div className="flex items-center gap-2">
                  <span>Giờ đến:</span>
                  <TimePicker
                    style={{ flex: 1 }}
                    format="HH:mm"
                    onChange={setArrivalTime}
                  />
                </div>
              </div>

              {/* Nút đặt chỗ */}
              <div className="text-center">
                <Button
                  type="primary"
                  size="large"
                  className="w-[300px]"
                  style={{ backgroundColor: "#00CCFF" }}
                  onClick={handleBooking}
                >
                  Đặt chỗ ngay
                </Button>
              </div>
            </div>
          </fieldset>

          <fieldset
            id="reviews"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Đánh giá
            </legend>
            <div className="w-5/6 mx-auto my-3 items-center">
              <div
                style={{ marginBottom: "50px" }}
                className="flex justify-center border border-black rounded-2xl p-2 bg-[#BDFFFC]"
              >
                <div className="grid grid-cols-5 w-4/5 gap-4">
                  {calculateNumberRate(data.reviews).map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-col items-center gap-1 font-semibold bg-[#90EFEB] justify-center py-2 rounded-lg cursor-pointer"
                    >
                      <p>{item.title}</p>
                      <p>({item.number})</p>
                    </div>
                  ))}
                </div>
              </div>

              <ReviewList reviews={data.reviews} />
            </div>
          </fieldset>

          {/* <RateList data={data.rate} /> */}
          <fieldset
            id="policies"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Chính sách của nhà hàng
            </legend>
            <div className="w-5/6 mx-auto my-3">
              <p>Ăn no mới cho về.</p>
            </div>
          </fieldset>
        </div>
      </div>
    );
  } else if (hotelDetails?.hotel?.serviceID?.type === "coffee") {
    return (
      <div className="md:w-full font-['Roboto']">
        <GPT></GPT>
        <SearchBar type={type ? type : "hotel"} />

        <div className="md:w-5/6 lg:w-4/6 mx-auto">
          <div className="grid grid-cols-5 gap-3 my-4 relative w-full">
            {/* Ảnh chính - chiều cao gấp đôi */}
            <div className="col-span-2 row-span-2 relative">
              <Image
                src={data.images[0]}
                className="w-full h-[500px] rounded-xl object-cover"
                style={{ aspectRatio: "1/1" }}
                alt="Main"
              />
            </div>

            {/* Thư viện ảnh nhỏ */}
            {data.images.slice(1, 7).map((image, index) => (
              <div
                key={index}
                className="col-span-1 row-span-1 relative overflow-hidden"
              >
                <Image
                  src={image}
                  className="w-full h-[250px] rounded-md object-cover"
                  style={{ aspectRatio: "1/1" }}
                  alt={`Thumbnail ${index}`}
                />
              </div>
            ))}

            {/* Modal hiển thị tất cả ảnh */}
            {isModalOpen && (
              <Modal
                title="Tất cả ảnh"
                visible={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
              >
                <div className="grid grid-cols-3 gap-3">
                  {data.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      className="rounded-md object-cover w-full"
                      style={{ aspectRatio: "16/9" }}
                      alt={`Image ${index}`}
                    />
                  ))}
                </div>
              </Modal>
            )}
          </div>

          <Button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Xem tất cả ảnh
          </Button>

          <div className="w-full bg-[#9BE1DE] grid grid-cols-2 py-3 items-center justify-center rounded-md">
            <ul className="grid grid-cols-6 text-center font-bold">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("overview")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Tổng quan
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("amenities")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Tiện nghi
                </button>
              </li>

              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("reviews")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Đánh giá
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("policies")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Chính sách
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigateToGoogleMap(data)}>
                  Đường đi
                </button>
              </li>
            </ul>
            <div className="flex justify-end gap-2 items-center px-2"></div>
          </div>
          <fieldset
            id="overview"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Tổng quan
            </legend>
            <div className="w-5/6 mx-auto my-3">
              <p className="font-bold text-xl">{data.title}</p>
              <p>{data.location} </p>
              <hr className="border border-black"></hr>
              <p className="text-xs">{data.general} </p>
            </div>
          </fieldset>

          <fieldset
            id="amenities"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Tiện nghi
            </legend>
            <div className="w-5/6 mx-auto my-3 grid grid-cols-3">
              {data.amenities.map((amenity) => {
                return (
                  <div key={amenity} className="flex gap-1 items-center">
                    <FaCheck className="fill-blue-500" />
                    <p className="">{amenity}</p>
                  </div>
                );
              })}
            </div>
          </fieldset>

          <fieldset
            id="reviews"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Đánh giá
            </legend>
            <div className="w-5/6 mx-auto my-3 items-center">
              <div
                style={{ marginBottom: "50px" }}
                className="flex justify-center border border-black rounded-2xl p-2 bg-[#BDFFFC]"
              >
                <div className="grid grid-cols-5 w-4/5 gap-4">
                  {calculateNumberRate(data.reviews).map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-col items-center gap-1 font-semibold bg-[#90EFEB] justify-center py-2 rounded-lg cursor-pointer"
                    >
                      <p>{item.title}</p>
                      <p>({item.number})</p>
                    </div>
                  ))}
                </div>
              </div>

              <ReviewList reviews={data.reviews} />
            </div>
          </fieldset>

          {/* <RateList data={data.rate} /> */}
          <fieldset
            id="policies"
            className="my-5 border border-[#359894] shadow-sm shadow-[#359894]"
          >
            <legend className="border border-gray-300 px-2 py-1 mx-3 font-bold">
              Chính sách của quán cà phê
            </legend>
            <div className="w-5/6 mx-auto my-3">
              <p>Phê thì mới cho về.</p>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
};

export default Detail;
