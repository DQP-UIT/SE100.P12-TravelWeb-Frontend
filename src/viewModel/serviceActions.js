import axios from "axios";
import {
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  CLEAR_ERRORS,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAIL,
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


export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
