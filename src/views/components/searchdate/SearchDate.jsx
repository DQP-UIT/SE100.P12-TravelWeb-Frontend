// SearchDate.js
import { DatePicker, TimePicker } from 'antd';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setDateRange, clearDate } from '../../../model/dateSlice';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const SearchDate = ({ searchType }) => {
  const dateFormat = 'DD/MM/YYYY';
  const dispatch = useDispatch();
  const { selectedDate, dateRange } = useSelector((state) => state.date);

  const [hackValue, setHackValue] = useState(() => {
    if (dateRange) {
      return [dayjs(dateRange.startDate, dateFormat), dayjs(dateRange.endDate, dateFormat)];
    }
    if (selectedDate && selectedDate.length > 0) {
      return dayjs(selectedDate[0], dateFormat); // Hiển thị ngày đầu tiên nếu có
    }
    return null;
  });

  useEffect(() => {
    if (dateRange) {
      setHackValue([dayjs(dateRange.startDate, dateFormat), dayjs(dateRange.endDate, dateFormat)]);
    } else if (selectedDate && selectedDate.length > 0) {
      setHackValue(dayjs(selectedDate[0], dateFormat)); // Hiển thị ngày đầu tiên trong mảng
    }
  }, [dateRange, selectedDate]);

  const onDateChange = (val) => {
    if (val && val.length === 2) {
      const [startDate, endDate] = val;
      dispatch(setDateRange({
        startDate: startDate.format(dateFormat),
        endDate: endDate.format(dateFormat)
      }));
    } else if (val) {
      dispatch(setDate({ date: val.format(dateFormat) }));
    } else {
      dispatch(clearDate());
    }
    setHackValue(val); // Cập nhật giá trị hackValue khi thay đổi
  };

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([]); // Khi mở calendar, reset hackValue
    } else {
      setHackValue(null); // Khi đóng calendar, reset hackValue
    }
  };
console.log(selectedDate)
  if (searchType == 'hotel') {
    return (
      <div className="bg-white rounded-md border gap-1">
        <RangePicker
          value={hackValue || (dateRange
            ? [dayjs(dateRange.startDate, dateFormat), dayjs(dateRange.endDate, dateFormat)]
            : null)}
          onChange={onDateChange}
          onOpenChange={onOpenChange}
          format={dateFormat}
          className="h-12"
        />
      </div>
    );
  }

 

  return null;
};

export default SearchDate;

