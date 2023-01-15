import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ToastMessage} from "./toast.model";

interface ToastState {
    value: ToastMessage
    log: string[]
}

const initialState: ToastState = {
    value: undefined,
    log: []
}

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setToastEntity(state, action: PayloadAction<ToastMessage>) {
            if (state.log.includes(action.payload.transactionHash)) {
                state.value = initialState.value
                return;
            }

            state.value = action.payload
            state.log.push(action.payload.transactionHash)

            setTimeout(() => {
                state.value = initialState.value
            }, 5000)
        },
        resetToastValue(state) {
            state.value = initialState.value
        }
    }
})

export const {setToastEntity, resetToastValue} = toastSlice.actions
export default toastSlice.reducer