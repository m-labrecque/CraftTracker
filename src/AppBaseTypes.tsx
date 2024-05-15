export interface Project {
  name: string
  mainCounterCount: number
  multiPiece: boolean
}

export interface Piece {
  name: string
  mainCounterCount: number
}

export interface MainCounter {
  count: number
  children: Counter[]
}

export interface Counter {
  name: string
  count: number
  linkedToGlobal: boolean
  doesReset: boolean
  resetAt: number
  doesInterval: boolean
  increaseInterval: number
  sinceLastIncrease: number
}