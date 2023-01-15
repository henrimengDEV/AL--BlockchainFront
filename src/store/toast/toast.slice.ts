import {ToastMessage} from "primereact/toast";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ToastState {
    entity: ToastMessage
}

const initialState: ToastState = {
    entity: undefined
}

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setToastEntity(state, action: PayloadAction<ToastMessage>) {
            state.entity = action.payload
        }
    }
})

export const {setToastEntity} = toastSlice.actions
export default toastSlice.reducer