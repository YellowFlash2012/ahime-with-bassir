import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";

const initialState = {
    orders: localStorage.getItem("orders")
        ? JSON.parse(localStorage.getItem("orders"))
        : [],

    order: {},
    
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

export const getOrder = createAsyncThunk(
    "cart/getOrder",
    async (id, thunkAPI) => {
    
        try {
            const res = await axios.get(`/api/v1/orders/${id}`, {
                headers: {
                    authorization: `Bearer ${
                        thunkAPI.getState().auth.user.token
                    }`,
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
        //* place order
        builder.addCase(placeOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.order = action.payload.order;

            console.log(state.order);

            toast.success(action.payload.message);
            
        });
        builder.addCase(placeOrder.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            toast.error(action.payload);
        });
        
        //* get a single order
        builder.addCase(getOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.order = action.payload;

        });
        builder.addCase(getOrder.rejected, (state, action) => {
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
