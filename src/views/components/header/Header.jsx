import React from "react";
import logo from "../../../assets/Logo.svg";
import cart from "../../../assets/Cart.svg";
import { NewMenu2, MenuSpan, HotlineContainer, Icon, Label, PhoneNumber, Separator, SearchCol, LowText, FunCol, NewMenu, MenuItem2 } from "./style";
import { jwtDecode } from "jwt-decode";
import { Image, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import user from '../../../assets/user.svg';
const Header = () => {
  const token = localStorage.getItem("token");

let decodedToken ={}
const navigate = useNavigate();
  if (token) {
    decodedToken = jwtDecode(token);
   // console.log("Thông tin giải mã token:",decodedToken );
  } else {
    console.log("Không có token để giải mã.");
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    
    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2000ms = 2 giây
    
    message.success("Đăng xuất thành công!");
  }

  let canHover = true;
  let canClick = true;
  if(!(decodedToken.role === "customer")){
    canClick= false;
  }

  if(location.pathname === "/cart"){
    canHover = false;
  }
  
  const cart2 = localStorage.getItem("cart");
  

  let parsedCart ={}
  if (cart) {
     
      parsedCart = JSON.parse(cart2); // Chuyển chuỗi JSON thành đối tượng
      
    } else {
      console.log("Giỏ hàng trống");
    }
    console.log("HELLLO",parsedCart)

    const handleLogin = () => {
      localStorage.clear();
     
      navigate('/login');
    
    };
  console.log(decodedToken )
    //

    const handleAccountClick = () => {
      const token = localStorage.getItem("token"); // Kiểm tra token trong localStorage
      if (!token) {
        navigate("/login"); // Điều hướng đến trang đăng nhập nếu chưa có token
      } else {
        navigate(`/user/${decodedToken.userID}`); // Điều hướng đến trang cá nhân nếu đã đăng nhập
      }
    };
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
       
      <FunCol style={{ marginRight:'12px', marginLeft:'12px' }}>
          <Image width={25} src={user} preview={false} />
          <LowText>TÀI KHOẢN</LowText>
          <NewMenu className="menu" >
          
            {token ? (
              <>
              
                <MenuItem2 style={{ width: "150px" }} onClick={handleAccountClick}  >
                  <MenuSpan>Trang cá nhân</MenuSpan>
                </MenuItem2>

                {decodedToken.role !== "Customer" && decodedToken.role !== "Provider" && (
                <><Link style={{textDecoration:'none'}} to='/admin'>
                  <MenuItem2 style={{ width: "150px" }}><MenuSpan>Quản lý web</MenuSpan></MenuItem2>
                </Link></>
              )}
                
                <MenuItem2 style={{ width: "150px" }} onClick={handleLogout}><MenuSpan>Thoát</MenuSpan></MenuItem2>
              </>
            ) : (
              <>
              
                  <MenuItem2 style={{ width: "150px" }}  onClick={handleLogin}><MenuSpan>Đăng nhập</MenuSpan></MenuItem2>
               
                <Link style={{textDecoration:'none'}} to='/signup'>
                  <MenuItem2 style={{ width: "150px" }}><MenuSpan>Đăng kí</MenuSpan></MenuItem2>
                </Link>
              </>
            )}
          </NewMenu>
        </FunCol>
      </div>
    </div>
  );
};

export default Header;
