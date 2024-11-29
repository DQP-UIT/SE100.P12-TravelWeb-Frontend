import React from 'react'
import { FaApple, FaFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const LoginOTP = () => {
  return (
    <div>
        <label className='font-bold text-xl'>Đăng nhập hoặc tạo tài khoản</label>
        <div className='my-1 text-sm'>
            <label>Đăng ký miễn phí hoặc đăng nhập để nhận được các ưu đãi và quyền lợi hấp dẫn!</label>
        </div>
        <div className='my-1'>
            <label>Số điện thoại</label>
            <input type='tel' className='border border-black rounded-md w-full p-1' placeholder='Số điện thoại'/>
        </div>
        <Link to='next' >
            <button className='w-full border border-[#4882E0] text-[#4882E0] font-bold py-1 rounded-md items-center gap-1 justify-center flex my-1'>Tiếp tục</button>
        </Link>
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

export default LoginOTP