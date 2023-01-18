import {combineReducers, configureStore} from "@reduxjs/toolkit";
import boardSlice from "./board/board.slice";
import buildingSlice from "./building/building.slice";
import offerSlice from "./offer/offer.slice";
import userSlice from "./user/user.slice";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import toastSlice from "./toast/toast.slice";
import coinpolySlice from "./coinpoly/coinpoly.slice";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    building: buildingSlice,
    board: boardSlice,
    offer: offerSlice,
    user: userSlice,
    toast: toastSlice,
    coinpoly: coinpolySlice,
}))

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'building/createBuilding', 'board/createBoard'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['items.dates'],
            },
        }),
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RooState = ReturnType<typeof store.getState>