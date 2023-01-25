import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    count:0
}

export const counterReducer = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment: (state) => {
            state.count += 1 ;
        },
        decrement: (state) =>{
            state.count -= 1 ;
        },
        incrementByAmount:(state, actions) =>{
            state.count += actions.payload;
        },
        reset:(state) =>{
            state.count = 0;
        }
    }
});
export const {increment, decrement, incrementByAmount, reset} = counterReducer.actions;
export default counterReducer.reducer;