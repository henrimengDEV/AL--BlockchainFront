import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Board} from "./board.model";
import {getContractPolyFactory} from "../../contract";
import {convertBigNumberToNumber, getErrorMessage} from "../../components/shared/file-utils";

interface BoardState {
    entities: Board[]
}

const initialState: BoardState = {
    entities: []
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        createBoard(state, action: PayloadAction<{ newBoard: Board, onError: (error: string) => void }>) {
            getContractPolyFactory().then(({contract: contract}) => {
                if (!contract) {
                    console.error("contract is null")
                    return;
                }

                const newBoard: Board = action.payload.newBoard
                contract.createBoard(newBoard.name, newBoard.buyIn, newBoard.blind)
                    .then(
                        res => {
                        },
                        err => {
                            action.payload.onError(getErrorMessage(err))
                        }
                    )
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBoards.fulfilled, (state, action) => {
            state.entities = action.payload
        })
    }
})

export const getAllBoards = createAsyncThunk(
    'board/getBuildings',
    async () => {
        return await getContractPolyFactory().then(({contract}) => {
            if (!contract) {
                console.error("contract is null")
                return;
            }

            return contract.getBoards().then((result) => {
                const newBoardsState: Board[] = result.map(item => {
                    const newBoard: Board = {
                        id: convertBigNumberToNumber(item.boardId),
                        name: item.name,
                        blind: item.blind | 1,
                        buyIn: item.buyIn | 1,
                        playerStates: []
                    }
                    return newBoard
                })

                return newBoardsState
            })
        })
    }
)

export const {createBoard} = boardSlice.actions
export default boardSlice.reducer