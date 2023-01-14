import {BigNumber} from "ethers";
import {Building} from "../../store/building/building.model";
import {User} from "../../store/user/user.model";

export function copyInClipboard(text: string) {
    navigator.clipboard.writeText(text)
}

export function convertBigNumberToNumber(bigNumber: BigNumber) {
    return BigNumber.from(bigNumber).toNumber()
}

export function convertNumberToBigNumber(number: number) {
    return BigNumber.from(number)
}

export function isOwnerBuildingTaken(building: Building, connectedUser: User) {
    return building.owner.address.toLowerCase() === connectedUser?.address && !building.isBuyable
}

export function isOwnerBuildingBuyable(building: Building, connectedUser: User): boolean {
    return building.owner.address.toLowerCase() === connectedUser?.address && building.isBuyable
}

export function isOwner(address: string, connectedUser: User) {
    return address.toLowerCase() === connectedUser?.address
}

export function getBuildingNameType(buildingEnum: number): string {
    switch (buildingEnum) {
        case 0: return "Mediterranean Avenue";
        case 1: return "Baltic Avenue";
        case 2: return "Oriental Avenue";
        case 3: return "Vermont Avenue";
        case 4: return "Connecticut Avenue";
        case 5: return "States Avenue";
        case 6: return "Virginia Avenue";
        case 7: return "Tennessee Avenue";
        default: return;
    }
}