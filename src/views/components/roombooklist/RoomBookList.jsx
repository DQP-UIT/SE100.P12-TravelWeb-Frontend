import RoomBookItem from "./RoomBookItem"

const RoomBookList = ({data,provider,service}) => {
  console.log(provider)
  return (
    <div className="">
        {data.map(item => (
            <div key={item} className="my-4">
                <RoomBookItem provider={provider} service={service} key={item} data={item} />
            </div>
        ))}
    </div>
  )
}

export default RoomBookList