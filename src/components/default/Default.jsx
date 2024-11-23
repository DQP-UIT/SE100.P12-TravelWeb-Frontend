import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'

const Default = () => {
  const fakeUser = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
  };
  return (
    <div>
        <Header user={fakeUser}/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Default