import React from 'react'
import { FaAngleDown, FaAngleLeft, FaApple, FaFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const otpBox = [1,2,3,4,5,6]

const LoginOTPNext = () => {  
  return (
    <div>
        <Link to={'..'}><FaAngleLeft/> </Link>
        <label className='font-bold text-xl'>Đăng nhập bằng OTP</label>
        <div className='my-1 text-sm'>
            <label>Nhập OTP được cung cấp trong thư điện tử gửi cho 096124****</label>
        </div>
        <div className='grid grid-cols-6 py-2'>
            {otpBox.map(item => (
                <input key={item} type='text' maxLength={1} className='w-8 h-8 border rounded-md border-black text-center'/>
            ))}
        </div>
        <Link to='/account/login-otp' >
            <button className='w-full border border-[#4882E0] text-[#4882E0] font-bold py-1 rounded-md items-center gap-1 justify-center flex my-1'>Tiếp tục</button>
        </Link>
        <button className='w-full text-[#4882E0] font-bold py-1 rounded-md items-center gap-1 justify-center flex my-1'>Gửi lại số điện thoại</button>
        <fieldset className='border-t border-black my-2 py-2 text-[#4882E0] font-bold justify-center'>
            <legend className='mx-auto px-2 text-black font-normal'>hoặc</legend>
            <button className='w-full text-[#4882E0] font-bold py-1 rounded-md items-center gap-1 justify-center flex'>
                Đăng nhập bằng cách khác
                <FaAngleDown/>
            </button>
            <div className='w-fit grid grid-cols-3 gap-2 mx-auto'>
                <button className='w-fit h-fit py-1 items-center my-1'><FcGoogle/></button>
                <button className='w-fit h-fit py-1 items-center my-1'><FaFacebook/></button>
                <button className='w-fit h-fit py-1 items-center my-1'><FaApple className='text-black'/></button>
            </div>
            <Link to={'/account/login'}>
                <button className='w-full text-[#4882E0] font-bold py-1 rounded-md items-center gap-1 justify-center'>Sử dụng mật khẩu</button>
            </Link>
        </fieldset>
    </div>
  )
}

export default LoginOTPNext