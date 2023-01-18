import {BigNumber} from "ethers";
import {Building} from "../../store/building/building.model";
import {User} from "../../store/user/user.model";

export function copyInClipboard(text: string) {
    navigator.clipboard.writeText(text)
}

export function convertBigNumberToNumber(bigNumber: BigNumber): number {
    return BigNumber.from(bigNumber).toNumber()
}

export function convertNumberToBigNumber(number: number): BigNumber {
    return BigNumber.from(number)
}

export function isOwnerBuildingTaken(building: Building, connectedUser: User): boolean {
    return building.owner.address.toLowerCase() === connectedUser?.address && !building.isBuyable
}

export function isOwnerBuildingBuyable(building: Building, connectedUser: User): boolean {
    return building.owner.address.toLowerCase() === connectedUser?.address && building.isBuyable
}

export function isOwner(address: string, connectedUser: User): boolean {
    return address != null && address.toLowerCase() === connectedUser?.address
}

export enum BuildingNameType {
    MEDITERRANEAN = "Mediterranean_Avenue",
    BALTIC = "Baltic_Avenue",
    ORIENTAL = "Oriental_Avenue",
    VERMONT = "Vermont_Avenue",
    CONNECTICUT = "Connecticut_Avenue",
    STATES = "States_Avenue",
    VIRGINIA = "Virginia_Avenue",
    TENNESSEE = "Tennessee_Avenue",
}

export const buildingNameTypes = [
    {label: "MEDITERRANEAN", value: "Mediterranean_Avenue"},
    {label: "BALTIC", value: "Baltic_Avenue"},
    {label: "ORIENTAL", value: "Oriental_Avenue"},
    {label: "VERMONT", value: "Vermont_Avenue"},
    {label: "CONNECTICUT", value: "Connecticut_Avenue"},
    {label: "STATES", value: "States_Avenue"},
    {label: "VIRGINIA", value: "Virginia_Avenue"},
    {label: "TENNESSEE", value: "Tennessee_Avenue"},
]

export function getBuildingNameType(buildingEnum: number): string {
    switch (buildingEnum) {
        case 0:
            return "Mediterranean_Avenue";
        case 1:
            return "Baltic_Avenue";
        case 2:
            return "Oriental_Avenue";
        case 3:
            return "Vermont_Avenue";
        case 4:
            return "Connecticut_Avenue";
        case 5:
            return "States_Avenue";
        case 6:
            return "Virginia_Avenue";
        case 7:
            return "Tennessee_Avenue";
        default:
            return "Mediterranean_Avenue";
    }
}

export function areAddressesEquals(address1: string, address2: string) {
    return address1.toLowerCase() === address2.toLowerCase()
}

export function getErrorMessage(source: any) {
    const error = JSON.stringify(source)

    console.log(error)

    if (error.includes('Ownable: caller is not the owner'))
        return 'Ownable: caller is not the owner'

    if (error.includes('User denied transaction signature'))
        return 'User denied transaction signature'

    return error
}

export function getTransactionHashFromEvent(event: any) {
    return event.filter(it => it.transactionHash != null).map(it => it.transactionHash)[0]
}