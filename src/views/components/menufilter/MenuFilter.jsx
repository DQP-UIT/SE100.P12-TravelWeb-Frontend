import React, { useState } from 'react'
import { filterCafe, filterHotel, filterRestaurant } from './ColumnMenu'
import { Slider } from 'antd';

const menuType = [
    {
        type: 'hotel',
        content: filterHotel,
    },
    {
        type: 'restaurant',
        content: filterRestaurant,
    },
    {
        type: 'cafe',
        content: filterCafe,
    },
]

const MenuFilter = ({searchType}) => {
  searchType = searchType?searchType:'hotel';  
  const menu = menuType.filter(item => item.type === searchType);

  const currency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  const formatter = (value) => `${currency.format(value)}`;
  
  const[inputValue, setInputValue] = useState([0, 100000000])
  const onChange = (newValue) => {
    setInputValue(newValue)
  }

  return (
    <div className='w-[300px] px-4 gap-3'>
        <div>
            <img src='/src/assets/Map.png' className='py-2'/>
        </div>
        {searchType == 'hotel' && (
            <div>
                <p className='font-bold p-1'>Giá mỗi đêm</p>
                <Slider 
                    range 
                    defaultValue={[0,100000000]}
                    min={0}
                    max={100000000}
                    tooltip={{formatter}}
                    onChange={onChange}
                />
                <div className='grid grid-cols-3'>
                    <div>
                        <p className='font-medium'>Tối thiểu</p>
                        <input type='currency' className='border w-28 border-black text-right px-1' value={currency.format(inputValue[0])}/>
                    </div>
                    <div className='relative top-2/3 -z-10'>
                        <hr className='border-black relative'/>
                    </div>
                    <div>
                        <p>Tối đa</p>
                        <input type='currency' className='border w-28 border-black text-right px-1' value={currency.format(inputValue[1])}/>
                    </div>
                </div>
            </div>
        )}
        
        {menu[0].content.map(col => {
            return (
                <div key={col.level} className='p-1'>
                    {col.title}
                    {col.level == 1 && col.item.map(item => {
                        return item != null && (
                            <div className='text-sm p-1 flex'>
                                <input type='checkbox' className='mr-2'/>
                                {item.title}
                            </div>
                        )
                    })}
                    <hr className='border-black my-1'/>
                </div>
            )
        })}
    </div>
  )
}

export default MenuFilter