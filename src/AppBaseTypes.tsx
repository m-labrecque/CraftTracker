export interface Project {
  Name: string
  // mainCounter: MainCounter
  // otherCounters: Counter[]
}

export interface MainCounter {
  // count: Integer
  Children: Counter[]
}

export interface Counter {
  Name: string
  // count: Integer
  LinkedToGlobal: boolean
  // resetAt: Integer
}