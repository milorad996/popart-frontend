import { takeLatest, call, put } from "redux-saga/effects";
import authService from "../../services/AuthService";
import {
    setActiveUser,
    setToken,
    register,
    setRegisterErrors,
    setSuccessfullyCreatedUser,
    login,
    setLoginErrors,
    successfulLogin,
    logout,

} from "./slice";

function* handleRegister({ payload }) {
    try {
        const data = yield call(authService.register, payload);
        yield put(setActiveUser(data.user));
        yield put(setSuccessfullyCreatedUser(data.message));
    } catch (e) {
        if (e.response?.status === 422) {
            yield put(setRegisterErrors(e.response.data.errors));
        } else {
            alert("Registration failed");
        }
    }
}

function* handleLogin({ payload }) {
    try {
        const data = yield call(authService.login, payload);
        sessionStorage.setItem("token", data.authorization.token);
        yield put(setActiveUser(data.user));
        yield put(successfulLogin(data.message));
        yield put(setToken(data.authorization.token));
    } catch (e) {
        if (e.response?.status === 401) {
            yield put(setLoginErrors(e.response?.data));
        } else if (e.response.status === 422) {
            yield put(setLoginErrors(e.response?.data));
        } else {
            alert("Invalid credentials");
        }
    }
}

function* handleLogout({ payload }) {
    try {
        yield call(authService.logout);
        sessionStorage.removeItem("token");
        if (typeof payload.meta?.onSuccessLogout === "function") {
            yield call(payload.meta.onSuccessLogout);
        }
        yield put(setToken(null));
        yield put(setActiveUser(null));
    } catch (error) {
        console.log(error);
    }
}



export function* watchRegister() {
    yield takeLatest(register.type, handleRegister);
}

export function* watchLogin() {
    yield takeLatest(login.type, handleLogin);
}

export function* watchLogout() {
    yield takeLatest(logout.type, handleLogout);
}