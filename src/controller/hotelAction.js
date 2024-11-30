import axios from "axios";
import {
    ALL_HOTEL_FAIL,
    ALL_HOTEL_REQUEST,
    ALL_HOTEL_SUCCESS,
    CLEAR_ERRORS
    } from "../model/constants/hotelConstants"

    import { URL } from "../model/constants/URL";
    export const getHotel =
    () =>
    async (dispatch) => {
      try {
        dispatch({ type: ALL_HOTEL_REQUEST });
  
        let link =`${URL}/api/hotels`;
  
        
  
        const { data } = await axios.get(link);

        
  
        dispatch({
          type:ALL_HOTEL_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_HOTEL_FAIL,
          payload: error.response.data.message,
        });
      }
    };

    export const clearErrors = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
      };