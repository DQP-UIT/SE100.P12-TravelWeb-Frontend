
import axios from "axios";
import {
    ALL_SUB_SUCCESS,
    ALL_SUB_FAIL,
    ALL_SUB_REQUEST,
    CLEAR_ERRORS
    } from "../model/constants/suitabilitiesConstants"
import { URL } from "../model/constants/URL";

    export const getSuitabilities =
    () =>
    async (dispatch) => {
      try {
        dispatch({ type: ALL_SUB_REQUEST });
  
        let link = `${URL}/api/suitabilities`;
  
        
  
        const { data } = await axios.get(link);
  
        dispatch({
          type:ALL_SUB_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_SUB_FAIL,
          payload: error.response.data.message,
        });
      }
    };

    export const clearErrors = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
      };