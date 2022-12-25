import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Board} from "./board.model";

interface BoardState {
    entities: Board[]
}

const initialState: BoardState = {
    entities: [
        {name: 'board_1', blind: 1, buyIn: 1},
        {name: 'board_2', blind: 3, buyIn: 3},
        {name: 'board_3', blind: 2, buyIn: 2},
        {name: 'board_4', blind: 10, buyIn: 10}
    ]
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        addBoard(state, action: PayloadAction<Board>) {
            state.entities.push(action.payload)
        }
    }
})

export const {addBoard} = boardSlice.actions
export default boardSlice.reducer