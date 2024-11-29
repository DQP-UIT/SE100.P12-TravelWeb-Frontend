import { DatePicker, TimePicker } from 'antd'
import { useState } from 'react'
import dayjs from 'dayjs'

const {RangePicker} = DatePicker

// eslint-disable-next-line react/prop-types
const SearchDate = ({searchType}) => {
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();
  const dateFormat = 'DD/MM/YYYY';

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([]);
    } else {
      setHackValue(undefined);
    }
  };

  if (searchType == 'hotel') 
    return (
      <div className='bg-white rounded-md border gap-1'>
        <RangePicker
          minDate={dayjs()}
          value={hackValue || value}
          onChange={(val) => setValue(val)}
          onOpenChange={onOpenChange}
          format={dateFormat}
          className='h-12'
        />
      </div>
    )
  if (searchType == 'restaurant') 
    return (
      <div className='bg-white rounded-md border flex'>
        <DatePicker
          minDate={dayjs()}
          value={hackValue || value}
          onChange={(val) => setValue(val)}
          onOpenChange={onOpenChange}
          format={dateFormat}
          className='h-12'
        />
        <TimePicker/>
      </div>
    )
}

export default SearchDate