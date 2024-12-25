import { createSlice } from '@reduxjs/toolkit';

const memberValueSlice = createSlice({
  name: 'memberValue',
  initialState: {
    numRoom: 1,      // Mặc định 1 phòng
    numAldult: 1,    // Mặc định 1 người lớn
    numChildren: 0,  // Mặc định 0 trẻ em
  },
  reducers: {
    // Action để cập nhật giá trị numRoom
    setNumRoom: (state, action) => {
      state.numRoom = action.payload;
    },
    // Action để cập nhật giá trị numAldult
    setNumAldult: (state, action) => {
      state.numAldult = action.payload;
    },
    // Action để cập nhật giá trị numChildren
    setNumChildren: (state, action) => {
      state.numChildren = action.payload;
    },
    // Action để thiết lập lại tất cả giá trị về mặc định
    resetMemberValues: (state) => {
      state.numRoom = 1;
      state.numAldult = 1;
      state.numChildren = 0;
    },
  },
});

// Export các action creators để sử dụng trong các component
export const { setNumRoom, setNumAldult, setNumChildren, resetMemberValues } = memberValueSlice.actions;

// Export reducer để thêm vào store
export default memberValueSlice.reducer;
