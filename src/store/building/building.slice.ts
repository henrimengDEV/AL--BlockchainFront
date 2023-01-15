import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Building, CreateBuilding} from "./building.model";
import {getContractPolyFactory} from "../../contract";
import {convertBigNumberToNumber, getBuildingNameType} from "../../components/shared/file-utils";


interface BuildingState {
    entities: Building[]
    entity: Building
}

const initialState: BuildingState = {
    entities: [],
    entity: null
}

const buildingSlice = createSlice({
    name: "building",
    initialState,
    reducers: {
        getBuildingById(state, action: PayloadAction<number>) {
            state.entity = state.entities.find(building => building.id === action.payload);
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
        createBuilding(state, action: PayloadAction<CreateBuilding>) {
            getContractPolyFactory().then(({contract: contract}) => {
                if (!contract) {
                    console.log("contract is null")
                    return;
                }

                console.log(action.payload)

                contract.createUniqueNFT("Baltic_Avenue", 0)
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBuildings.fulfilled, (state, action) => {
            state.entities = action.payload
        })
    }
})

export const getAllBuildings = createAsyncThunk(
    'building/getBuildings',
    async () => {
        return await getContractPolyFactory().then(({contract}) => {
            if (!contract) {
                console.log("contract is null")
                return;
            }

            return contract.getBuildings().then((result) => {

                const newState = result.map(item => {
                    console.log(item)

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

export const {getBuildingById, setBuildings, updateBuilding, createBuilding} = buildingSlice.actions
export default buildingSlice.reducer