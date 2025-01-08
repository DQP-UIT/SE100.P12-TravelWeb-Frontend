import React, { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    // Kiểm tra xem script đã được chèn chưa, tránh chèn lại nhiều lần
    if (document.getElementById("tawk-script")){
        console.log("tawk-script")
        return;

    } 

    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/6778f72faf5bfec1dbe6715e/1igo8b4ni"; // Đảm bảo mã nhúng đúng
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    script.id = "tawk-script";  // Đặt id cho script để kiểm tra dễ dàng

    // Thêm script vào cuối body khi component đã render
    document.body.appendChild(script);

    // Dọn dẹp khi component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);  // Chạy chỉ 1 lần khi component mount

  return null; // Không cần hiển thị gì trong component này
};

export default ChatBot;
