import "./details-building.css";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";
import inProgress from '../../assets/undraw_in_progress.png'
import {Accordion, AccordionTab} from "primereact/accordion";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getContractPolyFactory} from "../../contract";
import {getBuildingById} from "../../store/building/building.slice";
import {isOwner} from "../shared/file-utils";

const DetailsBuilding = () => {
    let {id} = useParams();
    const dispatch = useAppDispatch()
    const offers = useAppSelector(state => state.offer.entities)
    const building = useAppSelector(state => state.building.entity)
    const connectedUser = useAppSelector(state => state.user.connectedUser)
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        dispatch(getBuildingById(+id))
    }, [])


    if (building == null) return <></>
    return (
        <div className="DetailsBuilding">
            <div className="DetailsBuilding__left">
                <img src={inProgress} alt="" />
            </div>
            <div className="DetailsBuilding__right">
                <h2>{building.name}</h2>
                <p>
                    Owned by
                    <Link
                        className="ml-2"
                        to={`/profile/${building.owner.address}`}
                    >{building.owner.username || '??'}</Link>
                </p>

                <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <AccordionTab header={BuildingCardTitle()}>
                        <div className="DetailsBuilding__body">
                            <p>Current price</p>
                            <p className="DetailsBuilding__price">
                                <strong>{building.price} ETH</strong>
                                <small>{building.price * 1.48} $</small>
                            </p>
                            {BuildingCardFooter()}
                        </div>
                    </AccordionTab>
                    {/*<AccordionTab header={OffersCardTitle()} className="DetailsBuilding__offers">*/}
                    {/*    <DataTable value={offers} responsiveLayout="scroll" cellSelection size="small">*/}
                    {/*        <Column*/}
                    {/*            field="price"*/}
                    {/*            header="Price"*/}
                    {/*        />*/}
                    {/*        <Column*/}
                    {/*            header="USD Price"*/}
                    {/*            body={data => <>${data.price * 1.48}</>}*/}
                    {/*        />*/}
                    {/*        <Column*/}
                    {/*            header="Floor difference"*/}
                    {/*            body={data => <>{data.price / building.price * 100}%</>}*/}
                    {/*        />*/}
                    {/*        <Column*/}
                    {/*            field="expiration"*/}
                    {/*            header="Expiration"*/}
                    {/*        />*/}
                    {/*        <Column*/}
                    {/*            field="from"*/}
                    {/*            header="From"*/}
                    {/*            body={(data: Offer) =>*/}
                    {/*                <Link to={`/profile/${data.from.address}`}>*/}
                    {/*                    {data.from.username}*/}
                    {/*                </Link>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </DataTable>*/}
                    {/*</AccordionTab>*/}
                </Accordion>
            </div>
        </div>
    )

    function BuildingCardTitle() {
        return <div className="DetailsBuilding__title">
            <i className="pi pi-bitcoin" />
            Auction
        </div>
    }

    function BuildingCardFooter() {
        return <Button
            icon="pi pi-tag"
            className="DetailsBuilding__make-offer"
            label={'Buy it'}
            onClick={onSubmit}
            loading={isLoading}
            loadingIcon="pi pi-spin pi-sun"
        />
    }

    function OffersCardTitle() {
        return <div className="DetailsBuilding__title">
            <i className="pi pi-list" />
            Offers
        </div>
    }

    function onSubmit() {
        if (building == null) {
            setError("A building is required to create an auction !")
            return
        }

        setIsLoading(true)

        getContractPolyFactory().then(({contract}) => {
            if (!contract) {
                window.alert("contract is null")
                return;
            }

            if(isOwner(building.owner.address, connectedUser)) {
                window.alert("you are not allow to buy this building")
                return;
            }

            contract.buyBuilding(id, {value: building.price});
        }).finally(() => setIsLoading(false))
    }
}

export default DetailsBuilding