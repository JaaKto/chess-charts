export type Blitz = {
  games: number
  rating: number
  rd: number
  prog: number
  prov: boolean
}

export type Bullet = {
  games: number
  rating: number
  rd: number
  prog: number
  prov: boolean
}

export type Correspondence = {
  games: number
  rating: number
  rd: number
  prog: number
  prov: boolean
}

export type Classical = {
  games: number
  rating: number
  rd: number
  prog: number
  prov: boolean
}

export type Rapid = {
  games: number
  rating: number
  rd: number
  prog: number
  prov: boolean
}

export type PlayTime = {
  total: number
  tv: number
}

export type Count = {
  all: number
  rated: number
  ai: number
  draw: number
  drawH: number
  loss: number
  lossH: number
  win: number
  winH: number
  bookmark: number
  playing: number
  import: number
  me: number
}

export type Player = {
  id: string
  username: string
  online: boolean
  perfs: {
    blitz: Blitz
    bullet: Bullet
    correspondence: Correspondence
    classical: Classical
    rapid: Rapid
  }
  createdAt: number
  seenAt: number
  playTime: PlayTime
  language: string
  url: string
  nbFollowing: number
  nbFollowers: number
  count: Count
  followable: boolean
  following: boolean
  blocking: boolean
  followsYou: boolean
}
