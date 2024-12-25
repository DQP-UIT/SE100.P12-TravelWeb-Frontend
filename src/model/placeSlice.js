// store/placeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const placeSlice = createSlice({
    name: 'place',
    initialState: {
      selectedPlace: null,
      distance: 5, // Khoảng cách mặc định
    },
    reducers: {
      setPlace: (state, action) => {
        const { place, distance } = action.payload; // Giải cấu trúc payload
        if (place) {
          state.selectedPlace = place; // Cập nhật địa điểm
        }
        if (typeof distance === 'number') {
          state.distance = distance; // Cập nhật khoảng cách
        }
      },
    },
  });
  

export const { setPlace } = placeSlice.actions;
export default placeSlice.reducer;
