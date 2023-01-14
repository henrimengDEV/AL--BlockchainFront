import "./toolbar-building.css";
import React, {useState} from "react";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {Building} from "../../store/building/building.model";
import {Message} from "primereact/message";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {createBuilding, updateBuilding} from "../../store/building/building.slice";
import {convertBigNumberToNumber, isOwnerBuildingTaken} from "../shared/file-utils";
import {getPolyFactory} from "../../contract";

const ToolbarBuilding = () => {
    const dispatch = useAppDispatch();
    const buildings = useAppSelector(state => state.building.entities);
    const connectedUser = useAppSelector(state => state.user.connectedUser);
    const [dialogCreateAuction, setDialogCreateAuction] = useState(false);
    const [building, setBuilding] = useState<Building | undefined>(undefined);
    const [price, setPrice] = useState<number | null>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <div className="ToolbarBuilding">
            <Toolbar
                className="p-2 mb-3"
                right={<>
                    <Button
                        label="Create a building"
                        icon="pi pi-plus"
                        onClick={handleCreateBuilding}
                    />
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
                        optionLabel="name"
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

    function handleCreateBuilding() {
        const now = Date.now()


        const newBuilding: Building = {
            name: "",
            price: 1,
            isBuyable: false,
            owner: null,
            lastUpdateDate: now.toString()
        }

        dispatch(createBuilding(newBuilding))
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
        getPolyFactory().then(({contract}) => {
            if (!contract) {
                console.log("contract is null")
                return;
            }
            const buildings = contract.getBuildings().then((result) => {
                const buildingGet: Building[] = result.map(item => {
                    const eachBuilding: Building = {
                        id: convertBigNumberToNumber(item.buildingId),
                        name: item.nameType,
                        price: item.price,
                        owner: item.owner,
                        isBuyable: item.isBuyable,
                        lastUpdateDate: Date.now().toString(),
                    }

                    return eachBuilding;
                })
                return buildingGet;
            })
            console.log(buildings);
            // TODO rendre l'id et le prix dynamique avec l'IHM
            contract.putBuildingToAuction(0, 2).then(() => {
            })
        })

    }
}

export default ToolbarBuilding