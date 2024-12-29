import {
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAIL,
    CLEAR_ERRORS,
  } from "./constants/userConstants";
  
  export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case USER_SUCCESS:
        return {
          loading: false,
          user: action.payload,
        };
  
      case USER_FAIL:
        return {
          ...state,
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
  