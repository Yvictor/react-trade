import { configureStore } from "@reduxjs/toolkit";
// import { createStore } from "redux";
// import quoteReducer from "../reducers/quote";
import quoteReducer from "../reducers";
import logger from 'redux-logger'
import solace from "../middleware/solace";

const store = configureStore({
    reducer: { quote: quoteReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, solace())
}
);

export default store;
