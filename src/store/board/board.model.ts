export interface Board {
    id?: number
    name: string
    blind: number
    buyIn: number
    playerStates: PlayerState[]
}

interface PlayerState {
    position: number
    userAddress: string
}