import "./market-board.css"
import React, {useEffect} from "react"
import {DataTable} from "primereact/datatable"
import {Column} from "primereact/column"
import {Board} from "../../store/board/board.model"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {createBoard, getAllBoards} from "../../store/board/board.slice";
import {Button} from "primereact/button";

const MarketBoard = () => {
    const boards = useAppSelector(state => state.board.entities)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllBoards())
    }, [])

    return (
        <div className="Market">
            <Button onClick={create}>create</Button>
            <DataTable className="custom-datatable" value={boards} responsiveLayout="scroll" cellSelection>
                <Column
                    field="id"
                    header="id"
                    // body={name}
                    sortable
                />
                <Column
                    field="name"
                    header="Name"
                    body={name}
                    sortable
                />
                <Column
                    field="blind"
                    header="Blind"
                    body={blind}
                    sortable
                />
                <Column
                    field="buyIn"
                    header="BuyIn"
                    body={buyIn}
                    sortable
                />
            </DataTable>
        </div>
    );

    function create() {
        dispatch(createBoard({
            name: "test",
            buyIn: 1,
            blind: 2
        }))
    }

    function name(board: Board) {
        return (
            <div className="Market__name">
                <i className="pi pi-box" style={{'fontSize': '2em'}}></i>
                {board.name}
            </div>
        )
    }

    function blind(board: Board) {
        return (
            <>{board.blind}</>
        )
    }

    function buyIn(board: Board) {
        return (
            <>
                {board.blind} ETH
            </>
        )
    }
}

export default MarketBoard