import {User} from "../user/user.model";

export interface Building {
    name: string
    price: number
    owner: User
    isBuyable: boolean
    lastUpdateDate: string
}