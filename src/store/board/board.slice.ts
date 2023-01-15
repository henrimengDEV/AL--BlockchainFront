import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Board} from "./board.model";
import {getContractPolyFactory} from "../../contract";
import {convertBigNumberToNumber, getErrorMessage} from "../../components/shared/file-utils";

interface BoardState {
    entities: Board[]
}

const initialState: BoardState = {
    entities: [
        {id: 1, name: 'board_1', blind: 1, buyIn: 1},
        {id: 2, name: 'board_2', blind: 3, buyIn: 3},
        {id: 3, name: 'board_3', blind: 2, buyIn: 2},
        {id: 4, name: 'board_4', blind: 10, buyIn: 10}
    ]
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        createBoard(state, action: PayloadAction<{ newBoard: Board, onError: (error: string) => void }>) {
            getContractPolyFactory().then(({contract: contract}) => {
                if (!contract) {
                    console.log("contract is null")
                    return;
                }

                const newBoard: Board = action.payload.newBoard
                contract.createBoard(newBoard.name, newBoard.buyIn, newBoard.blind)
                    .then(
                        res => {
                        },
                        err => {
                            console.log("createBoard")
                            console.log(err)
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
                console.log("contract is null")
                return;
            }

            return contract.getBoards().then((result) => {
                const newBoardsState: Board[] = result.map(item => {
                    const newBoard: Board = {
                        id: convertBigNumberToNumber(item.boardId),
                        name: item.name,
                        blind: item.blind | 1,
                        buyIn: item.buyIn | 1
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