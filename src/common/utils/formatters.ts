export const parsePoints = ([y, m, d, p]: number[]): {
  date: Date
  points: number
} => {
  return { date: new Date(`${y}-${m}-${d}`), points: p }
}
