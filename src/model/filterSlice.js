// filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: {}, // Lưu trữ các bộ lọc dạng key-value
  },
  reducers: {
    updateFilter: (state, action) => {
      const { filterKey, value } = action.payload;
      if (!state.filters[filterKey]) {
        state.filters[filterKey] = [];
      }
      if (state.filters[filterKey].includes(value)) {
        // Nếu đã chọn thì bỏ chọn
        state.filters[filterKey] = state.filters[filterKey].filter((item) => item !== value);
      } else {
        // Thêm vào bộ lọc
        state.filters[filterKey].push(value);
      }
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
