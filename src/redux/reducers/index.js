import { combineReducers } from 'redux'
import quoteReducer from './quote'

const thunderTradeAppReducer = combineReducers({
  quoteReducer,
})

export default thunderTradeAppReducer