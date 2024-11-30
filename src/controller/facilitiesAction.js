
import axios from "axios";
import {
    ALL_FACILITIES_FAIL,
    ALL_FACILITIES_REQUEST,
    ALL_FACILITIES_SUCCESS,
    CLEAR_ERRORS
    } from "../model/constants/facilitiesConstants"
import { URL } from "../model/constants/URL";

    export const getFacilitiesByType =
    (type) =>
    async (dispatch) => {
      try {
        dispatch({ type: ALL_FACILITIES_REQUEST });
  
        let link = `${URL}/api/facility/service-type/${type}`;
  
        
  
        const { data } = await axios.get(link);
  
        dispatch({
          type:ALL_FACILITIES_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_FACILITIES_FAIL,
          payload: error.response.data.message,
        });
      }
    };

    export const clearErrors = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
      };