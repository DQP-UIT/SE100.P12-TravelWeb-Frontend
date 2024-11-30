import React, { useEffect, useState } from 'react'

import { Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getHotelType } from '../../../controller/hotelTypeAction';
import { getFacilityTypeByType } from '../../../controller/FacilityTypeAction';
import { getFacilitiesByType } from '../../../controller/facilitiesAction';
import { getSuitabilities } from '../../../controller/suitabilitiesAction';
import { FaStar } from 'react-icons/fa';









const MenuFilter = ({searchType}) => {

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

    const filterHotel = [];
    const filterRestaurant=[ ];
    const filterCafe=[ ];

    function addSectionFromData(title, data) {
        const newSection = {
            title: title,
            level: 1,
            item: data.map(({ type }) => ({
                title: type,
                level: 2,
            })),
        };
        filterHotel.push(newSection);
    }
    
    function addSectionFromData2(title, data) {
        const newSection = {
            title: title,
            level: 1,
            item: data.map(({ name }) => ({
                title: name,
                level: 2,
            })),
        };
        filterHotel.push(newSection);
    }
    
    function addFacilitySectionFromData2 (title, data) {
        const newSection = {
            title: title,
            level: 1,
            item: data.map(({ name }) => ({
                title: name,
                level: 2,
            })),
        };
        filterHotel.push(newSection);
    }
    const dispatch = useDispatch();
        
    
    
      const {
        hotelTypes,
        loading,
        error,
       
      } = useSelector((state) => state.hotelType);
    
      
      const facilityTypes = useSelector((state) => state.facilitiesType);
      const facilitis = useSelector((state) => state.facilities);
      const suitabilities = useSelector((state) => state.suitabilities);

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(getHotelType());
      }, [dispatch, error]);
        
     useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(getFacilityTypeByType("hotel"));
      }, [dispatch, error]);
      
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(getFacilitiesByType("Room"));
      }, [dispatch, error]);


      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(getSuitabilities());
      }, [dispatch, error]);
    


      filterHotel.push({
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
    })
      filterHotel.push({title:"Loại giá: ", level: 1,  item: [
        { title: "Giá rẻ", level: 2 },
        { title: "Trung bình", level: 2 },
        { title: "Sang trọng", level: 2 }],})
    
        addSectionFromData2("Phù hợp với: ", suitabilities.datas);




      addSectionFromData("Loại chỗ ở: ", hotelTypes);
      addFacilitySectionFromData2("Tiện nghi của khách sạn: ", facilityTypes.facilitiesType);
      addFacilitySectionFromData2("Tiện ích phòng: ", facilitis.datas);
    
    
    
    
    
    
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
    {console.log(suitabilities)}
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