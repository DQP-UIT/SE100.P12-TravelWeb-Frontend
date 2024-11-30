
import {
    ALL_HOTEL_FAIL,
    ALL_HOTEL_REQUEST,
    ALL_HOTEL_SUCCESS,
    CLEAR_ERRORS
    } from "./constants/hotelConstants"
    
    
    export const hotelReducer = (state = { datas: [] }, action) => {
        switch (action.type) {
          case ALL_HOTEL_REQUEST:
            return {
              loading: true,
              datas: [],
            };
          case ALL_HOTEL_SUCCESS:
            return {
              loading: false,
              datas: action.payload,
              
            };
      
         
          case ALL_HOTEL_FAIL:
          
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
      