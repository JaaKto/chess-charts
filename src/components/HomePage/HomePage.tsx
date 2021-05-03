import React, { useState } from "react"
import * as S from "./HomePage.styles"
import { Search } from "../Search"
import { Snackbar } from "../Snackbar"
import { RatingHistoryChart } from "components/RatingHistoryChart"
import { fakeData } from "."
import { parsePoints } from "common/utils"
import { Player } from "components/Search/types"
import { PlayersList } from "components/PlayersList"

export const HomePage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [error, setError] = useState<boolean>(false)
  const points = fakeData[0].points.map((item) => parsePoints(item))
  const userNotFoundMessage = "User not found"

  return (
    <S.HomePage>
      <S.HeaderContainer>
        <S.ChessPiece src="../assets/chess.png" alt="chess-piece" />
        <S.HeaderText>Chess-charts</S.HeaderText>
      </S.HeaderContainer>
      <Search {...{ players, setPlayers, setError }} />
      <PlayersList {...{ players, setPlayers }} />
      <Snackbar message={userNotFoundMessage} {...{ error, setError }} />
      <S.MainContainer>
        <RatingHistoryChart points={points} />
      </S.MainContainer>
    </S.HomePage>
  )
}
