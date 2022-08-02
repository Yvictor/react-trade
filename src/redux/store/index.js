import { configureStore } from "@reduxjs/toolkit";
// import { createStore } from "redux";
// import quoteReducer from "../reducers/quote";
import quoteReducer from "../reducers";
import contractsReducer from "../reducers/contracts";
import logger from "redux-logger";
import solace from "../middleware/solace";

const store = configureStore({
  reducer: { quote: quoteReducer, contracts: contractsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, solace()),
});

export default store;
