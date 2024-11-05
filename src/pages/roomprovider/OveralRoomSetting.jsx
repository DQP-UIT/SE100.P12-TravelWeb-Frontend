import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SettingTag from "./room_component/SettingTag";

const OveralRoomSetting = () => {
  const settings = [
    {
      name: "Thiết lập phòng",
      content: "Tạo và thiết lập phòng ngay",
      detail: "Mỗi phòng phải có ít nhất 1 hình ảnh được tải lên.",
      image: "src/assets/OverallBed.svg",
      route: "/setting1",
    },
    {
      name: "Hình ảnh khách sạn",
      content: "Tải lên hình ảnh cho khách sạn của bạn",
      detail:
        "Khách sạn của bạn cần ít nhất 1 hình ảnh. Hình ảnh chất lượng cao sẽ có nhiều lượt xem hơn.",
      image: "src/assets/OverallPhoto.svg",
      route: "/setting2",
    },
    {
      name: "Tiện nghi",
      content: "Cài đặt tiện nghi khách sạn",
      detail:
        "Chọn ít nhật 1 tiện nghi. Khách hàng lọc kết quả tìm kiếm dự trên tiện nghi có sẳn nên hãy đảm bảo bạn chọn đầy đủ tiện nghi mà khách sạn đang có.",
      image: "src/assets/OverallBell.svg",
      route: "/setting3",
    },
    {
      name: "Giá & phân phối phòng",
      content: "Tải giá và số phòng cho ít nhất 1 loại phòng trong 90 ngày tới",
      detail:
        "Tải giá phòng tại đây. Bạn có thể quản lý giá phòng mỗi ngày trong mục Quản lý phòng và Quản lý giá.",
      image: "src/assets/OverallDollar.svg",
      route: "/setting4",
    },
    {
      name: "Chính sách hủy",
      content: "Chính sách hủy phòng của khách sạn",
      detail:
        "Khách hàng có thể lọc tìm kiếm của họ dựa trên chính sách hủy phòng có sẳn nên hãy đảm bảo là bạn đã chọn chính sách tốt nhất mà khách sạn đang có.",
      image: "src/assets/OverallBook.svg",
      route: "/setting5",
    },
    {
      name: "Hợp đồng",
      content: "Trạng thái các hợp đồng của bạn",
      detail:
        "Chúng tôi đang xem xét hồ sơ của bạn. Nếu cần hổ trợ hãy liên hệ chúng tôi.",
      image: "src/assets/OverallContract.svg",
      route: "/setting6",
    },
  ];

  return (
    <div>
      <Header avatar="src/assets/react.svg" />
      <div className=" flex w-full h-[80px]">
        <div className="absolute mx-8 text-black text-[32px] font-sans font-medium ">
          Hồ sơ của bạn và Kích hoạt khách sạn
        </div>
        <div className="absolute right-0">
          <button
            type="button"
            className="text-white text-[20px] h-[60px] w-fit mx-2 bg-[#449CE5] hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          >
            Kích hoạt khách sạn
          </button>
        </div>
      </div>
      <div className="container mx-auto p-4 w-[1300px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {settings.map((setting, index) => (
            <SettingTag
              key={index}
              name={setting.name}
              content={setting.content}
              detail={setting.detail}
              image={setting.image}
              route={setting.route}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OveralRoomSetting;