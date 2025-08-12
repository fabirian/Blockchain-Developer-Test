import handleCart from './handleCart'
import { combineReducers } from "redux";
import walletReducer from "./walletReducer";

const rootReducers = combineReducers({
    handleCart,
    wallet: walletReducer,
})
export default rootReducers