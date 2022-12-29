import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
    products: [],
    loading: false,
    isError:false,
    error: ""
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (id,thunkAPI) => {
        
        try {
            const res = await axios.get("/api/v1/product");
            
            return res.data;
            
        } catch (error) {
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.isError = false;
                state.products = action.payload;
            })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            console.log(action);
        })
    },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
