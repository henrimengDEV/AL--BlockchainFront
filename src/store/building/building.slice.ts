import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Building} from "./building.model";
import {CHINOISERIZ, KRAPX, KRFT} from "../user/user.model";
import {getPolyFactory} from "../../contract";
import {convertBigNumberToNumber, getBuildingNameType} from "../../components/shared/file-utils";

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
        setBuildings(state, action: PayloadAction<Building[]>) {
            console.log('setBuildings')
            console.table(action.payload)
            return {
                ...state,
                entities: action.payload
            }
        },

        updateBuilding(state, action: PayloadAction<Building>) {
            const index = state.entities.findIndex(state => state.name === action.payload.name)
            state.entities[index] = action.payload
        },

        createBuilding(state, action: PayloadAction<Building>) {
            getPolyFactory().then(({contract: contract}) => {
                if (!contract) {
                    console.log("contract is null")
                    return;
                }

                const newBuilding: Building = action.payload

                console.log(newBuilding)

                contract.createUniqueNFT("Baltic_Avenue", 0)
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBuildings.fulfilled, (state, action) => {
            state.entities = action.payload
        })
    }
})

export const getBuildings = createAsyncThunk(
    'building/getBuildings',
    async () => {
        return await getPolyFactory().then(({contract}) => {
            if (!contract) {
                console.log("contract is null")
                return;
            }

            return contract.getBuildings().then((result) => {

                const newState = result.map(item => {
                    const building: Building = {
                        id: convertBigNumberToNumber(item.buildingId),
                        name: getBuildingNameType(item.nameType) || 'name',
                        price: convertBigNumberToNumber(item.price) || 1,
                        owner: {username: 'foo', address: item.owner} || null,
                        isBuyable: item.isBuyable || false,
                        lastUpdateDate: item.lastUpdateDate || 'lastUpdateDate',
                    }

                    return building
                })

                console.log(newState)

                return newState
            })
        })
    }
)

export const {addBuilding, setBuildings, updateBuilding, createBuilding} = buildingSlice.actions
export default buildingSlice.reducer