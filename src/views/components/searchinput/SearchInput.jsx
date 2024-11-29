import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaMapLocationDot } from 'react-icons/fa6'

// eslint-disable-next-line react/prop-types
const SearchInput = ({suggestSearch}) => {
    const [activeSearch, setActiveSearch] = useState([])

    //Hàm gợi ý địa điểm cho Search (tìm kiếm)
    const handleSearch = (e) => {
      if (e.target.value == ''){
        setActiveSearch([])
        return false
      }
      // eslint-disable-next-line react/prop-types
      setActiveSearch(suggestSearch.filter(item => item.title.includes(e.target.value)).slice(0,5))
    }
    return (
        <div className='relative flex mx-auto items-center h-fit w-4/5'>
            <div className="w-full">
                <button type='button' className="absolute left-3 top-3.5 flex">
                    <CiSearch/>
                </button>
                <input
                    type="search"
                    placeholder="Nhập điểm mốc"
                    className="w-full py-3 ps-10 pe-2 block text-sm bg-white border-2 rounded-full border-[#DEEBF0] focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                    onChange={(e) => handleSearch(e)}
                />
            </div>
            <FaMapLocationDot className='ms-4 size-8 text-[#359894]'/>
            {
                activeSearch.length > 0 && (
                    <div className='w-full absolute top-12 bg-white text-black py-2 border-2 rounded-xl left-1/2 -translate-x-1/2 flex flex-col z-20'>
                        {suggestSearch.map((item) => (
                            <div key={'searchinput'} className='w-full flex px-2 py-1 hover:bg-[#7FC7D9] hover:text-white'>
                                <img src={item.image} className='w-10'/>
                                <div className='mx-2 w-full'>
                                    <p>{item.title}</p>
                                    <p className='opacity-60'>{item.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default SearchInput