import "./app.css";
import React, {useEffect, useRef} from "react";
import Menu from "./components/menu/menu";
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
        getContractPolyFactory().then(({contract}) => {
            contract.on("NewBuilding", (...args) => {
                dispatch(getAllBuildings())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'New building created !',
                    transactionHash: getTransactionHashFromEvent(args)
                }))
            })
            contract.on("NewBoard", (...args) => {

                dispatch(getAllBoards())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'New board created !',
                    transactionHash: getTransactionHashFromEvent(args)
                }))
            })
        })
    }, []);

    useEffect(() => {
        showToast(toastEntity)
    }, [toastEntity]);

    return (
        <div className="App">
            <Menu />
            <Router />
            <ConfirmDialog style={{backgroundColor: 'red'}} />
            <Toast ref={toastRef} position="bottom-left" />
        </div>
    )

    function showToast(state: ToastMessage) {
        const toast: Toast = toastRef.current
        toast.show(state)
        setTimeout(() => {
            dispatch(resetToastValue())
        }, 5000)
    }
}

export default App