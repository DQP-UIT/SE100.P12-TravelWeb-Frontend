import SearchDate from "../searchdate/SearchDate"
import SearchInput from "../searchinput/SearchInput"
import SearchMember from "../searchmember/SearchMember"

const SearchBar = ({type}) => {

  
  return (
    <div className="w-screen bg-[#9BE1DE] flex py-3 items-center justify-center">
      <div className="w-1/3">
        <SearchInput/>
      </div>
      {type != 'cafe' && (
        <>
          <div className="w-1/6">
            <SearchDate searchType={type}/>
          </div>
          <div className="w-1/6 mx-8">
            <SearchMember/>
          </div>
        </>
      )}
      <div className="w-1/6">
        <button className='bg-[#0B8C86] px-4 py-2 text-white text-xl border rounded-lg'>Tìm</button>
      </div>
    </div>
  )
}

export default SearchBar