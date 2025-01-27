import HomeSearch from "../../components/homesearch/HomeSearch"
import ReviewList from "../../components/reviewlist/ReviewList"
import { suggestLocation } from "../../../models/test-data"
import GPT from "../../components/GPT/GPT"
const Home = () => {

  
  return (
    <div className="md:w-full font-['Roboto']">
    <GPT></GPT>
      <section className="relative md:w-full mt-20">
        <HomeSearch suggestSearch={suggestLocation}/>
      </section>
      <section className="relative md:w-full">
        <div className="text-center">
          <b>Các điểm đến thu hút nhất Việt Nam</b>
        </div>
        <ReviewList/>
      </section>
    </div>
  )
}

export default Home