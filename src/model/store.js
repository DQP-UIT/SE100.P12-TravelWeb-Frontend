import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage để lưu dữ liệu
import { facilitiesReducer } from "./facilitiesReducer";
import { hotelReducer } from "./hotelReducer";
import { hotelTypeReducer } from "./hotelTypeReducer";
import { facilitiesTypeReducer } from "./FacilityTypeReducer";
import { suitabilitiesReducer } from "./suitabilitiesReducer";
import filterReducer from "./filterSlice";
import placeReducer from "./placeSlice";
import dateReducer from "./dateSlice";
import memberValueReducer from "./memberValueSlice"
import { userReducer } from "./userReducer";
import { roomReducer } from "./roomReducer";
import uploadReducer from "./uploadSlice"
import {serviceReducer} from "./serviceReducer"
import { invoiceReducer } from "./invoiceReducer";
import authReducer from "./authSlice"; 
import user2 from "./userSlice"; 
import loveList from "./loveListSlice"
import serviceTypeReducer from './serviceTypeSlice'; // Import slice mới
import restaurantReducer from "./restaurantSlice";
// Cấu hình redux-persist
const persistConfig = {
  key: "root", // Khóa lưu trữ chính
  storage, // Lưu trữ vào localStorage
  whitelist: ["filters", "place", "date","memberValue","serviceType"], // Chỉ lưu trữ state của filters và place
};

const rootReducer = {
  facilities: facilitiesReducer,
  hotel: hotelReducer,
  hotelType: hotelTypeReducer,
  facilitiesType: facilitiesTypeReducer,
  suitabilities: suitabilitiesReducer,
  filters: filterReducer,
  place: placeReducer,
  date: dateReducer,
  memberValue: memberValueReducer,
  user: userReducer,
  room: roomReducer,
  upload:uploadReducer,
  serviceState: serviceReducer,
  invoice: invoiceReducer,
  auth: authReducer,
  user2: user2,
  loveList:loveList,
  serviceType: serviceTypeReducer,
  restaurant: restaurantReducer,
};

// Áp dụng persistReducer vào rootReducer
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
