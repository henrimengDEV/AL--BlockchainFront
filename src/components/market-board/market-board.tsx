import "./market-board.css"
import React, {ReactElement, useEffect} from "react"
import {DataTable} from "primereact/datatable"
import {Column} from "primereact/column"
import {Board} from "../../store/board/board.model"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {getAllBoards} from "../../store/board/board.slice";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";

const MarketBoard = () => {
    const boards = useAppSelector(state => state.board.entities)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllBoards())
    }, [])

    return (
        <div className="MarketBoard">
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
                <Column body={action} />
            </DataTable>
        </div>
    );

    function name(board: Board) {
        return (
            <div className="MarketBoard__name">
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

    function action(board: Board): ReactElement {
        return (
            <Link to={`/board/${board.id}`} style={{textDecoration: 'none'}}>
                <Button
                    icon="pi pi-angle-right"
                    className="p-button-rounded p-button-outlined"
                    aria-label="Details"
                />
            </Link>
        )
    }
}

export default MarketBoard