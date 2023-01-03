import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    
        cartItems:[]
    
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addTocart: (state, action) => {
            const newPdt = action.payload;
            

            const existingPdt = state.cartItems.find(pdt => pdt._id === newPdt._id);
        

            const cartItems = existingPdt ? state.cartItems.map(pdt => pdt._id === existingPdt._id ? newPdt : pdt) : [...state.cartItems, newPdt];

            return {
                ...state,
                cartItems
            }
        }
    },

    extraReducers: (builder) => {
        

        
    },
});

export const { addTocart } = cartSlice.actions;

export default cartSlice.reducer;
