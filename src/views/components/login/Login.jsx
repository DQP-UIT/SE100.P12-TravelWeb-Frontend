import React from 'react'
import { FaApple, FaFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <label className='font-bold text-xl'>Đăng nhập</label>
        <div className='my-1 text-sm'>
            <label>Để đảm bảo an toàn, xin vui lòng đăng nhập để truy cập vào thông tin</label>
        </div>
        <div className='my-1'>
            <label>Email/SĐT</label>
            <input type='text' className='border border-black rounded-md w-full p-1' placeholder='Email/Số điện thoại'/>
        </div>
        <div className='my-1'>
            <label>Mật khẩu</label>
            <input type='password' className='border border-black rounded-md w-full p-1' placeholder='Mật khẩu'/>
        </div>
        <div className='my-2'>
            <button className='w-full bg-[#4882E0] text-white font-bold py-1 rounded-md'>Đăng nhập</button>
        </div>
        <Link to='/account/login-otp' >
            <button className='w-full border border-[#4882E0] text-[#4882E0] font-bold py-1 rounded-md items-center gap-1 justify-center flex my-1'>Đăng nhập bằng OTP</button>
        </Link>
        <div className='my-2 grid grid-cols-3 text-[#4882E0]'>
            <Link to='/account/signup' >
                <button>Tạo tài khoản</button>
            </Link>
            <p></p>
            <button>Quên mật khẩu?</button>
        </div>
        <fieldset className='border-t border-black my-2 py-2 text-[#4882E0] font-bold'>
            <legend className='mx-auto px-2 text-black font-normal'>hoặc đăng nhập bằng</legend>
            <button className='w-full border border-[#4882E0] py-1 rounded-md items-center gap-1 justify-center flex my-1'>
                <FcGoogle/>
                Google
            </button>
            <div className='grid grid-cols-2 gap-2'>
                <button className='w-full border border-[#4882E0] py-1 rounded-md items-center gap-1 justify-center flex my-1'>
                    <FaFacebook/>
                    Facebook
                </button>
                <button className='w-full border border-[#4882E0] py-1 rounded-md items-center gap-1 justify-center flex my-1'>
                    <FaApple className='text-black'/>
                    Apple
                </button>
            </div>
        </fieldset>
    </div>
  )
}

export default Login