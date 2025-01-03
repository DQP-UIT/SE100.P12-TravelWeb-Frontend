// src/reducers/roomReducer.js
import {
    ROOM_REQUEST,
    ROOM_SUCCESS,
    ROOM_FAIL,
    CLEAR_ROOM_ERRORS,
  } from "../model/constants/roomConstants";
  
  export const roomReducer = (state = { room: {} }, action) => {
    switch (action.type) {
      case ROOM_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ROOM_SUCCESS:
        return {
          loading: false,
          room: action.payload,
        };
  
      case ROOM_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ROOM_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  