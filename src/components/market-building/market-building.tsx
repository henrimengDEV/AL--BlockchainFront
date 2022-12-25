import "./market-building.css"
import React from "react";
import PanelAuctionOffer from "../shared/panel-auction-offer";
import {Divider} from "primereact/divider";
import DatatableBuilding from "../shared/datatable-building";
import ToolbarBuilding from "./toolbar-building";
import {useAppSelector} from "../../app/hooks";

const MarketBuilding = () => {
    const buildings = useAppSelector(state => state.building.entities);

    return (
        <div className="Market">

            <Divider type="dashed">
                <div className="inline-flex align-items-center text-theme">
                    <i className="pi pi-user mr-2"></i>
                    <b>Personal</b>
                </div>
            </Divider>

            <PanelAuctionOffer />

            <Divider type="dashed">
                <div className="inline-flex align-items-center text-theme">
                    <i className="pi pi-building mr-2"></i>
                    <b>Buildings</b>
                </div>
            </Divider>

            <ToolbarBuilding />

            <DatatableBuilding buildinds={buildings} />
        </div>
    )
}

export default MarketBuilding