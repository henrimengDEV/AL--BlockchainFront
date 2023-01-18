export interface Coinpoly {
    boardId: number
    playerStates: PlayerState[]
}

export interface PlayerState {
    userAddress: string
    position: number
}