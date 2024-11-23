import RateItem from "./RateItem"

const RateList = ({data}) => {
  return (
    <div className="">
        {data.map(item => (
            <div key={item} className="my-4">
                <RateItem key={item} data={item} />
            </div>
        ))}
    </div>
  )
}

export default RateList