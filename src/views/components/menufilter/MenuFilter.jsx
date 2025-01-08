import React, { useEffect, useState } from 'react';
import { Slider, Checkbox, Card, Typography, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getHotelType } from '../../../viewModel/hotelTypeAction';
import { getFacilityTypeByType } from '../../../viewModel/FacilityTypeAction';
import { getFacilitiesByType } from '../../../viewModel/facilitiesAction';
import { getSuitabilities } from '../../../viewModel/suitabilitiesAction';
import { FaStar, FaTimes } from 'react-icons/fa';
import { updateFilter } from '../../../model/filterSlice';
import { fetchCoffeeTypes, fetchRestaurantFilterData } from '../../../model/restaurantSlice';

const { Title } = Typography;



const MenuFilter = ({ searchType }) => {
    const dispatch = useDispatch();
    const selectedServiceType = useSelector((state) => state.serviceType.selectedServiceType);
    const [inputValue, setInputValue] = useState([0, 100000000]);
    const [searchQueries, setSearchQueries] = useState({});
    const { hotelTypes, error } = useSelector((state) => state.hotelType);
    const facilityTypes = useSelector((state) => state.facilitiesType);
    const facilities = useSelector((state) => state.facilities);
    const suitabilities = useSelector((state) => state.suitabilities);
    const { filters } = useSelector((state) => state.filters);

const { coffeeTypes, } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(fetchCoffeeTypes()); // Gọi API lấy coffee types
  }, [dispatch]);




    const { cuisines, dishes, restaurants, status} = useSelector(
        (state) => state.restaurant
      );
    
      useEffect(() => {
        dispatch(fetchRestaurantFilterData());
      }, [dispatch]);


    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getHotelType());
        if(selectedServiceType === 'hotel'){
            dispatch(getFacilityTypeByType('hotel'));
        }
        else if(selectedServiceType === 'restaurant'){
            dispatch(getFacilityTypeByType('restaurant'));
        }
        else if (selectedServiceType === 'cafe'){
            dispatch(getFacilityTypeByType('cafe'));
        }
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

    const filterRes = [
        {
            title: 'Loại giá: ',
            aName: 'priceCategories',
            item: [
                { title: 'Giá rẻ', id: '674984adf66ab12aab93f6f8' },
                { title: 'Trung bình', id: '674984adf66ab12aab93f6f9' },
                { title: 'Sang trọng', id: '674984adf66ab12aab93f6fa' },
            ],
        },
        {
            title: 'Phù hợp với: ',
            aName: 'suitabilities',
            item: suitabilities.datas?.map(({ name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        {
            title: 'Loại nhà hàng: ',
            aName: 'restaurantsrestaurants',
            item: restaurants?.map(({  type, _id }) => ({
                title: type,
                id: _id,
            })),
        },
        {
            title: 'Kiểu món ăn: ',
            aName: 'cuisines',
            item: cuisines?.map(({  type, _id }) => ({
                title: type,
                id: _id,
            })),
        },
        {
            title: 'Món ăn: ',
            aName: 'dishes',
            item: dishes?.map(({  name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        
        {
            title: 'Tiện nghi của nhà hàng: ',
            aName: 'facilityTypes',
            item: facilityTypes.facilitiesType?.map(({ name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        
    ];

    const filterCoffee = [
        {
            title: 'Loại giá: ',
            aName: 'priceCategories',
            item: [
                { title: 'Giá rẻ', id: '674984adf66ab12aab93f6f8' },
                { title: 'Trung bình', id: '674984adf66ab12aab93f6f9' },
                { title: 'Sang trọng', id: '674984adf66ab12aab93f6fa' },
            ],
        },
        {
            title: 'Phù hợp với: ',
            aName: 'suitabilities',
            item: suitabilities.datas?.map(({ name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        {
            title: 'Loại quán cà phê: ',
            aName: 'coffeeTypes',
            item: coffeeTypes?.map(({  name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        {
            title: 'Tiện nghi của quán cafe: ',
            aName: 'facilityTypes',
            item: facilityTypes.facilitiesType?.map(({ name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        
    ];



    const filterHotel1 = [
        {
            title: 'Loại giá: ',
            aName: 'priceCategories',
            item: [
                { title: 'Giá rẻ', id: '674984adf66ab12aab93f6f8' },
                { title: 'Trung bình', id: '674984adf66ab12aab93f6f9' },
                { title: 'Sang trọng', id: '674984adf66ab12aab93f6fa' },
            ],
        },
        {
            title: 'Phù hợp với: ',
            aName: 'suitabilities',
            item: suitabilities.datas?.map(({ name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        {
            title: 'Loại chỗ ở: ',
            aName: 'hotelTypes',
            item: hotelTypes?.map(({ type, _id }) => ({
                title: type,
                id: _id,
            })),
        },
        {
            title: 'Tiện nghi của khách sạn: ',
            aName: 'facilityTypes',
            item: facilityTypes.facilitiesType?.map(({ name, _id }) => ({
                title: name,
                id: _id,
            })),
        },
        {
            title: 'Tiện ích phòng: ',
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
        dispatch(updateFilter({ filterKey, value }));
    };

    const handleSearchChange = (e, filterKey) => {
        const newSearchQueries = { ...searchQueries, [filterKey]: e.target.value };
        setSearchQueries(newSearchQueries);
        dispatch(updateFilter({ filterKey, value: e.target.value }));
    };

    const removeFilter = (filterKey, value) => {
        dispatch(updateFilter({ filterKey, value: null }));  // Remove filter value
    };

console.log("filter",filters)
let filterHotel = []
    if(selectedServiceType === "hotel"){
        filterHotel = filterHotel1
        
    }
    else if(selectedServiceType === "restaurant"){
        filterHotel = filterRes
    }
    else if(selectedServiceType === "cafe"){
        filterHotel =  filterCoffee
    }
    return (
        <div className="w-[300px] px-4 gap-3">
            {/* Display selected filters */}
            <div className="mb-4">
                {Object.keys(filters).map((filterKey) => {
                    return filters[filterKey]?.map((selectedValue) => {
                    
                        const itemWithAName = filterHotel
  .flatMap((filter) => filter.item.map((i) => ({ ...i, aName: filter.aName }))) // Add aName to each item
  .find((i) => i.id === selectedValue);

                            
                        return (
                            itemWithAName && (
                                <span
                                    key={selectedValue}
                                    className="inline-flex items-center mr-2 bg-gray-200 text-sm px-2 py-1 rounded-md"
                                >
                                    {itemWithAName.title}
                                    <FaTimes
                                        className="ml-2 cursor-pointer"
                                        onClick={() => handleCheckboxChange(itemWithAName.aName ,itemWithAName.id)}
                                    />
                                </span>
                            )
                        );
                    });
                })}
            </div>

            {searchType === 'hotel' && (
                <Card title="Giá mỗi đêm" style={{ marginBottom: 16 }}>
                    <Slider
                        range
                        defaultValue={[0, 100000000]}
                        min={0}
                        max={100000000}
                        tooltip={{ formatter }}
                        onChange={onChange}
                    />
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <Typography.Text strong>Tối thiểu</Typography.Text>
                            <input
                                type="text"
                                className="border w-full border-gray-300 text-right px-2 py-1"
                                value={formatter(inputValue[0])}
                                readOnly
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <hr className="border-gray-300 w-12" />
                        </div>
                        <div>
                            <Typography.Text>Tối đa</Typography.Text>
                            <input
                                type="text"
                                className="border w-full border-gray-300 text-right px-2 py-1"
                                value={formatter(inputValue[1])}
                                readOnly
                            />
                        </div>
                    </div>
                </Card>
            )}

            {filterHotel.map((col) => (
                <Card key={col.title} title={col.title} style={{ marginBottom: 16 }}>
                    <div>
                        {/* Add search input for groups with many checkboxes */}
                        {col.item.length > 10 && (
                            <Input
                                placeholder="Tìm kiếm"
                                value={searchQueries[col.aName] || ''}
                                onChange={(e) => handleSearchChange(e, col.aName)}
                                style={{ marginBottom: 10 }}
                            />
                        )}

                        <div
                            style={{
                                maxHeight: col.item.length > 10 ? '200px' : 'auto',
                                overflowY: col.item.length > 10 ? 'auto' : 'visible',
                                display: 'block',
                            }}
                        >
                            {col.item
                                .filter((item) =>
                                    item.title
                                        && item.title.toLowerCase().includes((searchQueries[col.aName] || '').toLowerCase())
                                )
                                .map((item) => (
                                    <Checkbox
                                        key={item.id}
                                        checked={filters[col.aName]?.includes(item.id) || false}
                                        onChange={() => handleCheckboxChange(col.aName, item.id)}
                                        style={{ margin: '3px' }}
                                    >
                                        {item.title}
                                    </Checkbox>
                                ))}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default MenuFilter;
