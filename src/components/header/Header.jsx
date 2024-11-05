import React from "react";

const Header = ({ avatar }) => {
  return (
    <div>
      <div className="w-full h-20 relative">
        <div className="w-full h-[76px] left-0 top-0 absolute">
          <div className="w-full h-[76px] left-0 top-0 absolute bg-[#dcf2f1]" />
          <div className="w-[312px] h-[25px] left-[418px] top-[30px] absolute">
            <div className="w-[68px] h-[22px] left-[107px] top-0 absolute text-[#0f1035] text-sm font-semibold font-['Roboto']">
              Nhà hàng
            </div>
            <div className="w-[56.20px] h-[21px] left-0 top-[2px] absolute text-[#0f1035] text-sm font-bold font-['Roboto']">
              Chổ ở
            </div>
            <div className="w-[90px] h-[23px] left-[222px] top-[2px] absolute text-[#0f1035] text-sm font-semibold font-['Roboto']">
              Quán cà phê
            </div>
          </div>
        </div>
        <div className="w-[208px] h-[77px] left-[98.84px] top-[3px] absolute">
          <div className="w-fit h-[4.05px] left-[134.18px] top-0 absolute" />
          <img
            className="w-[129.90px] h-[77px] left-0 top-0 absolute"
            src="src/assets/Preparing for vacation.svg"
            alt="Logo"
          />
          <div className="w-[120.12px] h-[59.02px] left-[88.16px] top-[3.02px] absolute">
            <div className="w-[95.26px] h-[65px] left-[24.86px] top-0 absolute bg-[#cdd5d5] rounded-tl-lg rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px]" />
            <div className="w-[71.71px] h-12 left-[41.63px] top-[6px] absolute text-black text-xl font-bold font-['Inter']">
              ĐI ĐÂU ĐÂY!!!
            </div>
          </div>
        </div>
        <div className="w-[130px] h-[63px] left-[1565px] top-[5px] absolute hover:backdrop-blur-md">
          <img
            className="w-[15px] h-[15px] left-[115px] top-[21px] absolute"
            src="src/assets/Cart.svg"
            alt="Cart"
            onClick={() => {}}
          />
          {avatar && (
            <div className="w-[35px] h-[35px] left-[32px] top-0 absolute bg-[#d9d9d9] rounded-full">
              <img
                className="rounded-full w-full h-full"
                src={avatar}
                alt="Avatar"
                onClick={() => {}}
              />
              <div className="left-0 top-[46px] absolute text-black text-sm font-normal font-['Inter']">
                Trần Ngọc Phú
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
