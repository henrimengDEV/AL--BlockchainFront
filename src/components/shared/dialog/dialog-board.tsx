import {useAppDispatch, useAppState, useAppStateBoolean, usePrimeReactState} from "../../../app/hooks";
import React, {useRef} from "react";
import {Dialog} from "primereact/dialog";
import {Messages} from "primereact/messages";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {createBoard} from "../../../store/board/board.slice";
import {setToastEntity} from "../../../store/toast/toast.slice";
import {InputNumber} from "primereact/inputnumber";

interface DialogBoardProps {
    visible: boolean
    onHide: any
}

const DialogBoard = (props: DialogBoardProps) => {
    const {visible, onHide} = props
    const dispatch = useAppDispatch()
    const messages = useRef(null);
    const [isLoading, toggleIsLoading] = useAppStateBoolean(false);
    const [name, setName] = useAppState('');
    const [buyIn, setBuyIn] = usePrimeReactState(null);
    const [blind, setBlind] = usePrimeReactState(null);

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
        >
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: '50vw'}}>
                <div>
                    <h2>Create board</h2>
                    <Messages ref={messages}></Messages>
                </div>
                <form style={{display: 'flex', flexDirection: 'column'}}>
                    <span className="field ">
                        <label htmlFor="Name">Name*</label>
                        <InputText
                            id="name"
                            style={{width: '100%'}}
                            value={name}
                            onChange={setName}
                        />
                    </span>
                    <span className="field ">
                        <label htmlFor="buyIn">BuyIn*</label>
                        <InputNumber
                            id="buyIn"
                            style={{width: '100%'}}
                            value={buyIn}
                            onValueChange={setBuyIn}
                            showButtons
                            mode="currency"
                            currency="ETH"
                        />
                    </span>
                    <span className="field ">
                        <label htmlFor="blind">Blind*</label>
                        <InputNumber
                            id="blind"
                            style={{width: '100%'}}
                            value={blind}
                            onValueChange={setBlind}
                            showButtons
                            mode="currency"
                            currency="ETH"
                        />
                    </span>
                </form>
                <Button
                    onClick={onSubmit}
                    icon="pi pi-bitcoin"
                    className="DetailsBuilding__make-offer"
                    label={'Submit'}
                    loading={isLoading}
                    loadingIcon="pi pi-spin pi-sun"
                />
            </div>
        </Dialog>
    )

    function onSubmit() {
        console.log(buyIn)
        if (name == '') {
            messages.current.replace({
                severity: 'warn',
                detail: 'Name is required',
                sticky: true
            });
            return;
        }
        if (buyIn == null) {
            messages.current.replace({
                severity: 'warn',
                detail: 'BuyIn is required',
                sticky: true
            });
            return;
        }
        if (blind == null) {
            messages.current.replace({
                severity: 'warn',
                detail: 'Blind is required',
                sticky: true
            });
            return;
        }

        toggleIsLoading()
        setTimeout(() => resetState(), 5000)
        dispatch(createBoard({
            newBoard: {
                name: name,
                buyIn: buyIn,
                blind: blind
            },
            onError: (error) => {
                dispatch(setToastEntity({
                    severity: 'error',
                    summary: 'Error',
                    detail: error
                }))
            }
        }))
    }

    function resetState() {
        toggleIsLoading()
        onHide()
        setName('')
        setBuyIn(null)
        setBlind(null)
    }
}

export default DialogBoard