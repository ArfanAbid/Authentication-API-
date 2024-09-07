import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";

const initialState = {
    access: Cookies.get(ACCESS_TOKEN) || null,
    refresh: Cookies.get(REFRESH_TOKEN) || null,
    isAuthenticated: false,
    user: null,
    error: null,

};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            Cookies.set(ACCESS_TOKEN, action.payload.access);
            Cookies.set(REFRESH_TOKEN, action.payload.refresh);
        },
        logout: (state) => {
            state.access = null;
            state.refresh = null;
            state.isAuthenticated = false;
            state.user = null;
            Cookies.remove(ACCESS_TOKEN);
            Cookies.remove(REFRESH_TOKEN);
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { login, logout, setError } = authSlice.actions;

export default authSlice.reducer;

