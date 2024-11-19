import { FaLongArrowAltUp } from "react-icons/fa"
import MenuFilter from "../../components/menufilter/MenuFilter"
import RoomList from "../../components/roomlist/RoomList"
import RoomTag from "../../components/roomlist/RoomTag"
import SearchBar from "../../components/searchbar/SearchBar"
import { reviewList } from "../../models/test-data"

const Search = (type) => {
  
  return (
    <div className="md:w-full font-['Roboto']">
      <SearchBar type={type?'hotel':type}/>
      
      <div className='grid grid-cols-3 my-4 relative justify-center'>
        <div className="w-fit mx-auto">
          <MenuFilter type={type?'hotel':type}/>
        </div>
        <div className="w-11/12 col-span-2 justify-center mx-auto sm:mx-10">
          <div className="bg-[#F6FFFF] border rounded-xl font-bold">
            <ul className="w-auto grid grid-cols-4 mx-2 cursor-pointer items-center">
              <li>Sắp xếp:</li>
              <li className="flex p-2 border-l border-[#90EFEB] justify-center items-center hover:bg-[#D9D9D9]">
                Đánh giá
                <FaLongArrowAltUp/>
              </li>
              <li className="flex p-2 border-l border-[#90EFEB] justify-center items-center hover:bg-[#D9D9D9]">
                Khoảng cách
                <FaLongArrowAltUp/>
              </li>
              <li className="flex p-2 border-l border-[#90EFEB] justify-center items-center hover:bg-[#D9D9D9]">
                Giá
                <FaLongArrowAltUp/>
              </li>
            </ul>
          </div>
          <div className="my-2">
            <RoomList list={reviewList}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search