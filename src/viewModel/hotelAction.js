import axios from "axios";
import {
    ALL_HOTEL_FAIL,
    ALL_HOTEL_REQUEST,
    ALL_HOTEL_SUCCESS,
    FILTER_HOTEL_FAIL,
    FILTER_HOTEL_REQUEST,
    FILTER_HOTEL_SUCCESS,
    CLEAR_ERRORS,
    SET_SELECTED_HOTEL_ID,
    HOTEL_DETAILS_REQUEST,
    HOTEL_DETAILS_SUCCESS,
    HOTEL_DETAILS_FAIL,
} from "../model/constants/hotelConstants";

import { URL } from "../model/constants/URL";

// Lấy tất cả khách sạn
export const getHotel = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_HOTEL_REQUEST });

        let link = `${URL}/api/hotels`;

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_HOTEL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_HOTEL_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Lọc khách sạn dựa trên tiêu chí
export const filterHotel = (filters) => async (dispatch) => {
    try {
        dispatch({ type: FILTER_HOTEL_REQUEST });

        const { data } = await axios.post(`${URL}/api/hotels/filter`, filters);

        dispatch({
            type: FILTER_HOTEL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FILTER_HOTEL_FAIL,
            payload: error.response?.data?.message || "Something went wrong",
        });
    }
};

// Xóa lỗi
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};


export const getHotelDetails = (id) => async (dispatch) => {
  try {
    
    dispatch({ type: HOTEL_DETAILS_REQUEST });

    const { data } = await axios.get(`${URL}/api/hotels/details/${id}`);
    
    dispatch({
      type: HOTEL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOTEL_DETAILS_FAIL,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};


export const setSelectedHotelId = (id) => async (dispatch) => {
  dispatch({
      type: SET_SELECTED_HOTEL_ID,
      payload: id,
  });
};