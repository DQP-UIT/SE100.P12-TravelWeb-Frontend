import { Switch } from "antd"
import { useState } from "react"

const itemProfile = [
    {
        title: 'Thông tin người dùng',
        contents: [
            {
                id: 'name',
                avatar: 'https://via.placeholder.com/40x40',
                title: 'Họ và tên',
                content: 'Trần Phong',
                button: 'click',
            },
            {
                id: 'email',
                title: 'Email',
                content: 'tuanphongbrvt1@gmail.com',
                tag: 'ĐÃ XÁC NHẬN',
            },
            {
                id: 'tel',
                title: 'Số điện thoại',
                content: '',
                button: 'click',
            },
            {
                id: 'password',
                title: 'Mật khẩu',
                content: '123456789',
                button: 'click',
            },
        ],
    },
    {
        title: 'Phương thức thanh toán',
        contents: [
            {
                id: 'card',
                content: 'Lưu thông tin thẻ tín dụng của tôi',
                note: 'Đi Đâu Đây có thể lưu thông tin thẻ của bạn trên hệ thống an toàn của chúng tôi, giúp bạn đặt phòng nhanh và dễ dàng hơn. Bạn có thể thay đổi các thiết lập này về sau. Xin lưu ý, nếu bạn chọn "KHÔNG", các thông tin thẻ đã lưu trước đó cũng sẽ bị xóa.',
                button: 'toggle',
            },
        ],
    },
    {
        title: 'Đăng ký nhận thư điện tử',
        contents: [
            {
                id: 'news',
                content: 'Bản tin',
                button: 'select',
                options: [
                    'Hàng ngày',
                    'Hai lần một tuần',
                    'Hàng tuần',
                    'Không bao giờ',
                ],
            },
            {
                id: 'registerBook',
                content: 'Tôi muốn nhận thông tin nhắc nhở hỗ trợ đặt phòng.',
                button: 'toggle',
            },
            {
                id: 'registerDiscount',
                content: 'Tôi muốn nhận email về khuyến mãi.',
                button: 'toggle',
            },
            
            {
                id: 'registerTour',
                content: 'Tôi muốn biết thông tin và ưu đãi liên quan đến chuyến đi sắp tới của mình.',
                button: 'toggle',
            },
        ],
    },
]

const Profile = () => {
  const [toggle, setToggle] = useState([''])
  return (
    <form className="w-full">
        {itemProfile.map(item => (
            <div key={item} className="py-2 flex flex-col gap-2">
                <label className="text-lg">{item.title}</label>
                {item.contents.map(content => (
                    <div key={content.id} className="w-full">
                        {content.id == 'name' && (
                            <div className="w-full bg-[#6CFF6E] flex gap-2 px-2 py-1 items-center rounded-lg">
                                <img src={content.avatar} className="rounded-full size-10"/>
                                <div className="w-full">
                                    <p className="font-bold">{content.title}</p>
                                    <p>{content.content} </p>
                                </div>
                                <button className="text-nowrap">Chỉnh sửa</button>
                            </div>
                        )}
                        {content.id!='name' && (
                            <div className="w-full bg-[#DCF2F1] flex gap-2 px-2 py-1 items-center rounded-lg">
                                <div className="w-full py-1">
                                    <p className="font-bold">{content.title}</p>
                                    {content.content && content.id == 'password' && (
                                        <input type="password" disabled className="bg-[#DCF2F1]" value={content.content} />
                                    )}
                                    {content.content && content.id != 'password' && (
                                        <p className="pr-2">{content.content}</p>
                                    )}
                                    {!content.content && (
                                        <p className="h-5"></p>
                                    )}
                                    {content.button == 'select' && (
                                        <div className="grid grid-cols-4">
                                            {content.options.map(option => {
                                                return (
                                                    <div key={option} className="flex gap-1">
                                                        <input type="radio" name="news"/>
                                                        <p>{option}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {content.button == 'click' && content.content && (
                                        <button className="text-nowrap">Chỉnh sửa</button>
                                    )}
                                    {content.button == 'click' && !content.content && (
                                        <button className="text-nowrap">Thêm</button>
                                    )}
                                    {content.button == 'toggle' && (
                                        <div>
                                            <p>{toggle} </p>
                                            <Switch onChange={e => setToggle(e.target.value)}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ))}
        <div className="w-full bg-[#DCF2F1] px-2 py-1 rounded-lg">
            <button className="text-[#4882E0]">Xóa tài khoản của tôi</button>
        </div>
    </form>
  )
}

export default Profile