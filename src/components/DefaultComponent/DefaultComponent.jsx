import HeaderComponent from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'
import { Outlet } from 'react-router-dom'

const DefaultComponent = () => {
  return (
    <div>
        <HeaderComponent/>
        <Outlet/>
        <FooterComponent/>
    </div>
  )
}

export default DefaultComponent