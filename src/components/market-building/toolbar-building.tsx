import "./toolbar-building.css";
import React, {ReactElement, useState} from "react";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {Message} from "primereact/message";
import {usePrimeReactState} from "../../app/hooks";
import {getContractPolyFactory} from "../../contract";
import {Building} from "../../store/building/building.model";

const ToolbarBuilding = () => {
    const [dialogCreateAuction, setDialogCreateAuction] = useState(false);
    const [building, setBuilding] = usePrimeReactState(null);
    const [price, setPrice] = usePrimeReactState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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
                    {error ? <Message severity="error" text={error} /> : ""}
                    <Dropdown
                        options={[{}]}
                        optionLabel="id"
                        valueTemplate={dropDownItemTemplate}
                        itemTemplate={dropDownItemTemplate}
                        placeholder="Select a Building"
                        value={building}
                        onChange={setBuilding}
                    />
                    <InputNumber
                        value={price}
                        onValueChange={setPrice}
                        showButtons
                        mode="currency"
                        currency="ETH"
                    />
                </Dialog>
            </>
        </div>
    );

    function dropDownItemTemplate(option: Building): ReactElement {
        if (option == null || option.name == null || option.boardId == null) return <div>i</div>
        return (
            <div>{`${option?.name} [board: ${option?.boardId}]`}</div>
        )
    }

    function footer() {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => setDialogCreateAuction(false)} />
                <Button label="Submit" loading={isLoading} loadingIcon="pi pi-spin pi-sun" onClick={onSubmit} />
            </div>
        )
    }

    function reset() {
        setBuilding({value: undefined})
        setPrice({value: 1})
    }

    function onSubmit() {
        if (building == null) {
            setError("A building is required to create an auction !")
            return
        }

        setIsLoading(true)
        putToAuction()

        setTimeout(() => {
            setDialogCreateAuction(false)
            setIsLoading(false)
            reset()
        }, 2000)


    }

    function putToAuction() {
        //dispatch(putBuildingToAuction(building.id, building.price))
        getContractPolyFactory().then(({contract}) => {
            if (!contract) {
                console.error("contract is null")
                return;
            }

            console.log(building.id)
            console.log(price)
            // contract.putBuildingToAuction(building.id, price);
        })
    }
}

export default ToolbarBuilding