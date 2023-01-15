import React from "react";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {createBuilding} from "../../store/building/building.slice";
import {useAppDispatch, useAppSelector, useAppState, useAppStateBoolean} from "../../app/hooks";
import {createBoard} from "../../store/board/board.slice";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {setToastEntity} from "../../store/toast/toast.slice";

const AdminStyle = {
    width: '500px',
    height: 'fit-content'
}

const Admin = () => {
    const dispatch = useAppDispatch()

    return (
        <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card title="Admin" style={AdminStyle}>
                <div
                    style={{
                        display: 'flex',
                        gap: '5px'
                    }}
                >
                    <Button
                        label="Create a board"
                        icon="pi pi-plus"
                        onClick={handleCreateBoard}
                    />
                    <Button
                        label="Create a building"
                        icon="pi pi-plus"
                        onClick={handleCreateBuilding}
                    />
                </div>
            </Card>
            {dialogBuilding()}
        </div>
    )

    function handleCreateBoard() {
        dispatch(createBoard({
            newBoard: {
                name: "test",
                buyIn: 1,
                blind: 2
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

    function handleCreateBuilding() {
        dispatch(createBuilding({
            name: "",
            price: 1,
            isBuyable: false,
            owner: null,
            lastUpdateDate: Date.now().toString()
        }))
    }

    function dialogBuilding() {
        const boards = useAppSelector(state => state.board.entities)
        const [visible, toggleVisible] = useAppStateBoolean(false);
        const [board, setBoard] = useAppState('');
        const [name, setName] = useAppState('');

        return (
            <Dialog
                visible={visible}
                onHide={toggleVisible}
                style={{backgroundColor: 'red'}}
            >
                <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                    <h2>Create building</h2>
                    <form>
                        <Dropdown
                            options={boards}
                            optionLabel="id"
                            itemTemplate={option => <div>{option.name}</div>}
                            placeholder="Select a board"
                            value={board}
                            onChange={(e) => setBoard(e.value)}
                        />
                        <span className="p-float-label">
                            <InputText id="in" value={name} onChange={setName}/>
                            <label htmlFor="in">Username</label>
                        </span>
                    </form>
                </div>
            </Dialog>
        )
    }
}

export default Admin