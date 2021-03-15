import React from "react"
import * as S from "./HomePage.styles"
import { RatingHistoryChart } from "components/RatingHistoryChart"
import { fakeData } from "components/RatingHistoryChart"

export const HomePage: React.FC = () => {
  return (
    <S.HomePage>
      <S.HeaderContainer>
        <S.ChessPiece src="../assets/chess.png" alt="chess-piece" />
        <S.HeaderText>Chess-charts</S.HeaderText>
      </S.HeaderContainer>
      <S.MainWrapper>
        <RatingHistoryChart />
      </S.MainWrapper>
    </S.HomePage>
  )
}
