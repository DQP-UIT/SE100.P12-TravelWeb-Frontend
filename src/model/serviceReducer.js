// reducers/serviceReducer.js
import {
    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,
    CLEAR_ERRORS,
  } from "../model/constants/serviceConstants";
  
  export const serviceReducer = (state = { service: {} }, action) => {
    switch (action.type) {
      case UPDATE_SERVICE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_SERVICE_SUCCESS:
        return {
          loading: false,
          service: action.payload,
        };
      case UPDATE_SERVICE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  