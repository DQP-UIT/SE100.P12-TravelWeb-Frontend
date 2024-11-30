import { configureStore } from "@reduxjs/toolkit";
import {facilitiesReducer} from "./facilitiesReducer";
import { hotelReducer } from "./hotelReducer";
import { hotelTypeReducer } from "./hotelTypeReducer";
import { facilitiesTypeReducer } from "./FacilityTypeReducer";
import { suitabilitiesReducer } from "./suitabilitiesReducer";

const store = configureStore({
  reducer: {
    facilities: facilitiesReducer,
    hotel: hotelReducer,
    hotelType: hotelTypeReducer,
    facilitiesType:facilitiesTypeReducer,
    suitabilities: suitabilitiesReducer
  },
});

export default store;
