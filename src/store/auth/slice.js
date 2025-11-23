import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    register() { },
    login() { },
    logout() { },
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: sessionStorage.getItem("token"),
        user: [],
        registerErrors: null,
        successfullyCreatedUser: "",
        loginErrors: null,

    },
    reducers: {
        setActiveUser(state, { payload }) {
            state.user = payload;
        },
        setToken(state, { payload }) {
            state.token = payload;
            sessionStorage.setItem("token", payload);
        },
        setRegisterErrors: (state, { payload }) => {
            state.registerErrors = payload;
        },
        setSuccessfullyCreatedUser: (state, { payload }) => {
            state.successfullyCreatedUser = payload;
        },
        setLoginErrors: (state, { payload }) => {
            state.loginErrors = payload;
        },
        successfulLogin: (state, { payload }) => {
            state.loggedSuccessfully = payload;
        },


        ...middlewareActions,
    },
});

export default authSlice.reducer;

export const {
    setActiveUser,
    register,
    setRegisterErrors,
    setSuccessfullyCreatedUser,
    login,
    setLoginErrors,
    successfulLogin,
    setToken,
    logout,

} = authSlice.actions;