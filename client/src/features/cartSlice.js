import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

    shippingAddress: localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {},
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
        },
        saveShippingAddress: (state, action) => {
            const shippingAddress = action.payload;
            state.shippingAddress = shippingAddress;

            
        },
        resetCart: (state, action) => {

            state.cartItems = [];
            state.shippingAddress = {}
            localStorage.removeItem("cartItems");
        }
    },

    extraReducers: (builder) => {
        

        
    },
});

export const { addToCart, removeFromCart, saveShippingAddress, resetCart } =
    cartSlice.actions;

export default cartSlice.reducer;
