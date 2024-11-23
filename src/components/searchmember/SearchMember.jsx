import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { MdPeople } from 'react-icons/md'

const SearchMember = () => {
  const [value, setValue] = useState({
    numRoom: 1,
    numAldult: 1,
    numChildren: 0,
  })

  const memberNav = [
    {
      title: 'Phòng',
      note: '',
      value: value.numRoom,
    },
    {
      title: 'Người lớn',
      note: '18 tuổi trở lên',
      value: value.numAldult,
    },
    {
      title: 'Trẻ con',
      note: '0 - 17 tuổi',
      value: value.numChildren,
    },
  ]

  const [active, setActive] = useState([false])
  const onClick = () => {
    setActive(false)
  }
  const onBlur = () => {
    setActive(true)
  }

  const onChangeValue = (e) => {

  }

  const showValue = () => {
    if (value.numChildren != 0){
      return (
        <div className='text-left w-full'>
          <p>{value.numAldult} người lớn, {value.numChildren} trẻ con</p>
          <p> {value.numRoom} phòng</p>
        </div>
      )
    }
    else return (
      <div className='text-left w-full'>
        <p>{value.numAldult} người lớn</p>
        <p> {value.numRoom} phòng</p>
      </div>
    )
  }

  return (
    <div>
      <button className='w-full flex bg-white rounded-md border gap-2 items-center px-2' onClick={onClick}>
        <MdPeople size={30}/>
        {showValue()}
        <FaAngleDown/>
      </button>
      {
        !active && (
          <div className='bg-white w-1/4 border rounded-md absolute' onClick={onClick} onBlur={onBlur}>
            {memberNav.map(item => (
              <div key={''} className='grid grid-cols-2'>
                <label key={item.title}>
                  {item.title}
                </label>
                <input type='number' min={0} value={item.value} onChange={e => onChangeValue(e)}></input>
              </div>
            ))}
          </div>
        )
      }
    </div>
    
  )
}

export default SearchMember