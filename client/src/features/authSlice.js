import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,

    loading: false,
    isError: false,
    error: "",
};

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
    try {
        const res = await axios.post("/api/v1/users/login", userData);

        return res.data;
    } catch (error) {
        // console.log(error.message);
        return thunkAPI.rejectWithValue(getError(error));
    }
});

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (userData, thunkAPI) => {
        try {
            const res = await axios.post("/api/v1/users", userData);

            return res.data;
        } catch (error) {
            // console.log(error.message);
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            
            state.loading = false;
            state.isError = false;
            state.error=""
            
            state.user = null
            localStorage.removeItem("user")
            
        }
    },

    extraReducers: (builder) => {
        // fetch all products
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.user = action.payload;

            localStorage.setItem("user", JSON.stringify(action.payload))

            toast.success(`Welcome back, ${action.payload.name}`)
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
            toast.error(action.payload)
        });

        // fetch a single product
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.product = action.payload;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
