import {useAppDispatch, useAppSelector, useAppState, useAppStateBoolean} from "../../../app/hooks";
import React, {useRef} from "react";
import {Dialog} from "primereact/dialog";
import {Messages} from "primereact/messages";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {createBuilding} from "../../../store/building/building.slice";
import {setToastEntity} from "../../../store/toast/toast.slice";
import {buildingNameTypes} from "../file-utils";
import {Board} from "../../../store/board/board.model";

interface DialogBuildingProps {
    visible: boolean
    onHide: any
}

const DialogBuilding = (props: DialogBuildingProps) => {
    const {visible, onHide} = props

    const messages = useRef(null);
    const dispatch = useAppDispatch()

    const [isLoading, toggleIsLoading] = useAppStateBoolean(false);
    const [name, setNameByValue, setName] = useAppState('');
    const [board, setBoardByValue, setBoard] = useAppState(null);

    const boards = useAppSelector(state => state.board.entities)
    const buildingsAlreadyTaken = useAppSelector(state => state.building.entities.filter(it => it.boardId === board?.id)).map(it => it.name)

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
        >
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: '50vw'}}>
                <div>
                    <h2>Create building</h2>
                    <Messages ref={messages}></Messages>
                </div>
                <form style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                    <Dropdown
                        options={[{}, ...boards]}
                        optionLabel="name"
                        itemTemplate={option => <div>{option.name}</div>}
                        placeholder="Select a board*"
                        value={board}
                        onChange={setBoardByValue}
                        required
                        showClear
                    />
                    <Dropdown
                        value={name}
                        options={buildingNameTypes.filter(it => !buildingsAlreadyTaken.includes(it.value))}
                        onChange={setNameByValue}
                        placeholder="Select a type*"
                    />
                    <Button
                        onClick={onSubmit}
                        icon="pi pi-bitcoin"
                        className="DetailsBuilding__make-offer"
                        label={'Submit'}
                        loading={isLoading}
                        loadingIcon="pi pi-spin pi-sun"
                    />
                </form>
            </div>
        </Dialog>
    )

    function onSubmit() {
        if (board == null) {
            messages.current.replace({
                severity: 'warn',
                detail: 'Board is required',
                sticky: true
            });
            return;
        }

        if (name == '') {
            messages.current.replace({
                severity: 'warn',
                detail: 'Name is required',
                sticky: true
            });
            return;
        }

        toggleIsLoading()
        setTimeout(() => resetState(), 5000)
        dispatch(createBuilding({
            building: {
                name: name,
                boardId: board.id
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
        setBoard(null)
    }
}

export default DialogBuilding