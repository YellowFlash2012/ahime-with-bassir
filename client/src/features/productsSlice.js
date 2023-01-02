import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";


const initialState = {
    products: [],
    product:{},
    loading: false,
    isError:false,
    error: ""
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (id,thunkAPI) => {
        
        try {
            const res = await axios.get("/api/v1/products");
            
            return res.data;
            
        } catch (error) {
            // console.log(error.message);
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);

export const fetchSingleProduct = createAsyncThunk(
    "products/fetchSingleProduct",
    async (slug, thunkAPI) => {
        try {
            const res = await axios.get(`/api/v1/products/slug/${slug}`);

            return res.data;
        } catch (error) {
            // console.log(error.message);
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        // fetch all products
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
        
        })

        // fetch a single product
        builder.addCase(fetchSingleProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.product = action.payload;
        });
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            
        });
    },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
