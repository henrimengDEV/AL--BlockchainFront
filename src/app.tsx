import "./app.css";
import React, {useEffect, useRef} from "react";
import Menu from "./components/shared/menu/menu";
import Router from "./router";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Toast, ToastMessage} from "primereact/toast";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getContractPolyFactory} from "./contract";
import {getAllBuildings} from "./store/building/building.slice";
import {getAllBoards} from "./store/board/board.slice";
import {resetToastValue, setToastEntity} from "./store/toast/toast.slice";
import {getTransactionHashFromEvent} from "./components/shared/file-utils";


const App = () => {
    const toastRef = useRef(null)
    const dispatch = useAppDispatch()
    const toastEntity = useAppSelector(state => state.toast.value)

    useEffect(() => {
       handlePushNotifications()
    }, []);

    useEffect(() => {
        showToast(toastEntity)
    }, [toastEntity]);

    return (
        <div className="App">
            <Menu />
            <Router />
            <ConfirmDialog style={{backgroundColor: 'red'}} />
            <Toast style={{maxHeight: '500px'}} ref={toastRef} position="bottom-left" />
        </div>
    )

    function showToast(state: ToastMessage) {
        const toast: Toast = toastRef.current
        toast.show(state)
        setTimeout(() => {
            dispatch(resetToastValue())
        }, 5000)
    }

    function handlePushNotifications() {
        getContractPolyFactory().then(({contract}) => {
            contract.on("NewBuilding", (...args) => {
                dispatch(getAllBuildings())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'New [BUILDING] has been [CREATED]',
                    transactionHash: getTransactionHashFromEvent(args)
                }))
            })
            contract.on("CancelSold", (...args) => {
                dispatch(getAllBuildings())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'An [AUCTION] has been [CANCELED]',
                    transactionHash: getTransactionHashFromEvent(args)
                }))
            })
            contract.on("BuildingPuttedToAuction", (...args) => {
                dispatch(getAllBuildings())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'A Building [AUCTION] has been [CREATED]',
                    transactionHash: getTransactionHashFromEvent(args)
                }))
            })
            contract.on("BuildingSold", (...args) => {
                dispatch(getAllBuildings())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'A Building has been [SOLD]',
                    transactionHash: getTransactionHashFromEvent(args)
                }))
            })
            contract.on("NewBoard", (...args) => {
                dispatch(getAllBoards())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'New [BOARD] has been [CREATED]',
                    transactionHash: getTransactionHashFromEvent(args)
                }))
            })
            contract.on("TransferSingle", (...args) => {
                dispatch(getAllBoards())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'TransferSingle',
                    transactionHash: getTransactionHashFromEvent(args)
                }))
            })
            contract.on("TransferBatch", (...args) => {
                dispatch(getAllBoards())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'TransferBatch',
                    transactionHash: getTransactionHashFromEvent(args)
                }))
            })
        })
    }
}

export default App