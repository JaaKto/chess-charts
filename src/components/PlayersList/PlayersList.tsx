import React, { Dispatch, SetStateAction } from "react"
import { Player } from "components/Search/types"
import * as S from "./PlayersList.styles"

type PlayerProps = {
  setPlayers: Dispatch<SetStateAction<Player[]>>
  players: Player[]
}
export const PlayersList: React.FC<PlayerProps> = ({
  players,
  setPlayers,
}: PlayerProps) => {
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
            {player.username}
            <S.Button onClick={() => handleClick(player)}>✖</S.Button>
          </S.ListItem>
        ))}
      </S.List>
    </div>
  )
}
