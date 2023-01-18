import {User} from "../user/user.model";

export interface Building {
    id: number
    name: string
    price: number
    owner: User
    isBuyable: boolean
    lastUpdateDate: string
    boardId: number
}

export interface CreateBuildingModel {
    name: string
    boardId: number
}