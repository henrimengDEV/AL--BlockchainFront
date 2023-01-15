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
import {setToastEntity} from "./store/toast/toast.slice";


const App = () => {
    const toast = useRef(null)
    const dispatch = useAppDispatch()
    const toastEntity = useAppSelector(state => state.toast.entity)

    useEffect(() => {
        getContractPolyFactory().then(({contract}) => {
            contract.on("NewBuilding", () => {
                dispatch(getAllBuildings())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'New building created !'
                }))
            })
            contract.on("NewBoard", () => {
                dispatch(getAllBoards())
                dispatch(setToastEntity({
                    severity: 'info',
                    summary: 'Transaction successful',
                    detail: 'New board created !'
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
            <Toast ref={toast} position="bottom-left" />
        </div>
    )

    function showToast(state: ToastMessage) {
        toast.current.show(state);
    }
}

export default App