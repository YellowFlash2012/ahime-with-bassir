import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";

const initialState = {
    orders: localStorage.getItem("orders")
        ? JSON.parse(localStorage.getItem("orders"))
        : [],

    order: null,
    
    loading: false,
    isError: false,
    error: "",
};

export const placeOrder = createAsyncThunk(
    "cart/placeOrder",
    async (orderData, thunkAPI) => {
        try {
            const res = await axios.post("/api/v1/orders", orderData, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
                },
            });

            return res.data;
        } catch (error) {
            // console.log(error.message);
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);

export const ordersSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        
    },

    extraReducers: (builder) => {
        //* login users
        builder.addCase(placeOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.order = action.payload.order;

            toast.success(action.payload.message);
        });
        builder.addCase(placeOrder.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            toast.error(action.payload);
        });
    },
});

export const {
    
} = ordersSlice.actions;

export default ordersSlice.reducer;
