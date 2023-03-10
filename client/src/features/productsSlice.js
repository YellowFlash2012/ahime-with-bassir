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
    product: {},
    productToEdit: {},

    
    loadingCreate: false,
    createIsError:false,
    createError: "",
    
    loadingUpdate: false,
    updateIsError:false,
    updateError: "",
    
    loadingNewReview: false,
    reviewIsError:false,
    reviewError: "",
    newReview:{},
    
    loadingUpload: false,
    uploadIsError:false,
    uploadError: "",
    imageURL:"",
    
    loadingDelete: false,
    successDelete: false,
    deleteIsError:false,
    deleteError: "",

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
    async (_, thunkAPI) => {
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
    async (_, thunkAPI) => {
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

export const fetchProductByIdByAdmin = createAsyncThunk(
    "products/fetchProductByIdByAdmin",
    async (id, thunkAPI) => {

        try {
            const res = await axios.get(`/api/v1/products/${id}`);
        
            return res.data;
        } catch (error) {
            // console.log(error.message);
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);

export const updateProductByAdmin = createAsyncThunk(
    "products/updateProductByAdmin",
    async (productData, thunkAPI) => {
        
        try {
            const res = await axios.put(`/api/v1/products/${productData._id}`, productData, {
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

export const uploadImageByAdmin = createAsyncThunk(
    "products/uploadImageByAdmin",
    async (file, thunkAPI) => {
        try {
            const res = await axios.put('/api/v1/uploads', file, {
                headers: {
                    "Content-Type":"multipart/form-data",
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

export const deleteProductByAdmin = createAsyncThunk(
    "products/deleteProductByAdmin",
    async (pdt, thunkAPI) => {
        try {
            const res = await axios.delete(`/api/v1/products/${pdt._id}`, {
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

export const addNewReview = createAsyncThunk(
    "products/addNewReview",
    async (reviewData, thunkAPI) => {
        console.log(reviewData);
        console.log(reviewData.id);
        try {
            const res = await axios.post(`/api/v1/products/${reviewData.id}/reviews`, reviewData, {
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
        resetDelete: (state) => {
            state.loadingDelete = false;
            state.successDelete = false;
        }
    },

    extraReducers: (builder) => {
        // fetch all products
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
        });

        // get all categories
        builder.addCase(getAllCategoriess.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllCategoriess.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.categories = action.payload;
        });
        builder.addCase(getAllCategoriess.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
        });

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

        // ***admin section

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

            toast.success(action.payload.message);

            window.location.href = `/admin/product/${action.payload.product._id}`;
        });
        builder.addCase(createNewProductByAdmin.rejected, (state, action) => {
            state.loadingCreate = false;
            state.createIsError = true;
            state.createError = action.payload;
            toast.error(action.payload);
        });

        // fetch a single product by id by admin
        builder.addCase(fetchProductByIdByAdmin.pending, (state) => {
            state.loading = true;
            state.product = {};
        });
        builder.addCase(fetchProductByIdByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.productToEdit = action.payload;
        
        });
        builder.addCase(fetchProductByIdByAdmin.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            toast.error(action.payload)
        });
        
        // update a product by admin
        builder.addCase(updateProductByAdmin.pending, (state) => {
            state.loadingUpdate = true;

        });
        builder.addCase(updateProductByAdmin.fulfilled, (state, action) => {
            state.loadingUpdate = false;
            state.updateIsError = false;
            toast.success(action.payload.message)
            window.location.href = "/admin/products-list";
        });
        builder.addCase(updateProductByAdmin.rejected, (state, action) => {
            state.loadingUpdate = false;
            state.updateIsError = true;
            state.updateError = action.payload;
            toast.error(action.payload)
        });
        
        // upload image by admin
        builder.addCase(uploadImageByAdmin.pending, (state) => {
            state.loadingUpload = true;

        });
        builder.addCase(uploadImageByAdmin.fulfilled, (state, action) => {
            state.loadingUpload = false;
            state.uploadIsError = false;
            state.imageURL = action.payload.secure_url;

            toast.success("Your image was successfully uploaded!")
        
        });
        builder.addCase(uploadImageByAdmin.rejected, (state, action) => {
            state.loadingUpload = false;
            state.uploadIsError = true;
            state.uploadError = action.payload;
            toast.error(action.payload)
        });
        
        // delete product by admin
        builder.addCase(deleteProductByAdmin.pending, (state) => {
            state.loadingDelete = true;
            state.successDelete = false;

        });
        builder.addCase(deleteProductByAdmin.fulfilled, (state, action) => {
            state.loadingDelete = false;
            state.deleteIsError = false;
            state.successDelete = true;

            toast.success(action.payload.message)
        
        });
        builder.addCase(deleteProductByAdmin.rejected, (state, action) => {
            state.loadingDelete = false;
            state.successDelete = false;
            state.deleteIsError = true;
            state.deleteError = action.payload;
            toast.error(action.payload)
        });
        
        // add new review
        builder.addCase(addNewReview.pending, (state) => {
            state.loadingNewReview = true;
        });
        builder.addCase(addNewReview.fulfilled, (state, action) => {
            state.loadingNewReview = false;
            state.reviewIsError = false;

            state.newReview = action.payload.newReview;
            console.log(action.payload.newReview);

            toast.success(action.payload.message)
        
        });
        builder.addCase(addNewReview.rejected, (state, action) => {
            state.loadingNewReview = false;
        
            state.reviewIsError = true;
            state.reviewError = action.payload;
            toast.error(action.payload)
        });
    },
});

export const { resetDelete } = productsSlice.actions;

export default productsSlice.reducer;
