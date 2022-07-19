// import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import quoteReducer from "../reducers/quote";
// import thunderTradeAppReducer from "../reducers";

const store = createStore(quoteReducer);

export default store;