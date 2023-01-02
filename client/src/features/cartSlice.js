import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    
        cartItems:[]
    
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addTocart: (state, action) => {
            return {
                ...state,
                cartItems:[...state.cartItems, action.payload]
            }
        }
    },

    extraReducers: (builder) => {
        

        
    },
});

export const { addTocart } = cartSlice.actions;

export default cartSlice.reducer;
