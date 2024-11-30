
import {
    ALL_HOTEL_TYPE_SUCCESS,
     ALL_HOTEL_TYPE_FAIL,
     ALL_HOTEL_TYPE_REQUEST,
      CLEAR_ERRORS
      } from "../model/constants/hotelTypeConstants"
    
    
    export const hotelTypeReducer = (state = { hotelTypes: [] }, action) => {
        switch (action.type) {
          case ALL_HOTEL_TYPE_REQUEST:
            return {
              loading: true,
              hotelTypes: [],
            };
          case ALL_HOTEL_TYPE_SUCCESS:
            return {
              loading: false,
              hotelTypes: action.payload,
              
            };
      
         
          case ALL_HOTEL_TYPE_FAIL:
          
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
      