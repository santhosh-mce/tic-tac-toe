import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    amount: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state)=>{
            state.count += 1;
        },
        decrement: (state)=>{
            if (state.count >= 1){
                state.count -= 1;
            }
            
        },
        reset: (state)=>{
            state.count = 0
        },
        amountadd: (state)=>{
            state.amount += state.count
        }
    }
});

export const { increment, decrement, reset, amountadd } = counterSlice.actions;

export default counterSlice.reducer;