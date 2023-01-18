import {Building} from "../../store/building/building.model";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import React, {useEffect} from "react";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getAllBoards} from "../../store/board/board.slice";

const DatatableBuilding = (props: { buildinds: Building[] }) => {
    const dispatch = useAppDispatch()
    const boards = useAppSelector(state => state.board.entities);

    useEffect(() => {
        dispatch(getAllBoards())
    }, []);

    return (
        <DataTable className="custom-datatable" value={props.buildinds} responsiveLayout="scroll" cellSelection>
            <Column
                field="id"
                header="id"
                sortable
            />
            <Column
                field="name"
                header="Name"
                body={name}
                sortable
            />
            <Column
                field="price"
                header="Price"
                body={price}
                bodyStyle={{fontWeight: 'lighter'}}
                sortable
            />
            <Column
                body={(data: Building) =>
                    <Link to={`/profile/${data.owner.address}`}>
                        {data.owner.address}
                    </Link>
                }
                header="Owner"
                sortable
            />
            <Column
                field="isBuyable"
                header="Status"
                body={isBuyable}
                sortable
            />
            <Column
                body={action}
            />
        </DataTable>
    )

    function name(building: Building) {
        const boardName = boards.find(board => board.id === building.boardId)?.name || ''

        return (
            <div className="Market__name">
                <strong>{boardName}</strong>
                [<small><i>{building?.name}</i></small>]
            </div>
        )
    }

    function price(building: Building) {
        return (
            <>{building.price} ETH</>
        )
    }

    function isBuyable(building: Building) {
        return building.isBuyable
            ? <span className="customer-badge status-proposal">buyable</span>
            : <span className="customer-badge status-unqualified">taken</span>
    }

    function action(building: Building) {
        return building.isBuyable
            ? <Link to={`/building/${building.id}`} style={{textDecoration: 'none'}}>
                <Button
                    icon="pi pi-angle-right"
                    className="p-button-rounded p-button-outlined"
                    aria-label="Details"
                />
            </Link>
            : ''
    }
};

export default DatatableBuilding