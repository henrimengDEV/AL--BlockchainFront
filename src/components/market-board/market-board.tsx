import "./market-board.css"
import React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Board} from "../../store/board/board.model";
import {useAppSelector} from "../../app/hooks";

const MarketBoard = () => {
    const boards = useAppSelector(state => state.board.entities)

    return (
        <div className="Market">
            <DataTable className="custom-datatable" value={boards} responsiveLayout="scroll" cellSelection>
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
    )

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