import { createSlice } from "@reduxjs/toolkit"

const initialState={
    step:1,
    editMode:false,
    course:null,
    paymentLoading:false
}

const courseSlice=createSlice({
    name:"course",
    initialState:initialState,
    reducers:{
        setStep(state,action){
            state.step=action.payload
        },
        setCourse(state,action){
            state.course=action.payload
        },
        setEditMode(state,action){
            state.editMode=action.payload
        },
        setPaymentLoading(state,action){
            state.paymentLoading=action.payload
        },
        resetCourseState(state){
            state.course=null
            state.editMode=false
            state.paymentLoading=false
            state.step=1
        }
    }
})


export const {setCourse,setEditMode,setStep,resetCourseState,setPaymentLoading}=courseSlice.actions;

export default courseSlice.reducer