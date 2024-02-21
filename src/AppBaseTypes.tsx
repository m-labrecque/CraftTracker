export interface Project {
  Name: string
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