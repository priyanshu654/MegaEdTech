import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
    loading:false
}

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        }
    }
})

export const{setUser,setLoading}=profileSlice.actions;

export default profileSlice.reducer;