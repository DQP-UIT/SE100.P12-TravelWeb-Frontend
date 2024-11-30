import { FaLongArrowAltUp } from "react-icons/fa"
import MenuFilter from "../../components/menufilter/MenuFilter"
import RoomList from "../../components/roomlist/RoomList"
import SearchBar from "../../components/searchbar/SearchBar"
import { reviewList } from "../../../models/test-data"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { clearErrors, getHotelType } from "../../../controller/hotelTypeAction"

const Search = (type) => {
  const dispatch = useDispatch();
    
  const {
    hotelTypes,
    loading,
    error,
   
  } = useSelector((state) => state.hotelType);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getHotelType());
  }, [dispatch, error]);



  return (
    <div className="md:w-full font-['Roboto']">
    {
      console.log(hotelTypes)
    }
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
            <RoomList rooms={reviewList}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search