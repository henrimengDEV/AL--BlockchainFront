import {Building} from "../../store/building/building.model";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import React from "react";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";

const DatatableBuilding = (props: { buildinds: Building[] }) => {
    return (
        <DataTable className="custom-datatable" value={props.buildinds} responsiveLayout="scroll" cellSelection>
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
                        {data.owner.username}
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
        return (
            <div className="Market__name">
                <i className="pi pi-home" style={{'fontSize': '2em'}}></i>
                {building.name}
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
            ? <Link to={`/building/${building.name}`} style={{textDecoration: 'none'}}>
                <Button
                    icon="pi pi-angle-right"
                    className="p-button-rounded p-button-outlined"
                    aria-label="Details"
                />
            </Link>
            : ''
    }
}

export default DatatableBuilding