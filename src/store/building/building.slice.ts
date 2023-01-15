import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Building, CreateBuildingModel} from "./building.model";
import {getContractPolyFactory} from "../../contract";
import {convertBigNumberToNumber, getBuildingNameType, getErrorMessage} from "../../components/shared/file-utils";


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
        updateBuilding(state, action: PayloadAction<Building>) {
            const index = state.entities.findIndex(state => state.name === action.payload.name)
            state.entities[index] = action.payload
        },
        createBuilding(_, action: PayloadAction<{ building: CreateBuildingModel, onError: (error: string) => void }>) {
            getContractPolyFactory().then(({contract: contract}) => {
                if (!contract) {
                    console.error("contract is null")
                    return;
                }

                const newBuilding: CreateBuildingModel = action.payload.building
                contract.createUniqueNFT(newBuilding.name, newBuilding.boardId)
                    .then(
                        res => {
                        },
                        err => {
                            action.payload.onError(getErrorMessage(err))
                        }
                    )
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
                console.error("contract is null")
                return;
            }

            return contract.getBuildings().then((result) => {

                const newState = result.map(item => {
                    const building: Building = {
                        id: convertBigNumberToNumber(item.buildingId),
                        name: getBuildingNameType(item.nameType),
                        price: convertBigNumberToNumber(item.price),
                        owner: {username: 'foo', address: item.owner} || null,
                        isBuyable: item.isBuyable || false,
                        lastUpdateDate: item.lastUpdateDate || 'lastUpdateDate',
                        borderId: convertBigNumberToNumber(item.boardId)
                    }

                    return building
                })

                return newState
            })
        })
    }
)

export const {getBuildingById, updateBuilding, createBuilding} = buildingSlice.actions
export default buildingSlice.reducer