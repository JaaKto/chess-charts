import React from "react"
import { useState } from "react"
import * as S from "./HomePage.styles"
import { Search } from "../Search"
import { RatingHistoryChart } from "components/RatingHistoryChart"
import { fakeData } from "./"
import { parsePoints } from "common/utils"
import { Player } from "components/Search/types"

export const HomePage: React.FC = () => {
  const [players, setPlayers] = useState<Player[] | unknown>([])
  const points = fakeData[0].points.map((item) => parsePoints(item))

  return (
    <S.HomePage>
      <S.HeaderContainer>
        <S.ChessPiece src="../assets/chess.png" alt="chess-piece" />
        <S.HeaderText>Chess-charts</S.HeaderText>
      </S.HeaderContainer>

      <Search {...{ setPlayers }} />

      <S.MainWrapper>
        <RatingHistoryChart points={points} />
      </S.MainWrapper>
    </S.HomePage>
  )
}
