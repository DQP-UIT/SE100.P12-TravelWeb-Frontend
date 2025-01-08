import axios from "axios";
import {
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  CLEAR_ERRORS,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAIL,
  GET_HOTEL_ID_REQUEST,
  GET_HOTEL_ID_SUCCESS,
  GET_HOTEL_ID_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
  GET_SERVICE_DETAILS_REQUEST,
  GET_SERVICE_DETAILS_SUCCESS,
  GET_SERVICE_DETAILS_FAIL,
} from "../model/constants/serviceConstants";
import { URL } from "../model/constants/URL";

export const updateService = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SERVICE_REQUEST });

    // Cấu hình headers, sử dụng application/json vì bạn không gửi file
    const config = {
      headers: {
        "Content-Type": "application/json", // Dùng JSON khi không gửi file
      },
    };

    // Gửi yêu cầu POST với formData dưới dạng JSON
    const { data } = await axios.post(`${URL}/api/services/${id}`, formData, config);

    dispatch({
      type: UPDATE_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SERVICE_FAIL,
      payload: error.response?.data?.message || "Server error",
    });
  }
};

export const getAllRestaurants = () => async (dispatch) => {
  try {
    console.log("HEEEEELO")
    // Dispatch request action directly without constants
    dispatch({ type: 'GET_RESTAURANTS_REQUEST' });

    // Make the API call to fetch all restaurants
    const { data } = await axios.get(`${URL}/api/services/restau/all`);

    // Dispatch success action with the response data
    dispatch({
      type: 'GET_RESTAURANTS_SUCCESS',
      payload: data, // Send the fetched restaurant data
    });
  } catch (error) {
    // Dispatch failure action with the error message
    dispatch({
      type: 'GET_RESTAURANTS_FAIL',
      payload: error.response?.data?.message || "Server error",
    });
  }
};

export const getServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SERVICE_DETAILS_REQUEST });

    // Send GET request to fetch service details
    const { data } = await axios.get(`${URL}/api/services/${id}/details`);

    dispatch({
      type: GET_SERVICE_DETAILS_SUCCESS,
      payload: data, // Full service details and combined data
    });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_DETAILS_FAIL,
      payload: error.response?.data?.message || "Server error",
    });
  }
};

export const createService = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SERVICE_REQUEST });

    // Cấu hình headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Gửi yêu cầu POST để tạo service
    const { data } = await axios.post(`${URL}/api/services`, formData, config);

    dispatch({
      type: CREATE_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SERVICE_FAIL,
      payload: error.response?.data?.message || "Server error",
    });
  }
};


export const getHotelId = (serviceID) => async (dispatch) => {
  try {
    dispatch({ type: GET_HOTEL_ID_REQUEST });

    // Gửi yêu cầu GET để lấy hotelID
    const { data } = await axios.get(`${URL}/api/services/${serviceID}/hotel`);

    dispatch({
      type: GET_HOTEL_ID_SUCCESS,
      payload: data.hotelID, // Gửi hotelID vào payload
    });
  } catch (error) {
    dispatch({
      type: GET_HOTEL_ID_FAIL,
      payload: error.response?.data?.message || "Server error",
    });
  }
};

export const addReview = (serviceId, reviewData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_REVIEW_REQUEST });

    // Cấu hình headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Gửi yêu cầu POST để thêm review
    const { data } = await axios.post(`${URL}/api/services/services/${serviceId}/reviews`, reviewData, config);

    dispatch({
      type: ADD_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_REVIEW_FAIL,
      payload: error.response?.data?.message || "Server error",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
