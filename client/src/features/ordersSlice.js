import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";

const initialState = {
    orders: [],

    order: {},

    summary:{},
    
    clientId: null,

    loadingPay:false,
    successPay: false,
    
    loadingDeliver:false,
    successDeliver: false,
    deliverIsError: false,
    deliverError:"",
    
    loadingDelete: false,
    successDelete: false,
    deleteIsError: false,
    deleteError:"",
    
    loading: false,
    isError: false,
    error: "",
};

export const placeOrder = createAsyncThunk(
    "orders/placeOrder",
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
    "orders/getOrder",
    async (id, thunkAPI) => {
    
        try {
            const res = await axios.get(`/api/v1/orders/${id}`, {
                headers: {
                    authorization: `Bearer ${
                        thunkAPI.getState().auth.user.token
                    }`,
                },
            });

        console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.message);
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);

export const getAllOrders = createAsyncThunk(
    "orders/getAllOrders",
    async (id, thunkAPI) => {
        try {
            const res = await axios.get("/api/v1/orders/mine", {
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

export const loadPaypalScript = createAsyncThunk(
    "orders/loadPaypalScript",
    async (id, thunkAPI) => {
        try {
            const res = await axios.get("/api/v1/keys/paypal", {
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

export const orderPay = createAsyncThunk("orders/orderPay", async (id, details, thunkAPI) => {
    try {
        const res = await axios.put(`/api/v1/orders/${id}/pay`, details, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
            },
        });

        return res.data;
    } catch (error) {
        // console.log(error.message);
        return thunkAPI.rejectWithValue(getError(error));
    }
});

//* admin section
export const getAllSummaries = createAsyncThunk(
    "orders/getAllSummaries",
    async (id, thunkAPI) => {
        try {
            const res = await axios.get("/api/v1/orders/summary", {
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

export const getAllOrdersByAdmin = createAsyncThunk(
    "orders/getAllOrdersByAdmin",
    async (id, thunkAPI) => {
        try {
            const res = await axios.get("/api/v1/orders", {
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

export const deliverOrderByAdmin = createAsyncThunk(
    "orders/deliverOrderByAdmin",
    async (id, thunkAPI) => {
        try {
            const res = await axios.put(`/api/v1/orders/${id}/deliver`, {
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

export const deleteOrderByAdmin = createAsyncThunk(
    "orders/deleteOrderByAdmin",
    async (order, thunkAPI) => {
        try {
            const res = await axios.delete(`/api/v1/orders/${order._id}`, {
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
    name: "orders",
    initialState,
    reducers: {
        
        payReset: (state) => {
            state.loadingPay = false;
            state.successPay = false;
        },
        deliverReset: (state) => {
            state.loadingDeliver = false;
            state.successDeliver = false;
        },
        deleteReset: (state) => {
            state.loadingDelete = false;
            state.successDelete = false;
        }
    },

    extraReducers: (builder) => {
        //* place order
        builder.addCase(placeOrder.pending, (state) => {
            state.loading = true;
            state.order = {};
        });
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.order = action.payload.order;

            console.log(action.payload.order._id);

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

        //* get all orders
        builder.addCase(getAllOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.orders = action.payload;
        });
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            toast.error(action.payload);
        });

        //* load paypal script
        builder.addCase(loadPaypalScript.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadPaypalScript.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.clientId = action.payload;
        });
        builder.addCase(loadPaypalScript.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            toast.error(action.payload);
        });

        //* pay order
        builder.addCase(orderPay.pending, (state) => {
            state.loadingPay = true;
        });
        builder.addCase(orderPay.fulfilled, (state, action) => {
            state.loadingPay = false;
            state.isError = false;
            state.successPay = true;

            toast.success("Successful payment!");
        });
        builder.addCase(orderPay.rejected, (state, action) => {
            state.loadingPay = false;
            state.isError = true;
            state.error = action.payload;
            toast.error(action.payload);
        });

        //* get all summaries
        builder.addCase(getAllSummaries.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllSummaries.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            // console.log(action.payload);

            state.summary = action.payload;
        });
        builder.addCase(getAllSummaries.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            toast.error(action.payload);
        });

        //* get all orders by admin
        builder.addCase(getAllOrdersByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOrdersByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.orders = action.payload;
        });
        builder.addCase(getAllOrdersByAdmin.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            toast.error(action.payload);
        });

        //* deliver order by admin
        builder.addCase(deliverOrderByAdmin.pending, (state) => {
            state.loadingDeliver = true;
        });
        builder.addCase(deliverOrderByAdmin.fulfilled, (state, action) => {
            state.loadingDeliver = false;
            state.deliverIsError = false;
            state.successDeliver = true;

            toast.success(action.payload.message);
        });
        builder.addCase(deliverOrderByAdmin.rejected, (state, action) => {
            state.loadingDeliver = false;
            state.deliverIsError = true;
            state.deliverError = action.payload;
            toast.error(action.payload);
        });
        
        //* delete order by admin
        builder.addCase(deleteOrderByAdmin.pending, (state) => {
            state.loadingDelete = true;
        });
        builder.addCase(deleteOrderByAdmin.fulfilled, (state, action) => {
            state.loadingDelete = false;
            state.deleteIsError = false;
            state.successDelete = true;

            toast.success(action.payload.message);
        });
        builder.addCase(deleteOrderByAdmin.rejected, (state, action) => {
            state.loadingDelete = false;
            state.deleteIsError = true;
            state.deleteError = action.payload;
            toast.error(action.payload);
        });
    },
});

export const { payReset, deliverReset, deleteReset } = ordersSlice.actions;

export default ordersSlice.reducer;
