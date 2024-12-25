import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getHotelType } from '../../../viewModel/hotelTypeAction';
import { getFacilityTypeByType } from '../../../viewModel/FacilityTypeAction';
import { getFacilitiesByType } from '../../../viewModel/facilitiesAction';
import { getSuitabilities } from '../../../viewModel/suitabilitiesAction';
import { FaStar } from 'react-icons/fa';
import { updateFilter } from '../../../model/filterSlice';

const MenuFilter = ({ searchType }) => {
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState([0, 100000000]);
    const { hotelTypes, error } = useSelector((state) => state.hotelType);
    const facilityTypes = useSelector((state) => state.facilitiesType);
    const facilities = useSelector((state) => state.facilities);
    const suitabilities = useSelector((state) => state.suitabilities);
    const { filters } = useSelector((state) => state.filters); // Lấy bộ lọc từ Redux

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getHotelType());
        dispatch(getFacilityTypeByType('hotel'));
        dispatch(getFacilitiesByType('Room'));
        dispatch(getSuitabilities());
    }, [dispatch, error]);

    const starRate = (index) => (
        <div className="flex">
            {Array.from({ length: index }, (_, i) => (
                <FaStar key={i} className="text-yellow-400" />
            ))}
        </div>
    );

    const filterHotel = [
        {
            title: 'Xếp hạng sao',
            aName: 'starRating',
            item: [
                { title: starRate(5), id: 5 },
                { title: starRate(4), id: 4 },
                { title: starRate(3), id: 3 },
                { title: starRate(2), id: 2 },
                { title: starRate(1), id: 1 },
                { title: 'Không xếp loại', id: 0 },
            ],
        },
        {
            title: 'Loại giá:',
            aName: 'priceCategories',
            item: [
                { title: 'Giá rẻ', id: '674984adf66ab12aab93f6f8' },
                { title: 'Trung bình', id: '674984adf66ab12aab93f6f9' },
                { title: 'Sang trọng', id: '674984adf66ab12aab93f6fa' },
            ],
        },
        {
            title: 'Phù hợp với:',
            aName: 'suitabilities',
            item: suitabilities.datas?.map(({ name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        {
            title: 'Loại chỗ ở:',
            aName: 'hotelTypes',
            item: hotelTypes?.map(({ type, _id }) => ({
                title: type,
                id: _id,
            })),
        },
        {
            title: 'Tiện nghi của khách sạn:',
            aName: 'facilityTypes',
            item: facilityTypes.facilitiesType?.map(({ name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        {
            title: 'Tiện ích phòng:',
            aName: 'facilities',
            item: facilities.datas?.map(({ name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
    ];

    const formatter = (value) => {
        const currency = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return currency.format(value);
    };

    const onChange = (newValue) => {
        setInputValue(newValue);
    };

    const handleCheckboxChange = (filterKey, value) => {
        dispatch(updateFilter({ filterKey, value })); // Cập nhật Redux
    };

    console.log(filters)
    return (
        <div className="w-[300px] px-4 gap-3">
            <div>
                <img src="/src/assets/Map.png" className="py-2" alt="Map" />
            </div>
            {searchType === 'hotel' && (
                <div>
                    <p className="font-bold p-1">Giá mỗi đêm</p>
                    <Slider
                        range
                        defaultValue={[0, 100000000]}
                        min={0}
                        max={100000000}
                        tooltip={{ formatter }}
                        onChange={onChange}
                    />
                    <div className="grid grid-cols-3">
                        <div>
                            <p className="font-medium">Tối thiểu</p>
                            <input
                                type="text"
                                className="border w-28 border-black text-right px-1"
                                value={formatter(inputValue[0])}
                                readOnly
                            />
                        </div>
                        <div className="relative top-2/3 -z-10">
                            <hr className="border-black relative" />
                        </div>
                        <div>
                            <p>Tối đa</p>
                            <input
                                type="text"
                                className="border w-28 border-black text-right px-1"
                                value={formatter(inputValue[1])}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            )}
            {filterHotel.map((col) => (
                <div key={col.title} className="p-1">
                    <p>{col.title}</p>
                    {col.item.map((item) => (
                        <div key={item.id} className="text-sm p-1 flex">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={filters[col.aName]?.includes(item.id) || false}
                                onChange={() => handleCheckboxChange(col.aName, item.id)}
                            />
                            {item.title}
                        </div>
                    ))}
                    <hr className="border-black my-1" />
                </div>
            ))}
        </div>
    );
};

export default MenuFilter;
