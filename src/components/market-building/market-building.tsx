import "./market-building.css"
import React, {useEffect} from "react";
import PanelAuctionOffer from "../shared/panel-auction-offer";
import {Divider} from "primereact/divider";
import DatatableBuilding from "../shared/datatable-building";
import ToolbarBuilding from "./toolbar-building";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getAllBuildings} from "../../store/building/building.slice";

const MarketBuilding = () => {
    const dispatch = useAppDispatch()
    const buildings = useAppSelector(state => state.building.entities);

    useEffect(() => {
        dispatch(getAllBuildings())

        // TODO https://web3js.readthedocs.io/en/v1.2.7/web3-eth-subscribe.html
        // window.web3.eth.subscribe
    }, [])

    return (
        <div className="MarketBuilding">

            <Divider type="dashed">
                <div className="inline-flex align-items-center text-theme">
                    <i className="pi pi-user mr-2"></i>
                    <b>Personal</b>
                </div>
            </Divider>

            <PanelAuctionOffer/>

            <Divider type="dashed">
                <div className="inline-flex align-items-center text-theme">
                    <i className="pi pi-building mr-2"></i>
                    <b>Buildings</b>
                </div>
            </Divider>

            <ToolbarBuilding/>

            <DatatableBuilding buildinds={buildings}/>
        </div>
    )
}

export default MarketBuilding