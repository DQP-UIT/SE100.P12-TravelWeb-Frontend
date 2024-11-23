import { CiStar } from "react-icons/ci"
import { FaCalendarCheck, FaCaretDown, FaRegUser, FaRocketchat } from "react-icons/fa6"
import { Link, Outlet } from "react-router-dom"

const userNav = [
    {
        icon: <FaCalendarCheck/>,
        title: 'Đơn đặt chỗ của tôi',
        id: 'order',
        children: [
            'Khách sạn',
            'Nhà hàng',
            'Quán cà phê',
        ],
    },
    {
        icon: <FaRocketchat/>,
        id: 'chat',
        title: 'Tin nhắn từ chỗ nghỉ',
    },
    {
        icon: <CiStar/>,
        id: 'rate',
        title: 'Nhận xét',
    },
    {
        icon: <FaRegUser/>,
        title: 'Hồ sơ',
        id: 'profile',
        children: [
            'Thông tin người dùng',
            'Phương thức thanh toán',
            'Đăng ký nhận thư điện tử',
        ],
    },
]

const User = () => {
  const onClick = 'profile'

  return (
    <div className='w-full m-5 flex gap-5 font-[Roboto]'>
        <div className='w-fit mx-2'>
            <ul className="bg-[#DCF2F1] text-[#4882E0] p-2 shadow-xl rounded-xl ">
                {userNav.map(item => (
                    <Link key={item.id} to={item.id}>
                        {item.id == onClick && (
                            <li>
                                <div className="flex gap-1 items-center bg-[#BBFBF9] text-black">
                                    <p>{item.icon}</p>
                                    <p>{item.title}</p>
                                    <p><FaCaretDown/></p>
                                </div>
                                {item.children && item.title == 'Hồ sơ' && (
                                    <Link>
                                        <li>
                                            {item.children.map(child => (
                                                <p key={child} className="px-3">{child}</p>
                                            ))}
                                        </li>
                                    </Link>
                                )}
                            </li>
                        )}
                        {item.id != onClick && (
                            <li>
                                <div className="flex gap-1 items-center">
                                    <p>{item.icon}</p>
                                    <p>{item.title}</p>
                                </div>
                                {item.children && item.title == 'Hồ sơ' && (
                                    <Link>
                                        <li>
                                            {item.children.map(child => (
                                                <p key={child} className="px-3">{child}</p>
                                            ))}
                                        </li>
                                    </Link>
                                )}
                            </li>
                        )}
                    </Link>
                ))}
            </ul>
        </div>
        <div className='lg:w-5/6 sm:w-4/6'>
            <Outlet/>
        </div>
    </div>
  )
}

export default User