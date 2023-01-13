import {BigNumber} from "ethers";
import {Building} from "../../store/building/building.model";
import {User} from "../../store/user/user.model";

export function copyInClipboard(text: string) {
    navigator.clipboard.writeText(text)
}

export function convertBigNumberToNumber(bigNumber: BigNumber) {
    return BigNumber.from(bigNumber).toNumber()
}

export function isOwnerBuildingTaken(building: Building, connectedUser: User) {
    return building.owner.address.toLowerCase() === connectedUser?.address && !building.isBuyable
}

export function isOwner(address: string, connectedUser: User) {
    return address.toLowerCase() === connectedUser?.address
}