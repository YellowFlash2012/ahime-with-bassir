import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: 
            localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
        
    
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newPdt = action.payload;
            

            const existingPdt = state.cartItems.find(pdt => pdt._id === newPdt._id);
        

            const cartItems = existingPdt ? state.cartItems.map(pdt => pdt._id === existingPdt._id ? newPdt : pdt) : [...state.cartItems, newPdt];

            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            return {
                ...state,
                cartItems
            }
        },
        removeFromCart: (state, action) => {
            const cartItems = state.cartItems.filter(item => item._id !== action.payload._id);

            localStorage.removeItem("cartItems")

            return {
                ...state,
                cartItems,
            };
        }
    },

    extraReducers: (builder) => {
        

        
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
