import "./details-board.css"
import React, {ReactElement, useEffect, useState} from "react";
import {BuildingNameType, isOwner, onlyUnique} from "../shared/file-utils";
import inProgress from '../../assets/undraw_building.png'
import {useAppDispatch, useAppSelector, useAppStateBoolean} from "../../app/hooks";
import {Navigate, useParams} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import Dice from "../shared/dice/dice";
import {Building} from "../../store/building/building.model";
import {Avatar} from "primereact/avatar";
import {getImageProfile} from "../../app/constants";
import {
    getCoinpolyEntityByBoardId,
    setCoinpolyByBoarId,
} from "../../store/coinpoly/coinpoly.slice";
import {Coinpoly, PlayerState} from "../../store/coinpoly/coinpoly.model";


const DetailsBoard = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const [isDialogVisible, toggleDialogVisible] = useAppStateBoolean(false);
    const [isDiceVisible, toggleDiceVisible] = useAppStateBoolean(false);
    const [building, setBuilding] = useState<Building>(undefined);

    const coinpoly = useAppSelector(state => state.coinpoly.entity)
    const coinpolys = useAppSelector(state => state.coinpoly.entities)
    const connectedUser = useAppSelector(state => state.user.connectedUser)
    const board = useAppSelector(state => state.board.entities.find(it => it.id === +id))
    const buildingsByBoardId = useAppSelector(state => state.building.entities.filter(it => it.boardId === +id))
    const buildingsTaken: string[] = buildingsByBoardId.filter(it => !it.isBuyable).map(it => it.name)
    const buildingsBuyable: string[] = buildingsByBoardId.filter(it => it.isBuyable).map(it => it.name)
    const myBuildings: string[] = buildingsByBoardId.filter(it => isOwner(it.owner.address, connectedUser)).map(it => it.name)

    useEffect(() => {
        dispatch(setCoinpolyByBoarId({
            boardId: +id,
            playerStates: [
                ...buildingsByBoardId.map(it => it.owner.address).filter(onlyUnique).map(it => {
                    const previousPlayerState = coinpoly?.playerStates.find(it2 => it2.userAddress === it)

                    const newPlayerState: PlayerState = {
                        userAddress: it,
                        position: previousPlayerState?.position || 0,
                        image: getImageProfile()
                    }

                    return newPlayerState
                })
            ]
        }))
    }, []);

    useEffect(() => {
        dispatch(getCoinpolyEntityByBoardId(+id))
    }, [coinpolys]);

    if (board == null) return <Navigate to={"/boards"} />
    return (
        <div className="Coinpoly">
            <div className="Coinpoly__legend">
                <h3>Legends</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    You are
                    <Avatar
                        style={{height: '2rem', width: '2rem'}}
                        image={coinpoly.playerStates.find(it => isOwner(it.userAddress, connectedUser)).image}
                    />
                </div>
                <div className="customer-badge status-qualified">MINE</div>
                <div className="customer-badge status-new">BUYABLE</div>
                <div className="customer-badge status-unqualified">TAKEN</div>
                <button onClick={() => setConnectedPlayerPosition(3)}>click me</button>
            </div>

            <h3>{board.name}</h3>
            <div className="Coinpoly__container" style={{'--nb': 8} as React.CSSProperties}>
                <img
                    onClick={toggleDiceVisible}
                    className="Coinpoly__logo"
                    src="https://ih1.redbubble.net/image.3375471324.6724/st,small,507x507-pad,600x600,f8f8f8.jpg"
                    alt="logo"
                />
                {generateBuildingCards()}
            </div>

            {dialogBuilding()}
            {isDiceVisible ? <Dice onPlay={setConnectedPlayerPosition} onHide={toggleDiceVisible} /> : ''}
        </div>
    )

    function generateBuildingCards() {
        return <>
            {
                Object.keys(BuildingNameType).map((itemBuilding, indexBuilding) =>
                    <button
                        key={`building_${indexBuilding}`}
                        onClick={() => {
                            setBuilding(() => buildingsByBoardId.find(it => it.name === BuildingNameType[itemBuilding]))
                            toggleDialogVisible()
                        }}
                        className="Coinpoly__case"
                        style={{'--numero': indexBuilding + 1,} as React.CSSProperties}
                        disabled={buildingsByBoardId.find(it => it.name === BuildingNameType[itemBuilding]) == null}
                    >
                        <div className="Coinpoly__wrapper">
                            <img src={inProgress} alt="building" />
                            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                                <p className={`customer-badge ${getBuildingStatus(itemBuilding)}`}>{itemBuilding}</p>
                                <div className="Coinpoly__players">
                                    {getPlayersByBuilding(indexBuilding)}
                                </div>
                            </div>
                        </div>
                    </button>
                )
            }
        </>
    }

    function dialogBuilding(): ReactElement {
        const headerDialog = (): React.ReactElement => {
            return (
                <h2 style={{fontSize: '20px'}}>{building?.name}</h2>
            )
        }

        return <Dialog
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
    }

    function getBuildingStatus(buildingTypeName: string): string {
        const source = BuildingNameType[buildingTypeName]

        if (myBuildings.includes(source)) {
            if (buildingsBuyable.includes(source))
                return 'status-new'
            return 'status-qualified'
        }
        if (buildingsTaken.includes(source)) return 'status-unqualified'

        return 'status-new'
    }

    function setConnectedPlayerPosition(value: number) {
        console.log(coinpoly.playerStates)
        const previousState = coinpoly.playerStates.find(it => isOwner(it.userAddress, connectedUser))

        const newState: Coinpoly = {
            ...coinpoly,
            playerStates: [
                ...coinpoly.playerStates.filter(it => !isOwner(it.userAddress, connectedUser)),
                {
                    ...previousState,
                    position: (previousState.position + value) % 8
                }
            ]
        }

        dispatch(setCoinpolyByBoarId(newState))
    }

    function getPlayersByBuilding(buildingIndex: number): ReactElement {

        return <>
            {
                coinpoly.playerStates.map((player, playerIndex) => {
                    if (player.position !== buildingIndex) return <div key={`avatar_${playerIndex}`}></div>
                    return <div style={{position: 'relative'}}>
                        <Avatar
                            key={`avatar_${playerIndex}`}
                            style={{height: '2rem', width: '2rem'}}
                            className={isOwner(player.userAddress, connectedUser) ? 'Coinpoly__MyAvatar' : ''}
                            image={player.image}
                        />
                    </div>
                })
            }
        </>
    }

}

export default DetailsBoard