import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Building} from "./building.model";
import {CHINOISERIZ, KRAPX, KRFT} from "../user/user.model";

const todayAsString: string = new Date().toString();

interface BuildingState {
    entities: Building[]
}

const initialState: BuildingState = {
    entities: [
        {name: 'building_1', price: 1, owner: CHINOISERIZ, isBuyable: true, lastUpdateDate: todayAsString},
        {name: 'building_2', price: 3, owner: KRFT, isBuyable: false, lastUpdateDate: todayAsString},
        {name: 'building_3', price: 2, owner: KRAPX, isBuyable: true, lastUpdateDate: todayAsString},
        {name: 'building_4', price: 10, owner: CHINOISERIZ, isBuyable: false, lastUpdateDate: todayAsString}
    ]
}

const buildingSlice = createSlice({
    name: "building",
    initialState,
    reducers: {
        addBuilding(state, action: PayloadAction<Building>) {
            state.entities.push(action.payload)
        },
        updateBuilding(state, action: PayloadAction<Building>) {
            const index = state.entities.findIndex(state => state.name === action.payload.name)
            state.entities[index] = action.payload
        }
    }
})

export const {addBuilding, updateBuilding} = buildingSlice.actions
export default buildingSlice.reducer