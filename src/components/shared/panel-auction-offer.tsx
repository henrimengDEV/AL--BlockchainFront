import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button} from "primereact/button";
import {confirmDialog} from "primereact/confirmdialog";
import {Building} from "../../store/building/building.model";
import {isOwnerBuildingBuyable} from "./file-utils";
import {deleteBuildingToAuction} from "../../store/building/building.slice";
import {setToastEntity} from "../../store/toast/toast.slice";

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
            >
                <DataTable
                    value={buildings.filter(value => isOwnerBuildingBuyable(value, connectedUser))}
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
            {/*<Panel*/}
            {/*    className="mb-3"*/}
            {/*    header="My offers"*/}
            {/*    toggleable*/}
            {/*    collapsed*/}
            {/*>*/}
            {/*    <DataTable*/}
            {/*        value={offers.filter(value => isOwner(value.from.address, connectedUser))}*/}
            {/*        responsiveLayout="scroll"*/}
            {/*        cellSelection*/}
            {/*        size="small"*/}
            {/*    >*/}
            {/*        <Column*/}
            {/*            field="price"*/}
            {/*            header="Price"*/}
            {/*        />*/}
            {/*        <Column*/}
            {/*            field="expiration"*/}
            {/*            header="Expiration"*/}
            {/*        />*/}
            {/*        <Column*/}
            {/*            header="From"*/}
            {/*            body={(data: Offer) => <Link to={'#'}>{data.from.username}</Link>}*/}
            {/*        />*/}
            {/*    </DataTable>*/}
            {/*</Panel>*/}
        </div>
    )

    function confirm(event: any, data: Building) {
        confirmDialog({
            header: 'Confirmation',
            message: <p>Are you sure you want to cancel auction of <strong>{data.name}</strong> ?</p>,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                dispatch(deleteBuildingToAuction({
                    buildingId: data.id,
                    onError: (error) => {
                        dispatch(setToastEntity({
                            severity: 'error',
                            summary: 'Error',
                            detail: error
                        }))
                    }
                }))
            },
        });
    }
}

export default PanelAuctionOffer