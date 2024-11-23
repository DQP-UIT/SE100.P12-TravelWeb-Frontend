import { Outlet } from 'react-router-dom'

const AccountLogin = () => {
  return (
    <form className='lg:w-1/5 sm:w-2/5 p-2 mx-auto my-2 shadow-xl border rounded-xl font-[Roboto]'>
        <Outlet/>
        <div className='text-xs text-center my-4'>
            Khi đăng nhập, tôi đồng ý với các Điều khoản sử dụng và Chính sách bảo mật của Agoda.
        </div>
    </form>
  )
}

export default AccountLogin