// import { combineReducers } from 'redux'
// import quoteReducer from './quote'

// const thunderTradeAppReducer = combineReducers({
//   quoteReducer,
// })

// export default thunderTradeAppReducer
import _, { round } from 'lodash'

import { createSlice } from '@reduxjs/toolkit'

const prices_arr = [
  ..._.range(0.01, 10, 0.01).map(x => _.round(x, 2)),
  ..._.range(10, 50, 0.05).map(x => _.round(x, 2)),
  ..._.range(50, 100, 0.1).map(x => _.round(x, 1)),
  ..._.range(100, 500, 0.5).map(x => _.round(x, 1)),
  ..._.range(500, 1000, 1).map(x => _.round(x, 0)),
  ..._.range(1000, 10000, 5),
]
console.log(prices_arr)

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    prices: {},
    ask: {},
    bid: {},
    parr: [],
    price: 0,
    volume: 0,
    display_num: 15,
    price_from_idx: 0,
    price_step_type: "norm", //"tws"
  },
  reducers: {
    update_price: (state, action) => {
      state.price = action.payload.price
      state.volume = action.payload.volume
      action.payload.ask.forEach(
        ({ p, v }) => {
          state.prices[p].askv = v
        }
      )
      action.payload.bid.forEach(
        ({ p, v }) => {
          state.prices[p].bidv = v
        }
      )
      state.ask = action.payload.ask
      state.bid = action.payload.bid
    },
    update_position: (state, action) => {
      if (action.payload.side === "BUY") {
        state.prices[action.payload.price].buyv += 1
      }
      if (action.payload.side == "SELL") {
        state.prices[action.payload.price].sellv += 1
      }
    },
    update_display_num: (state, action) => {
      state.display_num = action.payload
    },
    update_price_from_idx: (state, action) => {
      if (action.payload.direction === "up") {
        if (state.price_from_idx < state.parr.length)
          state.price_from_idx += 1
      }
      if (action.payload.direction === "down") {
        if (state.price_from_idx > state.display_num) {
          state.price_from_idx -= 1
        }
      }
    },
    init_price: (state, action) => {
      state.price = action.payload.price
      state.ask = action.payload.ask
      state.bid = action.payload.bid
      state.parr = _.range(action.payload.limit_down, action.payload.limit_up, 1)
      if (action.payload.price_step_type === "tws") {

        state.parr = prices_arr.slice(prices_arr.indexOf(action.payload.limit_down), prices_arr.indexOf(action.payload.limit_up) + 1)

      }
      state.price_from_idx = state.parr.indexOf(state.price) + _.round(state.display_num / 2)
      // state.ask = {}
      state.parr.forEach(
        (p) => {
          state.prices[p] = {
            askv: 0,
            bidv: 0,
            buyv: 0,
            sellv: 0,
          }
        }
      )
      // console.log(parr)
      // console.log(state.prices)
    }
  },
})

// Action creators are generated for each case reducer function
export const { update_price, update_position, init_price, update_display_num, update_price_from_idx } = quoteSlice.actions

export default quoteSlice.reducer