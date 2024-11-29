import RoomBookItem from "./RoomBookItem"

const RoomBookList = ({data}) => {
  return (
    <div className="">
        {data.map(item => (
            <div key={item} className="my-4">
                <RoomBookItem key={item} data={item} />
            </div>
        ))}
    </div>
  )
}

export default RoomBookList