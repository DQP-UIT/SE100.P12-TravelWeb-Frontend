// dateSlice.js
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateSlice = createSlice({
    name: 'date',
    initialState: {
      selectedDate: [], // Lưu trữ mảng các ngày trong khoảng thời gian
      dateRange: null,    // Khoảng thời gian được chọn (nếu có)
    },
    reducers: {
      setDate: (state, action) => {
        const { date } = action.payload;
        state.selectedDate = [dayjs(date, 'DD/MM/YYYY').format('DD/MM/YYYY')];  // Chỉ có một ngày được chọn
        state.dateRange = null; // Xóa giá trị dateRange nếu chọn ngày đơn lẻ
      },
      setDateRange: (state, action) => {
        const { startDate, endDate } = action.payload;
        const selectedDate = [];
        let currentDate = dayjs(startDate, 'DD/MM/YYYY');
        while (currentDate.isBefore(dayjs(endDate, 'DD/MM/YYYY').add(1, 'day'))) {
          selectedDate.push(currentDate.format('DD/MM/YYYY'));
          currentDate = currentDate.add(1, 'day');
        }
        state.selectedDate = selectedDate; // Lưu mảng các ngày trong khoảng thời gian
        state.dateRange = { 
          startDate: dayjs(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY'), 
          endDate: dayjs(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
        };
      },
      clearDate: (state) => {
        state.selectedDate = [];
        state.dateRange = null;
      },
    },
  });
export const { setDate, setDateRange, clearDate } = dateSlice.actions;
export default dateSlice.reducer;
