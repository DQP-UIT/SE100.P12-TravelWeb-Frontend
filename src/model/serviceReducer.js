// reducers/serviceReducer.js
import {
    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,
    CLEAR_ERRORS,
    ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
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
        case ADD_REVIEW_REQUEST:
  return {
    ...state,
    loading: true,
  };
case ADD_REVIEW_SUCCESS:
  return {
    ...state,
    loading: false,
    success: true,
    review: action.payload,
  };
case ADD_REVIEW_FAIL:
  return {
    ...state,
    loading: false,
    error: action.payload,
  };

      default:
        return state;
    }
  };
  