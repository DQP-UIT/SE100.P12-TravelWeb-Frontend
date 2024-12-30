import axios from "axios";
import {
  ROOM_REQUEST,
  ROOM_SUCCESS,
  ROOM_FAIL,
  CLEAR_ROOM_ERRORS,
} from "../model/constants/roomConstants";
import { URL } from "../model/constants/URL";

export const getRoomById = (roomID) => async (dispatch) => {
  try {
    dispatch({ type: ROOM_REQUEST });

    const { data } = await axios.get(`${URL}/api/rooms/${roomID}`);

    dispatch({
      type: ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_FAIL,
      payload: error.response?.data?.message || "Server Error",
    });
  }
};

// Update room availability
export const updateRoomAvailable = (roomID, updateData) => async (dispatch) => {
  try {
    dispatch({ type: ROOM_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`${URL}/api/rooms/${roomID}`, updateData, config);

    dispatch({
      type: ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_FAIL,
      payload: error.response?.data?.message || "Server Error",
    });
  }
};


// Update room information
export const updateRoomInfo = (roomID, updateData) => async (dispatch) => {
  try {
    dispatch({ type: ROOM_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`${URL}/api/rooms/${roomID}`, updateData, config);

    dispatch({
      type: ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_FAIL,
      payload: error.response?.data?.message || "Server Error",
    });
  }
};

// Clear errors
export const clearRoomErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ROOM_ERRORS });
};

export const createRoom = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: ROOM_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${URL}/api/rooms`, roomData, config);

    dispatch({
      type: ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_FAIL,
      payload: error.response?.data?.message || "Server Error",
    });
  }
};

