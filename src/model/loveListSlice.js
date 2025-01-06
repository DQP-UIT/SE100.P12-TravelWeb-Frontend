import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../model/constants/URL";

// Async action: Cập nhật loveList của một user
export const updateLoveList = createAsyncThunk(
  "loveList/updateLoveList",
  async ({ userID, loveList }, thunkAPI) => {
    try {
      const response = await axios.put(`${URL}/api/users/userID/${userID}/loveList`, { loveList });
      return response.data; // Kết quả từ API
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async action: Lấy toàn bộ loveList của một user
export const fetchLoveList = createAsyncThunk(
  "loveList/fetchLoveList",
  async (userID, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/users/userID/${userID}/loveList`);
      return response.data; // Kết quả từ API
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice quản lý loveList
const loveListSlice = createSlice({
  name: "loveList",
  initialState: {
    loveList: [], // Danh sách dịch vụ yêu thích
    status: "idle", // loading status: idle | loading | succeeded | failed
    error: null, // Lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý cập nhật loveList
      .addCase(updateLoveList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateLoveList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loveList = action.payload.loveList; // Cập nhật loveList
        state.error = null;
      })
      .addCase(updateLoveList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Xử lý lấy toàn bộ loveList
      .addCase(fetchLoveList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLoveList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loveList = action.payload; // Gán loveList nhận được từ API
        state.error = null;
      })
      .addCase(fetchLoveList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default loveListSlice.reducer;
 