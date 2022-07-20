import { configureStore } from "@reduxjs/toolkit";
// import { createStore } from "redux";
// import quoteReducer from "../reducers/quote";
import quoteReducer from "../reducers";

const store = configureStore({ reducer: { quote: quoteReducer } });

export default store;
