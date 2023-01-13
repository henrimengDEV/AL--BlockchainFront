import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Board} from "./board.model";
import {getPolyFactory} from "../../contract";
import {convertBigNumberToNumber} from "../../components/shared/file-utils";

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
        addBoard(state, action: PayloadAction<Board>) {
            state.entities.push(action.payload)
        },
        createBoard(state, action: PayloadAction<Board>) {
            getPolyFactory().then(({contract: contract}) => {
                if (!contract) {
                    console.log("contract is null")
                    return;
                }

                const newBoard: Board = action.payload

                console.log(newBoard)

                contract.createBoard("TestBoard1", 10, 100)
            })
        },
        setBoards(state, action: PayloadAction<Board[]>) {
            console.log("test")
            state.entities = action.payload
        },
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
        return await getPolyFactory().then(({ contract}) => {
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

                return  newBoardsState
            })
        })
    }
)

export const {addBoard, setBoards, createBoard} = boardSlice.actions
export default boardSlice.reducer