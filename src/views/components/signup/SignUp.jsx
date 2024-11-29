import { FaApple, FaFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
        <label className='font-bold text-xl'>Đăng ký</label>
        <div className='my-1'>
            <label>Tên</label>
            <input type='text' className='border border-black rounded-md w-full p-1' placeholder='Tên'/>
        </div>
        <div className='my-1'>
            <label>Họ</label>
            <input type='text' className='border border-black rounded-md w-full p-1' placeholder='Họ'/>
        </div>
        <div className='my-1'>
            <label>Email</label>
            <input type='email' className='border border-black rounded-md w-full p-1' placeholder='Email'/>
        </div>
        <div className='my-1'>
            <label>SĐT</label>
            <input type='tel' className='border border-black rounded-md w-full p-1' placeholder='Số điện thoại'/>
        </div>
        <div className='my-1'>
            <label>Mật khẩu</label>
            <input type='password' className='border border-black rounded-md w-full p-1' placeholder='Mật khẩu'/>
        </div>
        <div className='my-1'>
            <label>Xác nhận mật khẩu</label>
            <input type='password' className='border border-black rounded-md w-full p-1' placeholder='Xác nhận mật khẩu'/>
        </div>
        <div className='flex gap-2 my-2'>
            <input type='checkbox'/>
            <label className='text-xs'>Tôi đồng ý nhận thông tin cập nhật và chương trình khuyến mãi về Đi đâu đây và các chi nhánh hoặc đối tác kinh doanh của Đi đâu đây thông qua nhiều kênh, bao gồm WhatsApp. Có thể ngừng nhận thông tin bất cứ lúc nào. Đọc thêm trong Chính sách Quyền riêng tư.</label>
        </div>
        <div>
            <button className='w-full bg-[#4882E0] text-white font-bold py-1 rounded-md'>Đăng ký</button>
        </div>
        <fieldset className='border-y border-black my-2 py-2 text-[#4882E0] font-bold'>
            <legend className='mx-auto px-2 text-black font-normal'>hoặc tiếp tục với</legend>
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
        <Link to='/account/login' >
            <button className='w-full border border-[#4882E0] text-[#4882E0] font-bold py-1 rounded-md items-center gap-1 justify-center flex my-1'>Bạn đã có tài khoản? Đăng nhập</button>
        </Link>
        
    </div>
  )
}

export default SignUp