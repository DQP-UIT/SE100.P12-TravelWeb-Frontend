import axios from "axios";
import {
    ALL_FACILITIES_TYPE_FAIL,
    ALL_FACILITIES_TYPE_REQUEST,
    ALL_FACILITIES_TYPE_SUCCESS,
    CLEAR_ERRORS
    } from "../model/constants/FacilityTypeConstants"
import { URL } from "../model/constants/URL";

    export const getFacilityTypeByType =
    (type) =>
    async (dispatch) => {
      try {
        dispatch({ type: ALL_FACILITIES_TYPE_REQUEST });
  
        let link = `${URL}/api/facility-types/service-type/${type}`;
  
        
  
        const { data } = await axios.get(link);
  
        dispatch({
          type:ALL_FACILITIES_TYPE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_FACILITIES_TYPE_FAIL,
          payload: error.response.data.message,
        });
      }
    };

    export const clearErrors = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
      };