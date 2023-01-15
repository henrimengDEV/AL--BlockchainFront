import {Menubar} from "primereact/menubar";
import React, {useState} from "react";
import {Dialog} from "primereact/dialog";
import OnBoard from "../shared/on-board";
import {useAppSelector} from "../../app/hooks";

const Menu = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const connectedUser = useAppSelector(state => state.user.connectedUser)

    return (
        <>
            <Menubar
                start={
                    <div className="flex">
                        <img
                            className="logo ml-2"
                            alt="logo"
                            src="https://ih1.redbubble.net/image.3375471324.6724/st,small,507x507-pad,600x600,f8f8f8.jpg"
                            data-pr-tooltip="PrimeReact-Logo"
                            height="80px"
                            onClick={() => window.location.href = "/"}
                        />
                    </div>
                }
                model={connectedUser ? items : null}
                end={
                    <div className="flex">
                        <OnBoard />
                    </div>
                }
            />
            <>
                <Dialog
                    visible={visible}
                    onHide={toggleVisible}
                    breakpoints={{'960px': '75vw', '640px': '100vw'}}
                    style={{width: '50vw'}}
                >
                    Content
                </Dialog>
            </>
        </>
    )

    function toggleVisible() {
        setVisible(prevState => !prevState)
    }
}

const items = [
    {
        label: 'Boards',
        icon: 'pi pi-fw pi-box',
        command: () => window.location.href = "/boards"
    },
    {
        label: 'Buildings',
        icon: 'pi pi-fw pi-building',
        command: () => window.location.href = "/buildings"
    },
    {
        label: 'Admin',
        icon: 'pi pi-fw pi-building',
        command: () => window.location.href = "/admin"
    }
];

export default Menu