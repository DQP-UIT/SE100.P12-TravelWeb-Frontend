import axios from "axios";
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  CLEAR_ERRORS,
} from "../model/constants/userConstants";
import { URL } from "../model/constants/URL";

export const getUserByUserID = (userID) => async (dispatch) => {
  try {
    console.log("HELLO");
    dispatch({ type: USER_REQUEST });

    const { data } = await axios.get(`${URL}/api/users/userID/${userID}`);

    dispatch({
      type: USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.response?.data?.message || "Server Error",
    });
  }
};

// Hàm cập nhật user
export const updateUserById = (userID, userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`${URL}/api/users/${userID}`, userData, config);

    dispatch({
      type: USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.response?.data?.message || "Server Error",
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Gọi API lấy tất cả user
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST });

    const { data } = await axios.get(`${URL}/api/users`);
    console.log(data)
    dispatch({
      type: USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.response?.data?.message || "Server Error",
    });
  }
};
