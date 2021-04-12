import { Player } from "components/Search/types"
import React from "react"
import { useState, ChangeEvent } from "react"
import * as S from "./PlayersList.styles"

type PlayerProps = {
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
  players: Player[]
}

export const PlayersList = ({ players, setPlayers }: PlayerProps) => {
  const handleClick = (chosenPlayer: Player) => {
    const filteredPlayers = players.filter(
      (player) => player.id !== chosenPlayer.id,
    )
    setPlayers(filteredPlayers)
  }

  return (
    <div>
      <S.List>
        {players.map((player: Player) => (
          <S.ListItem key={player.id}>
            {player.username}{" "}
            <S.Button onClick={() => handleClick(player)}>✖</S.Button>
          </S.ListItem>
        ))}
      </S.List>
    </div>
  )
}
