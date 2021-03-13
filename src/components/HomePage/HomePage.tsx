import React from "react"
import * as S from "./HomePage.styles"
import { Search } from "../Search"

export const HomePage: React.FC = () => {
  return (
    <S.HomePage>
      <S.HeaderContainer>
        <S.ChessPiece src="../assets/chess.png" alt="chess-piece" />
        <S.HeaderText>Chess-charts</S.HeaderText>
      </S.HeaderContainer>
      <S.MainContainer>
        <Search />
      </S.MainContainer>
    </S.HomePage>
  )
}
