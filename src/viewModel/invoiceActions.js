// actions/invoiceActions.js
import axios from "axios";
import { INVOICE_REQUEST, INVOICE_SUCCESS, INVOICE_FAIL, CLEAR_INVOICE_ERRORS } from "../model/constants/invoiceConstants";
import { URL } from "../model/constants/URL";

// Tạo mới invoice
export const createInvoice = (invoiceData) => async (dispatch) => {
  try {
    dispatch({ type: INVOICE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
console.log(invoiceData)
    // Gọi API tạo mới hóa đơn
    const { data } = await axios.post(`${URL}/api/invoices`, invoiceData);

    dispatch({
      type: INVOICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVOICE_FAIL,
      payload: error.response?.data?.message || "Server Error",
    });
  }
};

// Clear errors
export const clearInvoiceErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_INVOICE_ERRORS });
};


// Lấy hóa đơn theo userID
export const getInvoicesByUserID = (userID) => async (dispatch) => {
    try {
      dispatch({ type: INVOICE_REQUEST });
  
      // Gọi API để lấy danh sách hóa đơn theo userID
      const { data } = await axios.get(`${URL}/api/invoices/user/${userID}`);
  
      dispatch({
        type: INVOICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_FAIL,
        payload: error.response?.data?.message || "Server Error",
      });
    }
  };

  // Lấy tất cả đơn hàng
export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: INVOICE_REQUEST });
  
      // Gọi API để lấy tất cả các đơn hàng
      const { data } = await axios.get(`${URL}/api/invoices/orders`);
  
      dispatch({
        type: INVOICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_FAIL,
        payload: error.response?.data?.message || "Server Error",
      });
    }
  };
  
  