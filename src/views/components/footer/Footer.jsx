import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#f7f7f7] py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-[#0f1035] text-sm font-bold font-['Inter'] mb-4">
          Mọi nội dung tại đây © 2005 – 2024 Công ty TNHH Tư nhân Fukune. Bảo
          Lưu Mọi Quyền.
          <br />
          Fukune.id.vn là thành viên của Tập đoàn Booking Holdings, nhà cung cấp
          dịch vụ du lịch trực tuyến & các dịch vụ có liên quan hàng đầu thế
          giới.
        </div>
        <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="text-center md:text-left">
            <span className="block text-[#0f1035] text-base font-bold font-['Inter']">
              Về Đi Đâu Đây
            </span>
            <span className="block text-[#0f1035] text-xs font-bold font-['Inter']">
              Cách dịch vụ
              <br />
              Liên hệ chúng tôi
              <br />
              Trợ giúp
              <br />
              Tuyển dụng
              <br />
              Về chúng tôi
            </span>
          </div>
          <div className="text-center md:text-left">
            <span className="block text-[#0f1035] text-base font-bold font-['Inter']">
              Dịch vụ
            </span>
            <span className="block text-[#0f1035] text-xs font-bold font-['Inter']">
              Chổ ở
              <br />
              Nhà hàng
              <br />
              Quán cà phê
              <br />
            </span>
          </div>
          <div className="text-center md:text-left">
            <span className="block text-[#0f1035] text-base font-bold font-['Inter']">
              Follow chúng tôi
            </span>
            <span className="block text-[#0f1035] text-xs font-bold font-['Inter']">
              Facebook
              <br />
              Instagram
              <br />
              Telegram
              <br />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex justify-center ">
        <img src="https://github.com/DQP-UIT/SE100.P12-TravelWeb-Frontend/blob/phucfe/src/assets/footer.svg" alt="footer" className="absolute" />
      </div>
    </div>
  );
};

export default Footer;
