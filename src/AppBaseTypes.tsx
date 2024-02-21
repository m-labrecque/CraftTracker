export interface Project {
  Name: string
  mainCounter: MainCounter
  otherCounters: Counter[]
}

export interface MainCounter {
  count: number
  Children: Counter[]
}

export interface Counter {
  Name: string
  count: number
  LinkedToGlobal: boolean
  resetAt: number
}