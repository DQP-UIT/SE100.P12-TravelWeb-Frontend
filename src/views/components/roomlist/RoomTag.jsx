import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel-custom.css";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLoveList } from "../../../model/loveListSlice";
import { Image, notification } from "antd";

const RoomTag = ({ room, userID }) => {
  const dispatch = useDispatch();
  const { loveList } = useSelector((state) => state.loveList);
  const [liked, setLiked] = useState(false);
  const selectedServiceType = useSelector((state) => state.serviceType.selectedServiceType);

  useEffect(() => {
    setLiked(loveList.some((item) => item._id === room._id));
  }, [loveList, room, liked, userID]);

  const handleLikeClick = (event) => {
    event.stopPropagation();

    // Kiểm tra nếu chưa đăng nhập (userID không tồn tại)
    if (!userID) {
      notification.warning({
        message: "Bạn cần đăng nhập trước",
        description: "Vui lòng đăng nhập để sử dụng tính năng yêu thích.",
        placement: "topRight",
      });
      return; // Dừng hàm nếu chưa đăng nhập
    }

    // Cập nhật lại loveList khi like/unlike
    const newLoveList = liked
      ? loveList.filter((item) => item._id !== room._id).map((item) => item._id) // Loại bỏ và chỉ lấy _id
      : [...loveList, { _id: room._id }].map((item) => item._id); // Thêm và chỉ lấy _id

    dispatch(updateLoveList({ userID: userID, loveList: newLoveList }));

    // Hiển thị thông báo thành công
    notification.success({
      message: liked ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích",
      description: liked
        ? `Bạn vừa xóa "${room.title}" khỏi danh sách yêu thích.`
        : `Bạn vừa thêm "${room.title}" vào danh sách yêu thích.`,
      placement: "topRight",
    });

    // Cập nhật trạng thái liked
    setLiked(!liked);
  };

  const navigate = useNavigate();
  const handleRoomClick = () => {
    navigate(`/detail/${room.id}`);
  };

  return (
    <div className="relative w-full min-w-fit max-w-3xl h-[270px] p-4 mb-6 bg-teal-50 shadow-lg rounded-lg mt-4 mx-4">
      <div className="w-full h-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-[450px] h-full bg-black/0 rounded-[5px] relative overflow-hidden">
          <Carousel
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            dynamicHeight={false}
            interval={3000}
            transitionTime={500}
            className="rounded-lg w-full h-full"
            onClick={handleRoomClick}
          >
            {room.images.map((image, index) => (
              <div key={index} onClick={handleRoomClick} className="w-[250px] h-[250px] relative">
                <Image
                  src={image}
                  className="w-[250px] h-[250px] rounded-md object-cover"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
            ))}
          </Carousel>
          <div
            className="absolute z-10 w-10 h-10 top-2 right-7 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center bg-white"
            onClick={handleLikeClick}
          >
            {liked ? <Favorite className="text-red-500" /> : <FavoriteBorder className="text-gray-500" />}
          </div>
        </div>

        {/* Phần thông tin room */}
        <div onClick={handleRoomClick} className="flex flex-row ml-4 max-w-2xl min-w-[330px]">
          <div className="flex-1">
            <div className="text-gray-900 text-base font-semibold mb-2">{room.title}</div>
            <div className="text-gray-800 text-xs font-semibold mb-4 flex items-center">
              Số sao
              <Rating
                name="read-only"
                value={room.overview}
                readOnly
                size="small"
                className="ml-2"
              />
            </div>
            <div className="text-blue-600 text-xs font-semibold mb-2">{room.location}</div>

            {selectedServiceType === "hotel" && (
              <>
              <div>
              <span style={{ textDecoration: "line-through", fontSize: "0.8em" }}>
                {room?.price?.toLocaleString("vi-VN")} VND
              </span>
            </div>
            <div>
              <span style={{ color: "red", fontWeight: "bold" }}>
                {room?.dprice?.toLocaleString("vi-VN")} VND
              </span>
            </div>
              </>
            ) 
            }


            {selectedServiceType === "restaurant" &&  (
              <div className="text-black font-bold">
              <span className="text-sm">
 
  {room?.price?.toLocaleString("vi-VN")}{" VND "} - {" "}
  {room?.dprice?.toLocaleString("vi-VN")} VND / người
</span>

              </div>
            ) }


            {selectedServiceType === "cafe" &&  (
              <div className="text-black font-bold">
              <span style={{ fontWeight: "bold" }}>
               Từ {room?.dprice?.toLocaleString("vi-VN")} VND
              </span>

              </div>
            ) }
          </div>

          <div className="flex-1 ml-2 mr-1">
            <div className="text-gray-800 text-lg font-semibold mb-2">Nơi này có:</div>
            <div className="flex flex-wrap">
              {room.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="text-black text-[12.90px] p-1 font-semibold mr-4 mb-2 bg-gray-200 rounded-lg"
                >
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTag;
