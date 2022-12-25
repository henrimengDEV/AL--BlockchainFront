import "./details-building.css";
import {Link, useParams} from "react-router-dom";
import React, {useState} from "react";
import {Button} from "primereact/button";
import inProgress from '../../assets/undraw_in_progress.png'
import {Accordion, AccordionTab} from "primereact/accordion";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Offer} from "../../store/offer/offer.model";
import {useAppSelector} from "../../app/hooks";

const DetailsBuilding = () => {
    let {name} = useParams();
    const offers = useAppSelector(state => state.offer.entities)
    const buildings = useAppSelector(state => state.building.entities)
    const [building] = useState(() => buildings.find(value => value.name === name));
    const [activeIndex, setActiveIndex] = useState(0);

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
                    <AccordionTab header={OffersCardTitle()} className="DetailsBuilding__offers">
                        <DataTable value={offers} responsiveLayout="scroll" cellSelection size="small">
                            <Column
                                field="price"
                                header="Price"
                            />
                            <Column
                                header="USD Price"
                                body={data => <>${data.price * 1.48}</>}
                            />
                            <Column
                                header="Floor difference"
                                body={data => <>{data.price / building.price * 100}%</>}
                            />
                            <Column
                                field="expiration"
                                header="Expiration"
                            />
                            <Column
                                field="from"
                                header="From"
                                body={(data: Offer) =>
                                    <Link to={`/profile/${data.from.address}`}>
                                        {data.from.username}
                                    </Link>
                                }
                            />
                        </DataTable>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
    )

    function BuildingCardTitle() {
        return <div className="DetailsBuilding__title">
            <i className="pi pi-clock" />
            Sale ends 13 janvier 2023 at 7:28 PM GMT+1
        </div>
    }

    function BuildingCardFooter() {
        return <Button icon="pi pi-tag" className="DetailsBuilding__make-offer" label={'Make offer'} />
    }

    function OffersCardTitle() {
        return <div className="DetailsBuilding__title">
            <i className="pi pi-list" />
            Offers
        </div>
    }
}

export default DetailsBuilding