import "./profile.css"
import inProgress from "../../assets/undraw_in_progress.png";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {TabPanel, TabView} from "primereact/tabview";
import DatatableBuilding from "../shared/datatable-building";
import Clipboard from "../shared/clipboard/clipboard";
import {Button} from "primereact/button";
import {areAddressesEquals, copyInClipboard} from "../shared/file-utils";
import {useAppSelector} from "../../app/hooks";

const Profile = () => {
    let {address} = useParams();
    const users = useAppSelector(state => state.user.entities)
    const buildings = useAppSelector(state => state.building.entities)
    const [user] = useState(() => users.find(value => areAddressesEquals(value.address.toLowerCase(), address)));

    return (
        <div className="Profile">
            <div className="Profile__header">
                <div className="Profile__header-background"></div>
                <img src={inProgress} alt="" />
            </div>
            <div className="Profile__body">
                <div className="Profile__body-header">
                    <div>
                        <h2>{user?.username}</h2>
                        <Clipboard icon="pi pi-bolt" text={user?.address || ""} />
                    </div>
                    <div>
                        <Button
                            onClick={() => copyInClipboard(window.location.href)}
                            icon="pi pi-share-alt"
                            className="p-button-rounded p-button-secondary p-button-outlined"
                            aria-label="Bookmark"
                        />
                    </div>
                </div>

                <TabView className="custom-datatable">
                    <TabPanel header="Buildings">
                        <DatatableBuilding buildinds={buildings.filter(value => areAddressesEquals(value.owner.address, address))} />
                    </TabPanel>
                    <TabPanel header="Auctions">
                        Content II
                    </TabPanel>
                    <TabPanel header="Offers">
                        Content III
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}

export default Profile