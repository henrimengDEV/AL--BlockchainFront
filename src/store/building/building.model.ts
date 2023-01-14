import {User} from "../user/user.model";

export interface Building {
    id: number
    name: string
    price: number
    owner: User
    isBuyable: boolean
    lastUpdateDate: string
}

export interface CreateBuilding {
    name: string
    price: number
    owner: User
    isBuyable: boolean
    lastUpdateDate: string
}