import { FaStar } from "react-icons/fa"

const starRate = (index) => {
    const stars = []
    for (let i = 0; i < index; i++)
        stars[i] = '*'
    return (
        <div className="flex">
            {stars.map(star => (
                <FaStar key={star} className="text-yellow-400"/>
            ))}
        </div>
    )
}

export const filterHotel = [
    {
        title: 'Xếp hạng sao',
        level: 1,
        item: [
            {
                title: starRate(5),
                level: 2,
            },
            {
                title: starRate(4),
                level: 2,
            },
            {
                title: starRate(3),
                level: 2,
            },
            {
                title: starRate(2),
                level: 2,
            },
            {
                title: starRate(1),
                level: 2,
            },
            {
                title: 'Không xếp loại',
                level: 2,
            },
        ]
    },
    {
        title: 'Loại hình nhà ở',
        level: 1,
        item: [
            {
                title: 'Homestay',
                level: 2,
            },
            {
                title: 'Khách sạn',
                level: 2,
            },
            {
                title: 'Biệt thự',
                level: 2,
            },{
                title: 'Resort',
                level: 2,
            },{
                title: 'Nhà nghỉ',
                level: 2,
            },{
                title: 'Nhà dịch vụ',
                level: 2,
            },
        ]
    },
    {
        title: 'Tiện ích',
        level: 1,
        item: [
            {
                title: 'Homestay',
                level: 2,
            },
            {
                title: 'Khách sạn',
                level: 2,
            },
            {
                title: 'Biệt thự',
                level: 2,
            },{
                title: 'Resort',
                level: 2,
            },{
                title: 'Nhà nghỉ',
                level: 2,
            },{
                title: 'Nhà dịch vụ',
                level: 2,
            },
        ]
    },
    {
        title: 'Loại giường',
        level: 1,
        item: [
            {
                title: 'Homestay',
                level: 2,
            },
            {
                title: 'Khách sạn',
                level: 2,
            },
            {
                title: 'Biệt thự',
                level: 2,
            },{
                title: 'Resort',
                level: 2,
            },{
                title: 'Nhà nghỉ',
                level: 2,
            },{
                title: 'Nhà dịch vụ',
                level: 2,
            },
        ]
    },
    {
        title: 'Loại hình thanh toán',
        level: 1,
        item: [
            {
                title: 'Tiền mặt',
                level: 2,
            },
            {
                title: 'Chuyển khoản',
                level: 2,
            },
        ]
    },
]

