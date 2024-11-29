import React from "react";
import logo from "../../../assets/Logo.svg";
import cart from "../../../assets/Cart.svg";

const Header = ({ user }) => {
  return (
    <div className="w-full h-20 relative bg-[#dcf2f1] flex items-center justify-between px-4">
      <div className="flex flex-row items-center space-x-8">
        <img
          className="w-[100px] h-[100px] object-fill"
          src={logo}
          alt="Logo"
        />
        <div className="flex items-center space-x-8">
          <div className="text-[#0f1035] text-sm font-semibold font-['Roboto']">
            Chỗ ở
          </div>
          <div className="text-[#0f1035] text-sm font-bold font-['Roboto']">
            Nhà hàng
          </div>
          <div className="text-[#0f1035] text-sm font-semibold font-['Roboto']">
            Quán cà phê
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <img
          className="w-[15px] h-[15px] object-fill cursor-pointer"
          src={cart}
          alt="Cart"
          onClick={() => {}}
        />
        {user && (
          <div className="flex items-center space-x-2">
            <div className="w-[35px] h-[35px] bg-[#d9d9d9] rounded-full overflow-hidden">
              <img
                className="rounded-full w-full h-full"
                src={user.avatar}
                alt="Avatar"
                onClick={() => {}}
              />
            </div>
            <div className="text-black text-sm font-normal font-['Inter']">
              {user.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
