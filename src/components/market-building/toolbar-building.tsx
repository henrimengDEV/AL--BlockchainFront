import "./toolbar-building.css";
import React, {ReactElement, useEffect, useState} from "react";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {Building} from "../../store/building/building.model";
import {Message} from "primereact/message";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {updateBuilding} from "../../store/building/building.slice";
import {isOwnerBuildingTaken} from "../shared/file-utils";
import {getContractPolyFactory} from "../../contract";

const ToolbarBuilding = () => {
    const dispatch = useAppDispatch();
    const buildings = useAppSelector(state => state.building.entities);
    const connectedUser = useAppSelector(state => state.user.connectedUser);
    const [dialogCreateAuction, setDialogCreateAuction] = useState(false);
    const [building, setBuilding] = useState<Building | undefined>(undefined);
    const [price, setPrice] = useState<number | null>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log(building)
    }, [building]);


    return (
        <div className="ToolbarBuilding">
            <Toolbar
                className="p-2 mb-3"
                right={<>
                    <Button
                        label="Create an auction"
                        icon="pi pi-plus"
                        onClick={() => setDialogCreateAuction(true)}
                    />
                </>}
            />
            <>
                <Dialog
                    header="Header"
                    visible={dialogCreateAuction}
                    style={{width: '50vw'}}
                    contentStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                    footer={footer}
                    onHide={() => setDialogCreateAuction(false)}
                >
                    {error ? <Message severity="error" text={error}/> : ""}
                    <Dropdown
                        options={buildings.filter(value => isOwnerBuildingTaken(value, connectedUser))}
                        optionLabel="id"
                        itemTemplate={dropDownItemTemplate}
                        placeholder="Select a Building"
                        value={building}
                        onChange={(e) => setBuilding(e.value)}
                    />
                    <InputNumber
                        value={price}
                        onValueChange={(e) => setPrice(e.value)}
                        showButtons
                        mode="currency"
                        currency="ETH"
                    />
                </Dialog>
            </>
        </div>
    );

    function dropDownItemTemplate(option): ReactElement {
        return (
            <div>{`${option.name} [${option.id}]`}</div>
        )
    }

    function footer() {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => setDialogCreateAuction(false)}/>
                <Button label="Submit" loading={isLoading} loadingIcon="pi pi-spin pi-sun" onClick={onSubmit}/>
            </div>
        )
    }

    function reset() {
        setBuilding(undefined)
        setPrice(1)
    }

    function onSubmit() {
        if (building == null) {
            setError("A building is required to create an auction !")
            return
        }

        setIsLoading(true)
        // console.log(building)
        // console.log(price)

        setTimeout(() => {
            reset()
            setDialogCreateAuction(false)
            setIsLoading(false)
            dispatch(updateBuilding({...building, isBuyable: true}))
            putToAuction()
        }, 2000)


    }

    function putToAuction() {
        console.log('putToAuction')
        console.log(buildings)
        //dispatch(putBuildingToAuction(building.id, building.price))
        getContractPolyFactory().then(({contract}) => {
            if (!contract) {
                console.log("contract is null")
                return;
            }

            console.log(building)
            contract.putBuildingToAuction(building.id, price);
        })
    }
}

export default ToolbarBuilding