export const filterRestaurant = [
    {
        title: 'Xếp hạng sao',
        level: 1,
        item: [
            {
                title: starRate(5),
                level: 2,
            },
            {
                title: starRate(4),
                level: 2,
            },
            {
                title: starRate(3),
                level: 2,
            },
            {
                title: starRate(2),
                level: 2,
            },
            {
                title: starRate(1),
                level: 2,
            },
            {
                title: 'Không xếp loại',
                level: 2,
            },
        ]
    },
    {
        title: 'Loại hình',
        level: 1,
        item: [
            {
                title: 'Nhà hàng',
                level: 2,
            },
            {
                title: 'Đồ ăn nhanh',
                level: 2,
            },
            {
                title: 'Tiệm bánh',
                level: 2,
            },
            {
                title: 'Quán bar',
                level: 2,
            },
        ]
    },
    {
        title: 'Bữa ăn',
        level: 1,
        item: [
            {
                title: 'Bữa sáng',
                level: 2,
            },
            {
                title: 'Bữa trưa',
                level: 2,
            },
            {
                title: 'Bữa tối',
                level: 2,
            },
            {
                title: 'Nửa buổi',
                level: 2,
            },
        ]
    },
    {
        title: 'Giá',
        level: 1,
        item: [
            {
                title: 'Giá rẻ',
                level: 2,
            },
            {
                title: 'Hạng trung',
                level: 2,
            },
            {
                title: 'Sang trọng',
                level: 2,
            },
        ]
    },
    {
        title: 'Quốc gia',
        level: 1,
        item: [
            {
                title: 'Ý',
                level: 2,
            },
            {
                title: 'Pháp',
                level: 2,
            },
            {
                title: 'Á',
                level: 2,
            },
        ]
    },
    {
        title: 'Thực đơn',
        level: 1,
        item: [
            {
                title: 'Salad',
                level: 2,
            },
            {
                title: 'Beefsteak',
                level: 2,
            },
            {
                title: 'Soup',
                level: 2,
            },
            {
                title: 'Fried',
                level: 2,
            },
        ]
    },
    {
        title: 'Phù hợp với',
        level: 1,
        item: [
            {
                title: 'Gia đình',
                level: 2,
            },
            {
                title: 'Hẹn hò',
                level: 2,
            },
            {
                title: 'Cá nhân',
                level: 2,
            },
            {
                title: 'Hội nhóm',
                level: 2,
            },
            {
                title: 'Công ty',
                level: 2,
            },
        ]
    },
    {
        title: 'Tiện ích',
        level: 1,
        item: [
            {
                title: 'Gia đình',
                level: 2,
            },
            {
                title: 'Hẹn hò',
                level: 2,
            },
            {
                title: 'Cá nhân',
                level: 2,
            },
            {
                title: 'Hội nhóm',
                level: 2,
            },
            {
                title: 'Công ty',
                level: 2,
            },
        ]
    },
    {
        title: 'Thanh toán',
        level: 1,
        item: [
            {
                title: 'Tiền mặt',
                level: 2,
            },
            {
                title: 'Chuyển khoản',
                level: 2,
            },
            {
                title: 'Thẻ',
                level: 2,
            },
        ]
    },
]

export const filterCafe = [
    {
        title: 'Xếp hạng sao',
        level: 1,
        item: [
            {
                title: starRate(5),
                level: 2,
            },
            {
                title: starRate(4),
                level: 2,
            },
            {
                title: starRate(3),
                level: 2,
            },
            {
                title: starRate(2),
                level: 2,
            },
            {
                title: starRate(1),
                level: 2,
            },
            {
                title: 'Không xếp loại',
                level: 2,
            },
        ]
    },
    {
        title: 'Loại hình',
        level: 1,
        item: [
            {
                title: 'Cà phê 24h',
                level: 2,
            },
            {
                title: 'Cà phê thú cưng',
                level: 2,
            },
            {
                title: 'Cà phê sân vườn',
                level: 2,
            },
        ]
    },
    {
        title: 'Giá',
        level: 1,
        item: [
            {
                title: 'Giá rẻ',
                level: 2,
            },
            {
                title: 'Hạng trung',
                level: 2,
            },
            {
                title: 'Sang trọng',
                level: 2,
            },
        ]
    },
    {
        title: 'Phù hợp với',
        level: 1,
        item: [
            {
                title: 'Gia đình',
                level: 2,
            },
            {
                title: 'Hẹn hò',
                level: 2,
            },
            {
                title: 'Cá nhân',
                level: 2,
            },
            {
                title: 'Hội nhóm',
                level: 2,
            },
            {
                title: 'Công ty',
                level: 2,
            },
        ]
    },
    {
        title: 'Tiện ích',
        level: 1,
        item: [
            {
                title: 'Gia đình',
                level: 2,
            },
            {
                title: 'Hẹn hò',
                level: 2,
            },
            {
                title: 'Cá nhân',
                level: 2,
            },
            {
                title: 'Hội nhóm',
                level: 2,
            },
            {
                title: 'Công ty',
                level: 2,
            },
        ]
    },
    {
        title: 'Thanh toán',
        level: 1,
        item: [
            {
                title: 'Tiền mặt',
                level: 2,
            },
            {
                title: 'Chuyển khoản',
                level: 2,
            },
            {
                title: 'Thẻ',
                level: 2,
            },
        ]
    },
]