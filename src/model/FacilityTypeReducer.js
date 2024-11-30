import {
    ALL_FACILITIES_TYPE_FAIL,
    ALL_FACILITIES_TYPE_REQUEST,
    ALL_FACILITIES_TYPE_SUCCESS,
    CLEAR_ERRORS
    } from "../model/constants/FacilityTypeConstants"

    
    
    export const facilitiesTypeReducer = (state = { facilitiesType: [] }, action) => {
        switch (action.type) {
          case ALL_FACILITIES_TYPE_REQUEST:
            return {
              loading: true,
              facilitiesType: [],
            };
          case ALL_FACILITIES_TYPE_SUCCESS:
            return {
              loading: false,
             facilitiesType: action.payload,
              
            };
      
         
          case ALL_FACILITIES_TYPE_FAIL:
          
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
      