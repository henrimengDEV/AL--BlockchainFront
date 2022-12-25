import {User} from "../user/user.model";

export interface Offer {
    price: number
    expiration: string
    from: User
}