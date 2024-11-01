import React from "react";

const SettingTag = () => {
  return (
    <div>
      <div className="w-[520px] h-[390px] relative">
        <div className="w-[486px] h-[41px] left-[13px] top-[118px] absolute text-[#2c81d6] text-[32px] font-normal font-['Roboto']">
          Thiết lập phòng
        </div>
        <div className="w-[472px] h-[22px] left-[13px] top-[166px] absolute text-white text-base font-normal font-['Roboto']">
          Tạo và thiết lập phòng ngay
        </div>
        <div className="w-[60px] h-[60px] left-[24px] top-[38px] absolute">
          <div className="w-[26.26px] h-[29.05px] left-[1.47px] top-[27.58px] absolute"></div>
          <div className="w-[31.57px] h-[23.76px] left-[25.92px] top-[33.18px] absolute"></div>
          <div className="w-[24.14px] h-[24.31px] left-[4.24px] top-[21.06px] absolute"></div>
          <div className="w-[29.02px] h-[19.88px] left-[26.71px] top-[25.75px] absolute"></div>
          <div className="w-[7.06px] h-[6.22px] left-[32.24px] top-[10.18px] absolute"></div>
          <div className="w-[7.86px] h-[6.94px] left-[44.27px] top-[15.69px] absolute"></div>
        </div>
        <div className="w-[495px] h-[0px] left-[13px] top-[195px] absolute border border-white"></div>
        <div className="w-[484px] h-[71px] left-[14px] top-[215px] absolute text-white text-2xl font-normal font-['Roboto']">
          Mỗi phòng phải có ít nhất 1 hình ảnh được tải lên
        </div>
      </div>
    </div>
  );
};

export default SettingTag;
