import {
  ALL_HOTEL_FAIL,
  ALL_HOTEL_REQUEST,
  ALL_HOTEL_SUCCESS,
  FILTER_HOTEL_FAIL,
  FILTER_HOTEL_REQUEST,
  FILTER_HOTEL_SUCCESS,
  HOTEL_DETAILS_REQUEST,
  HOTEL_DETAILS_SUCCESS,
  HOTEL_DETAILS_FAIL,
  CLEAR_ERRORS,
  SET_SELECTED_HOTEL_ID,
} from "./constants/hotelConstants";

export const hotelReducer = (state = { datas: [], selectedHotelId: null, hotelDetails: {} }, action) => {
  switch (action.type) {
    case ALL_HOTEL_REQUEST:
    case FILTER_HOTEL_REQUEST:
    case HOTEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_HOTEL_SUCCESS:
    case FILTER_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
        datas: action.payload,
      };
    case HOTEL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        hotelDetails: action.payload, // Lưu thông tin chi tiết khách sạn
      };
    case ALL_HOTEL_FAIL:
    case FILTER_HOTEL_FAIL:
    case HOTEL_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SELECTED_HOTEL_ID:
      return {
        ...state,
        selectedHotelId: action.payload,
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
