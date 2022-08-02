// import { combineReducers } from 'redux'
// import quoteReducer from './quote'

// const thunderTradeAppReducer = combineReducers({
//   quoteReducer,
// })

// export default thunderTradeAppReducer
import _, { round } from "lodash";

import { createSlice } from "@reduxjs/toolkit";

const prices_str_arr = [
  ..._.range(0.01, 10, 0.01).map((x) => _.round(x, 2).toFixed(2)),
  ..._.range(10, 50, 0.05).map((x) => _.round(x, 2).toFixed(2)),
  ..._.range(50, 100, 0.1).map((x) => _.round(x, 1).toFixed(1)),
  ..._.range(100, 500, 0.5).map((x) => _.round(x, 1).toFixed(1)),
  ..._.range(500, 1000, 1).map((x) => _.round(x, 0).toFixed(0)),
  ..._.range(1000, 10000, 5).map((x) => x.toFixed(0)),
];
const prices_arr = [
  ..._.range(0.01, 10, 0.01).map((x) => _.round(x, 2)),
  ..._.range(10, 50, 0.05).map((x) => _.round(x, 2)),
  ..._.range(50, 100, 0.1).map((x) => _.round(x, 1)),
  ..._.range(100, 500, 0.5).map((x) => _.round(x, 1)),
  ..._.range(500, 1000, 1).map((x) => _.round(x, 0)),
  ..._.range(1000, 10000, 5),
];
console.log(prices_arr);

export const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    symbol: "FUT/TAIFEX/TXFH2",
    prices: {},
    ask: {},
    bid: {},
    parr: [],
    price: 0,
    volume: 0,
    display_num: 16,
    display_index_offset: 8,
    price_from_idx: 0,
    price_step_type: "norm", //"tws"
  },
  reducers: {
    update_symbol: (state, action) => {
      state.symbol = action.payload.symbol;
    },
    update_price: (state, action) => {
      console.log(action.type);
      console.log(action.payload.type);
      if (action.payload.type === "bidask") {
        // action.payload.ask.forEach(
        //   ({ p, v }) => {
        //     state.prices[p].askv = v
        //   }
        // )
        // action.payload.bid.forEach(
        //   ({ p, v }) => {
        //     state.prices[p].bidv = v
        //   }
        // )
        // console.log(action.payload.ask)
        // console.log(action.payload.bid)
        state.ask = action.payload.ask;
        state.bid = action.payload.bid;
      } else if (action.payload.type === "tick") {
        state.price = action.payload.price;
        state.volume = action.payload.volume;
        state.price_from_idx =
          state.parr.indexOf(state.price) + state.display_index_offset;
        // state.price_from_idx = state.parr.indexOf(state.price) + _.round(state.display_num / 2)
      }
    },
    update_position: (state, action) => {
      if (action.payload.side === "BUY") {
        state.prices[action.payload.price].buyv += 1;
      }
      if (action.payload.side == "SELL") {
        state.prices[action.payload.price].sellv += 1;
      }
    },
    update_display_num: (state, action) => {
      state.display_num = action.payload;
      state.display_index_offset = _.round(state.display_num / 2);
    },
    update_price_from_idx: (state, action) => {
      if (action.payload.direction === "up") {
        if (state.price_from_idx < state.parr.length) {
          state.price_from_idx += 1;
        }
      }
      if (action.payload.direction === "down") {
        if (state.price_from_idx > state.display_num) {
          state.price_from_idx -= 1;
        }
      }
    },
    init_price: (state, action) => {
      state.price_step_type = action.payload.price_step_type;
      state.price = action.payload.price;
      state.ask = action.payload.ask;
      state.bid = action.payload.bid;
      state.parr = _.range(
        action.payload.limit_down,
        action.payload.limit_up,
        1
      );
      if (action.payload.price_step_type === "STK") {
        state.parr = prices_arr.slice(
          prices_arr.indexOf(action.payload.limit_down),
          prices_arr.indexOf(action.payload.limit_up) + 1
        ); 
      }
      state.price_from_idx =
        state.parr.indexOf(state.price) + state.display_index_offset;
      // state.ask = {}
      state.prices = {}
      state.parr.forEach((p) => {
        state.prices[p] = {
          askv: 0,
          bidv: 0,
          buyv: 0,
          sellv: 0,
        };
      });
      // console.log(parr)
      // console.log(state.prices)
    },
  },
});

export const solaceSlice = createSlice({
  name: "SOL",
  initialState: {},
  reducers: {
    CONNECT: (state, action) => {
      console.log(action);
      console.log("solace_connect");
    },
    SUBSCRIBE: (state, action) => {},
    UNSUBSCRIBE: (state, action) => {},
    REQUEST: (state, action) => {},
    DOWNLOAD_CONTRACTS: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  update_symbol,
  update_price,
  update_position,
  init_price,
  update_display_num,
  update_price_from_idx,
} = quoteSlice.actions;
export const { CONNECT, SUBSCRIBE, UNSUBSCRIBE, REQUEST, DOWNLOAD_CONTRACTS } =
  solaceSlice.actions;

export default quoteSlice.reducer;
