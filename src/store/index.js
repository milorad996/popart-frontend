import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import authReducer from "./auth/slice";
import listingsReducer from "./listings/slice"
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer,
        listings: listingsReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(
            {
                thunk: false,
                serializableCheck: false,
            }),

        sagaMiddleware,
    ],
});

for (const saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}

export default store;