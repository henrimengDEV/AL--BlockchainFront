import React from "react";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {useAppStateBoolean} from "../../app/hooks";
import DialogBuilding from "../shared/dialog/dialog-building";
import DialogBoard from "../shared/dialog/dialog-board";

const AdminStyle = {
    width: '500px',
    height: 'fit-content'
}

const Admin = () => {
    const [dialogBoardVisible, toggleDialogBoardVisible] = useAppStateBoolean(false);
    const [dialogBuildingVisible, toggleDialogBuildingVisible] = useAppStateBoolean(false);

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
                        onClick={toggleDialogBoardVisible}
                    />
                    <Button
                        label="Create a building"
                        icon="pi pi-plus"
                        onClick={toggleDialogBuildingVisible}
                    />
                </div>
            </Card>
            <DialogBoard visible={dialogBoardVisible} onHide={toggleDialogBoardVisible}/>
            <DialogBuilding visible={dialogBuildingVisible} onHide={toggleDialogBuildingVisible}/>
        </div>
    )


}

export default Admin