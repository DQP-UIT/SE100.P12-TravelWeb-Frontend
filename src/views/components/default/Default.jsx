import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'

const Default = () => {
  const fakeUser = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
  };
  return (
    <div className='w-full h-full'>
        <Header user={fakeUser}/>
        <div className='w-full h-full'>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Default