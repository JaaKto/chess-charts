export interface RawPlayerStats {
  name: string
  points: RawPoints[]
}

export interface PlayerStats {
  name: string
  points: Points[]
}

type RawPoints = number[]

export type Points = {
  date: Date
  points: number
}

export const dimentions = {
  width: 1000,
  height: 450,
  chartWidth: 900,
  chartHeight: 400,
  marginLeft: 100,
}

export const maxValue = (data: Points[]): number =>
  Math.max(...data.map((item) => item.points))

export const minValue = (data: Points[]): number =>
  Math.min(...data.map((item) => item.points))
