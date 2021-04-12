import { Player } from "components/Search/types"
import React from "react"
import { useState, ChangeEvent } from "react"
import * as S from "./UsersList.styles"

export const UsersList = ({ players }: { players: Player[] }) => {
  return (
    <div>
      <S.List>
        {players.map(({ player }) => (
          <S.ListItem key={player.id}>
            {player.username} <S.Button>✖</S.Button>
          </S.ListItem>
        ))}
      </S.List>
    </div>
  )
}
