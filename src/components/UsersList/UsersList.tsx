import React from "react"
import { useState, ChangeEvent } from "react"
import * as S from "./UsersList.styles"

export const UsersList = () => {
  return (
    <div>
      <S.List>
        <S.ListItem>
          user <S.Button>✖</S.Button>
        </S.ListItem>
      </S.List>
    </div>
  )
}
