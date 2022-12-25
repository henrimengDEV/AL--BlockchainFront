import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "./user.model";

interface UserState {
    entities: User[]
    connectedUser: User | undefined
}

const initialState: UserState = {
    entities: [
        {username: 'admin', address: '0x99cbb18d16c71776123e84fd73bd0d8f8353a3e9'},
        {username: 'CHINOISERIZ', address: '0x99cbb18d16c71776123e84fd73bd0d8f8353a3e0'},
        {username: 'Krft', address: '0x99cbb18d16c71776123e84fd73bd0d8f8353a3e1'},
        {username: 'Krapx', address: '0x99cbb18d16c71776123e84fd73bd0d8f8353a3e2'},
    ],
    connectedUser: undefined
}

const userSlice = createSlice({
    name: "building",
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<User>) {
            state.entities.push(action.payload)
        },
        changeConnectedUser(state, action: PayloadAction<User | undefined>) {
            state.connectedUser = action.payload
        },
        resetConnectedUser(state) {
            state.connectedUser = undefined
        }
    }
})

export const {addUser, changeConnectedUser, resetConnectedUser} = userSlice.actions
export default userSlice.reducer