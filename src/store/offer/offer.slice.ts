import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ADMIN, CHINOISERIZ} from "../user/user.model";
import {Offer} from "./offer.model";

interface OfferState {
    entities: Offer[]
}

const initialState: OfferState = {
    entities: [
        {price: 0.06, expiration: Date.now().toString(), from: ADMIN},
        {price: 0.06, expiration: Date.now().toString(), from: ADMIN},
        {price: 0.06, expiration: Date.now().toString(), from: ADMIN},
        {price: 0.06, expiration: Date.now().toString(), from: CHINOISERIZ},
        {price: 0.06, expiration: Date.now().toString(), from: ADMIN},
        {price: 0.06, expiration: Date.now().toString(), from: ADMIN},
        {price: 0.06, expiration: Date.now().toString(), from: ADMIN},
        {price: 0.06, expiration: Date.now().toString(), from: ADMIN},
        {price: 0.06, expiration: Date.now().toString(), from: ADMIN},
    ]
}

const offerSlice = createSlice({
    name: "offer",
    initialState,
    reducers: {
        addOffer(state, action: PayloadAction<Offer>) {
            state.entities.push(action.payload)
        }
    }
})

export const {addOffer} = offerSlice.actions
export default offerSlice.reducer