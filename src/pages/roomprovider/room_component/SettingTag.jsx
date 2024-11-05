import React from "react";
//import { useNavigate } from "react-router-dom";

const SettingTag = ({ name, content, detail, image, route }) => {
  //const navigator = useNavigate();
  return (
    <div
      className="w-[400px] h-[300px] p-4 bg-[#C9C9C9] rounded-[5px] cursor-pointer hover:scale-110 hover:bg-[#5498F0] group"
      // onClick={() => {
      //   navigator(route);
      // }}
    >
      <div className="flex flex-col items-start">
        <div className="w-[50px] h-[50px] mb-4">
          <img
            src={image}
            alt="Icon"
            className="w-full h-full object-fill"
          />
        </div>
        <div className="text-[#2D81D6] group-hover:text-white text-[24px] font-medium font-sans mb-2">
          {name}
        </div>
        <div className="text-white text-base font-normal font-['Roboto'] mb-2">
          {content}
        </div>
        <div className="w-full border-t border-white mb-2"></div>
        <div className="text-white text-lg font-normal font-['Roboto']">
          {detail}
        </div>
      </div>
    </div>
  );
};

export default SettingTag;
