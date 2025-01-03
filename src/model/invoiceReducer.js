// reducers/invoiceReducer.js
import { INVOICE_REQUEST, INVOICE_SUCCESS, INVOICE_FAIL, CLEAR_INVOICE_ERRORS } from "../model/constants/invoiceConstants";

export const invoiceReducer = (state = { invoice: {} }, action) => {
  switch (action.type) {
    case INVOICE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case INVOICE_SUCCESS:
      return {
        loading: false,
        invoice: action.payload,
      };

    case INVOICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_INVOICE_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
