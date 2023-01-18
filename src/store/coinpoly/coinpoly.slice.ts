import {Coinpoly} from "./coinpoly.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CoinpolyState {
    entities: Coinpoly[]
    entity: Coinpoly
}

const initialState: CoinpolyState = {
    entities: [],
    entity: null
}

const coinpolySlice = createSlice({
    name: "coinpoly",
    initialState,
    reducers: {
        setCoinpolyByBoarId(state, action: PayloadAction<Coinpoly>) {
            state.entities = [
                ...state.entities.filter(it => it.boardId !== action.payload.boardId),
                action.payload
            ]
        },
        getCoinpolyEntityByBoardId(state, action: PayloadAction<number>) {
            state.entity = state.entities.find(it => it.boardId === action.payload)
        }
    }
})

export const {setCoinpolyByBoarId, getCoinpolyEntityByBoardId} = coinpolySlice.actions
export default coinpolySlice.reducer