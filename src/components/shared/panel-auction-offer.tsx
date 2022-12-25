import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Link} from "react-router-dom";
import React from "react";
import {Offer} from "../../store/offer/offer.model";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button} from "primereact/button";
import {confirmDialog} from "primereact/confirmdialog";
import {Building} from "../../store/building/building.model";
import {updateBuilding} from "../../store/building/building.slice";

const PanelAuctionOffer = () => {
    const dispatch = useAppDispatch()
    const connectedUser = useAppSelector(state => state.user.connectedUser)
    const offers = useAppSelector(state => state.offer.entities)
    const buildings = useAppSelector(state => state.building.entities)

    return (
        <div className="flex-2 custom-panel">
            <Panel
                className="mb-3"
                header="My auctions"
                style={{padding: '0'}}
                toggleable
                collapsed
            >
                <DataTable
                    value={buildings.filter(value => value.owner.address === connectedUser?.address && value.isBuyable)}
                    responsiveLayout="scroll"
                    cellSelection
                    size="small"
                >
                    <Column
                        field="name"
                        header="Name"
                        sortable
                    />
                    <Column
                        field="price"
                        header="Price"
                        bodyStyle={{fontWeight: 'lighter'}}
                        sortable
                    />
                    <Column
                        body={(data: Building) =>
                            <>
                                <Button
                                    id="button"
                                    onClick={(e) => confirm(e, data)}
                                    icon="pi pi-times"
                                    label="Cancel"
                                    className="p-button-outlined p-button-sm p-button-danger"
                                />
                            </>
                        }
                    />
                </DataTable>
            </Panel>
            <Panel
                className="mb-3"
                header="My offers"
                toggleable
                collapsed
            >
                <DataTable
                    value={offers.filter(value => value.from.address === connectedUser?.address)}
                    responsiveLayout="scroll"
                    cellSelection
                    size="small"
                >
                    <Column
                        field="price"
                        header="Price"
                    />
                    <Column
                        field="expiration"
                        header="Expiration"
                    />
                    <Column
                        header="From"
                        body={(data: Offer) => <Link to={'#'}>{data.from.username}</Link>}
                    />
                </DataTable>
            </Panel>
        </div>
    )

    function confirm(event: any, data: Building) {
        confirmDialog({
            header: 'Confirmation',
            message: <p>Are you sure you want to cancel auction of <strong>{data.name}</strong> ?</p>,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                dispatch(updateBuilding({...data, isBuyable: false}))
            },
        });
    }
}

export default PanelAuctionOffer