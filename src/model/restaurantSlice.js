// src/redux/restaurantSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../model/constants/URL";

// API call to fetch restaurant filter data
export const fetchRestaurantFilterData = createAsyncThunk(
  "restaurant/fetchRestaurantFilterData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/restaurants-filter/filter`);
      return response.data.data; // { cuisines, dishes, restaurants }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// API call to fetch coffee types
export const fetchCoffeeTypes = createAsyncThunk(
  "restaurant/fetchCoffeeTypes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/restaurants-filter/coffee`); // API route lấy CoffeeType
      return response.data.data; // Array of coffee types
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    cuisines: [], // List of cuisines
    dishes: [], // List of dishes
    restaurants: [], // List of restaurants
    coffeeTypes: [], // List of coffee types (mới thêm)
    status: "idle", // Status (idle | loading | succeeded | failed)
    error: null, // Error message
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the fetchRestaurantFilterData action
      .addCase(fetchRestaurantFilterData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRestaurantFilterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cuisines = action.payload.cuisines;
        state.dishes = action.payload.dishes;
        state.restaurants = action.payload.restaurants;
      })
      .addCase(fetchRestaurantFilterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle the fetchCoffeeTypes action
      .addCase(fetchCoffeeTypes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCoffeeTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coffeeTypes = action.payload; // Cập nhật coffeeTypes vào state
      })
      .addCase(fetchCoffeeTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;
