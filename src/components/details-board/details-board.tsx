import "./details-board.css"
import React, {useEffect, useState} from "react";
import {BuildingNameType, isOwner} from "../shared/file-utils";
import inProgress from '../../assets/undraw_building.png'
import {useAppSelector, useAppStateBoolean} from "../../app/hooks";
import {Navigate, useParams} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import Dice from "../shared/dice/dice";
import {Building} from "../../store/building/building.model";
import {Avatar} from "primereact/avatar";
import {getImageProfile} from "../../app/constants";


const DetailsBoard = () => {
    const {id} = useParams()
    const [isDialogVisible, toggleDialogVisible] = useAppStateBoolean(false);
    const [isDiceVisible, toggleDiceVisible] = useAppStateBoolean(false);
    const [building, setBuilding] = useState<Building>(undefined);

    const connectedUser = useAppSelector(state => state.user.connectedUser)
    const board = useAppSelector(state => state.board.entities.find(it => it.id === +id))
    const buildings = useAppSelector(state => state.building.entities.filter(it => it.boardId === +id))
    const buildingsTaken: string[] = buildings.filter(it => !it.isBuyable).map(it => it.name)
    const myBuildings: string[] = buildings.filter(it => isOwner(it.owner.address, connectedUser)).map(it => it.name)

    const [playerStates, setPlayerStates] = useState([
        {userAddress: connectedUser.address, position: 0, image: getImageProfile()},
        {userAddress: connectedUser.address + 1, position: 1, image: getImageProfile()},
        {userAddress: connectedUser.address + 2, position: 2, image: getImageProfile()},
        {userAddress: connectedUser.address + 3, position: 3, image: getImageProfile()},
        {userAddress: connectedUser.address + 4, position: 4, image: getImageProfile()},
        {userAddress: connectedUser.address + 5, position: 5, image: getImageProfile()},
    ]);

    useEffect(() => {
        console.log(playerStates)
    }, [playerStates]);

    if (board == null) return <Navigate to={"/boards"} />
    return (
        <div className="Coinpoly">
            <div className="Coinpoly__legend">
                <h3>Legends</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    You are
                    <Avatar
                        style={{height: '2rem', width: '2rem'}}
                        image={playerStates.find(it => isOwner(it.userAddress, connectedUser)).image}
                    />
                </div>
                <div className="customer-badge status-qualified">MINE</div>
                <div className="customer-badge status-new">BUYABLE</div>
                <div className="customer-badge status-unqualified">TAKEN</div>
            </div>

            <h3>{board.name}</h3>
            <div className="Coinpoly__container" style={{'--nb': 8} as React.CSSProperties}>
                <img
                    onClick={toggleDiceVisible}
                    className="Coinpoly__logo"
                    src="https://ih1.redbubble.net/image.3375471324.6724/st,small,507x507-pad,600x600,f8f8f8.jpg"
                    alt="logo"
                />

                {
                    Object.keys(BuildingNameType).map((item, index) =>
                        <button
                            key={`building_${index}`}
                            onClick={() => {
                                setBuilding(() => buildings.find(it => it.name === BuildingNameType[item]))
                                toggleDialogVisible()
                            }}
                            className="Coinpoly__case"
                            style={{'--numero': index + 1,} as React.CSSProperties}
                            disabled={buildings.find(it => it.name === BuildingNameType[item]) == null}
                        >
                            <div className="Coinpoly__wrapper">
                                <img src={inProgress} alt="building" />
                                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                                    <p className={`customer-badge ${getBuildingStatus(item)}`}>{item}</p>
                                    <div className="Coinpoly__players">
                                        {
                                            playerStates.map(player => {
                                                if (player.position !== index) return <></>
                                                return <Avatar
                                                    style={
                                                        isOwner(player.userAddress, connectedUser)
                                                            ? {
                                                                borderRadius: '50%',
                                                                padding: '2px',
                                                                border: '2px lightgrey solid',
                                                                height: '2rem',
                                                                width: '2rem'
                                                            }
                                                            : {height: '2rem', width: '2rem'}
                                                    }
                                                    image={player.image}
                                                />
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </button>
                    )
                }
            </div>

            {isDiceVisible ? <Dice onPlay={setConnectedPlayerPosition} onHide={toggleDiceVisible} /> : ''}

            <Dialog
                visible={isDialogVisible}
                onHide={toggleDialogVisible}
                style={{width: '50vw'}}
                header={headerDialog}
            >
                <ul style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {
                        isOwner(building?.owner?.address, connectedUser)
                            ? <div>
                                <strong>Owner :</strong>
                                <p className="customer-badge status-qualified">{building.owner.address}</p>
                            </div>
                            : <div>
                                <strong>Owner :</strong>
                                <p className="customer-badge status-qualified">Me</p>
                            </div>
                    }
                    <div>
                        <strong>Blind :</strong>
                        <p>{board.blind} ETH</p>
                    </div>
                </ul>
            </Dialog>
        </div>
    )

    function headerDialog(): React.ReactElement {
        return (
            <h2 style={{fontSize: '20px'}}>{building?.name}</h2>
        )
    }

    function getBuildingStatus(buildingTypeName: string): string {
        const source = BuildingNameType[buildingTypeName]
        if (myBuildings.includes(source)) return 'status-qualified'
        if (buildingsTaken.includes(source)) return 'status-unqualified'
        return 'status-new'
    }

    function setConnectedPlayerPosition(value: number) {
        const currentState = playerStates.find(it => it.userAddress === connectedUser.address)
        setPlayerStates(prev => [
            ...prev.filter(it => it.userAddress !== connectedUser.address),
            {
                ...currentState,
                position: (currentState.position + value) % 8
            }
        ])
    }

}

export default DetailsBoard