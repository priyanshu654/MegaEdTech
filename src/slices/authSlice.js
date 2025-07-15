import { createSlice } from "@reduxjs/toolkit";

//initial state bna lenge
const initialState={
    token:localStorage.getItem("token")?(JSON.parse(localStorage.getItem("token"))):null,
    signUpData:null,
    loading:false
}

//slice of reducers bna lenge ....reducer function hota hai or kuchh nhi jha hm logics likhte hai states ko update karne k leaa
const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    //reducers bnate hai yeahi to main task hai jo ki hm elements se dispatch karte hai main esi ko execute hona hota hai..
    reducers:{
        setToken(state,value){
            state.token=value.payload
        },
        setSignUpData(state,action){
            state.signUpData=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        }
    }

})

//reducers export kar lenge actions me hoga
export const{setToken,setLoading,setSignUpData}=authSlice.actions
//slice ko v export kar lenge...
export default authSlice.reducer;