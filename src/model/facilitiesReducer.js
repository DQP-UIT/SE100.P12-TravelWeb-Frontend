import {
ALL_FACILITIES_FAIL,
ALL_FACILITIES_REQUEST,
ALL_FACILITIES_SUCCESS,
CLEAR_ERRORS
} from "./constants/facilitiesConstants"


export const facilitiesReducer = (state = { datas: [] }, action) => {
    switch (action.type) {
      case ALL_FACILITIES_REQUEST:
        return {
          loading: true,
          datas: [],
        };
      case ALL_FACILITIES_SUCCESS:
        return {
          loading: false,
          datas: action.payload,
          
        };
  
     
      case ALL_FACILITIES_FAIL:
      
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
  