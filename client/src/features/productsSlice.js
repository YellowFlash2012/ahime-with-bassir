import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";


const initialState = {
    products: [],
    searchProducts: [],
    page: null,
    pages: null,
    countProducts:null,
    categories:[],
    product:{},
    loadingCreate: false,
    createIsError:false,
    createError: "",
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

export const getAllCategoriess = createAsyncThunk(
    "products/getAllCategoriess",
    async (id, thunkAPI) => {
        try {
            const res = await axios.get("/api/v1/products/categories");

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

export const fetchSearchProducts = createAsyncThunk(
    "products/fetchSearchProducts",
    async ({page, category, query, price, rating, order}, thunkAPI) => {
        try {
            const res = await axios.get(
                `/api/v1/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
            );

            return res.data;
        } catch (error) {
            // console.log(error.message);
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);

export const getAllProductsByAdmin = createAsyncThunk(
    "products/getAllProductsByAdmin",
    async (page, thunkAPI) => {
        try {
            const res = await axios.get(`/api/v1/products/admin?page=${page}`, {
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

export const createNewProductByAdmin = createAsyncThunk(
    "products/createNewProductByAdmin",
    async (id, thunkAPI) => {
        console.log(thunkAPI.getState().auth.user.token);
        try {
            const res = await axios.post("/api/v1/products", {
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
        
        // get all categories
        builder
            .addCase(getAllCategoriess.pending, (state) => {
                state.loading = true;
            })
            builder.addCase(getAllCategoriess.fulfilled, (state, action) => {
                state.loading = false;
                state.isError = false;
                state.categories = action.payload;
            })
        builder.addCase(getAllCategoriess.rejected, (state, action) => {
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
        
        // fetch all search products
        builder.addCase(fetchSearchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchSearchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.searchProducts = action.payload.products;
            console.log(action.payload.products);
            state.countProducts = action.payload.countProducts;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        });
        builder.addCase(fetchSearchProducts.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            
        });
        
        // fetch all products by admin
        builder.addCase(getAllProductsByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProductsByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.products = action.payload.products;
        
            state.countProducts = action.payload.productsCount;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        });
        builder.addCase(getAllProductsByAdmin.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            
        });
        
        // create new product by admin
        builder.addCase(createNewProductByAdmin.pending, (state) => {
            state.loadingCreate = true;
        });
        builder.addCase(createNewProductByAdmin.fulfilled, (state, action) => {
            state.loadingCreate = false;
            state.createIsError = false;
            // state.product = action.payload.product;
        
            toast.success(action.payload.message)

            window.location.href=(`/admin/product/${action.payload.product._id}`)
        });
        builder.addCase(createNewProductByAdmin.rejected, (state, action) => {
            state.loadingCreate = false;
            state.createIsError = true;
            state.createError = action.payload;
            toast.error(action.payload)
        });
    },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
