export interface Project {
  name: string
  mainCounterCount: number
  otherCounters: Counter[]
}

export interface MainCounter {
  count: number
  children: Counter[]
}

export interface Counter {
  name: string
  count: number
  linkedToGlobal: boolean
  resetAt: number
}