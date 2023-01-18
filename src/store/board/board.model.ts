export interface Board {
    id?: number
    name: string
    blind: number
    buyIn: number
}

interface PlayerState {
    position: number
    userAddress: string
}