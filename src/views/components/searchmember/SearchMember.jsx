import React, { useState, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setNumRoom, setNumAldult, setNumChildren } from '../../../model/memberValueSlice';

const SearchMember = () => {
  const dispatch = useDispatch();
  
  // Lấy giá trị từ Redux store
  const { numRoom, numAldult, numChildren } = useSelector(state => state.memberValue);

  const memberNav = [
    { title: 'Phòng', note: '', key: 'numRoom', value: numRoom },
    { title: 'Người lớn', note: '18 tuổi trở lên', key: 'numAldult', value: numAldult },
    { title: 'Trẻ con', note: '0 - 17 tuổi', key: 'numChildren', value: numChildren },
  ];

  const [active, setActive] = useState(false);

  const onClick = () => {
    setActive(!active);
  };

  const onChangeValue = (e, key) => {
    const value = parseInt(e.target.value, 10) || 0;
    // Cập nhật giá trị qua Redux actions
    if (key === 'numRoom') {
      dispatch(setNumRoom(value));
    } else if (key === 'numAldult') {
      dispatch(setNumAldult(value));
    } else if (key === 'numChildren') {
      dispatch(setNumChildren(value));
    }
  };

  const showValue = () => {
    if (numChildren !== 0) {
      return (
        <div className="text-left w-full">
          <p>{numAldult} người lớn, {numChildren} trẻ con</p>
          <p>{numRoom} phòng</p>
        </div>
      );
    } else {
      return (
        <div className="text-left w-full">
          <p>{numAldult} người lớn</p>
          <p>{numRoom} phòng</p>
        </div>
      );
    }
  };
  console.log(numRoom, numAldult, numChildren)

  return (
    <div className="relative">
      <button
        className="w-full flex bg-white rounded-md border gap-2 items-center px-2"
        onClick={onClick}
      >
        <MdPeople size={30} />
        {showValue()}
        <FaAngleDown />
      </button>
      {active && (
        <div
          className="bg-white border rounded-md absolute top-full mt-2 left-0 z-50 shadow-lg w-full min-w-[250px] max-w-[400px] p-4"
        >
          {memberNav.map(item => (
            <div key={item.key} className="grid grid-cols-2 gap-4 items-center mb-2">
              <label className="text-sm font-medium">{item.title}</label>
              <input
                type="number"
                min={0}
                value={item.value}
                onChange={e => onChangeValue(e, item.key)}
                className="border rounded-md px-2 w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMember;
