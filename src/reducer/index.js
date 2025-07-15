import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"

//yha par hm svi reducers ko combine karte hai taaki hm combine kar k store ko ek main reduceer de paae

const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer

})

//fir esko export kar denge..
export default rootReducer;