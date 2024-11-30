import {
    ALL_SUB_SUCCESS,
    ALL_SUB_FAIL,
    ALL_SUB_REQUEST,
    CLEAR_ERRORS
    } from "../model/constants/suitabilitiesConstants"

    
    
    export const suitabilitiesReducer = (state = { datas: [] }, action) => {
        switch (action.type) {
          case ALL_SUB_REQUEST:
            return {
              loading: true,
              datas: [],
            };
          case ALL_SUB_SUCCESS:
            return {
              loading: false,
              datas: action.payload,
              
            };
      
         
          case ALL_SUB_FAIL:
          
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
      