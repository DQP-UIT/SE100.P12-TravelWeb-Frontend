import axios from "axios";
import {
  ALL_HOTEL_TYPE_SUCCESS,
   ALL_HOTEL_TYPE_FAIL,
   ALL_HOTEL_TYPE_REQUEST,
    CLEAR_ERRORS
    } from "../model/constants/hotelTypeConstants"
import { URL } from "../model/constants/URL";

    export const getHotelType =
    () =>
    async (dispatch) => {
      try {
        dispatch({ type: ALL_HOTEL_TYPE_REQUEST });
  
        let link = `${URL}/api/hotelType`;
  
        
  
        const { data } = await axios.get(link);

        
  
        dispatch({
          type:ALL_HOTEL_TYPE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_HOTEL_TYPE_FAIL,
          payload: error.response.data.message,
        });
      }
    };

    export const clearErrors = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
      };