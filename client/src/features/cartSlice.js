import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getError } from "../utils";

const initialState = {
    fullBox: false,
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

    shippingAddress: localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {location:{}},

    paymentMethod: localStorage.getItem("paymentMethod")
        ? localStorage.getItem("paymentMethod")
        : "",
    loading: false,
    isError: false,
    error: "",
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

            // console.log(shippingAddress);
        },
        savePaymentMethod: (state, action) => {
            const paymentMethod = action.payload;
            state.paymentMethod = paymentMethod;
        },
        resetCart: (state, action) => {

            state.cartItems = [];
            state.shippingAddress = {}
            state.paymentMethod = "";
            state.loading = false;
            state.isError = false;
            state.error = "";
        
            localStorage.removeItem("cartItems")
            localStorage.removeItem("shippingAddress")
            localStorage.removeItem("PaymentMethod")
        },
        setFullBoxOn: (state) => {
            state.fullBox = true;
        },
        setFullBoxOff: (state) => {
            state.fullBox = false;
        },
        saveShippingAddressMapLocation: (state, action) => {
            state.shippingAddress.location = action.payload;
        }
    },

    extraReducers: (builder) => {
        

        
    },
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    resetCart,
    setFullBoxOn,
    setFullBoxOff,
    saveShippingAddressMapLocation,
} = cartSlice.actions;

export default cartSlice.reducer;
