import { createSlice } from '@reduxjs/toolkit';

const serviceTypeSlice = createSlice({
  name: 'serviceType',
  initialState: {
    selectedServiceType: 'hotel', // Mặc định là 'hotel'
  },
  reducers: {
    setServiceType: (state, action) => {
      state.selectedServiceType = action.payload; // Lưu loại dịch vụ được chọn
    },
    resetServiceType: (state) => {
      state.selectedServiceType = 'hotel'; // Đặt lại giá trị mặc định
    },
  },
});

export const { setServiceType, resetServiceType } = serviceTypeSlice.actions;
export default serviceTypeSlice.reducer;
