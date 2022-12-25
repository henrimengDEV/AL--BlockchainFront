import {combineReducers, configureStore} from "@reduxjs/toolkit";
import boardSlice from "./board/board.slice";
import buildingSlice from "./building/building.slice";
import offerSlice from "./offer/offer.slice";
import userSlice from "./user/user.slice";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    building: buildingSlice,
    board: boardSlice,
    offer: offerSlice,
    user: userSlice,
}))

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RooState = ReturnType<typeof store.getState>