import { configureStore } from "@reduxjs/toolkit";
// import { createStore } from "redux";
// import quoteReducer from "../reducers/quote";
import quoteReducer from "../reducers";
import logger from 'redux-logger'

const store = configureStore({ reducer: { quote: quoteReducer }, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger) }
);

export default store;
