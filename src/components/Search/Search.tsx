import React from "react"
import { useState, ChangeEvent } from "react"
import * as S from "./Search.styles"
import { fetchData } from "common/utils"
import { Player } from "./types"

type PlayerProps = {
  setPlayers: React.Dispatch<React.SetStateAction<Player | unknown>>
}

export const Search = ({ setPlayers }: PlayerProps) => {
  const [value, setValue] = useState<string>("")
  const url = `${process.env.REACT_APP_API}`

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchData(`${url}/user/${value}`)
      .then((response: Player | unknown) => {
        console.log(response)
        setPlayers(response)
        setValue("")
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <S.SearchWrapper>
        <S.Form onSubmit={handleSubmit}>
          <S.Input value={value} onChange={handleChange} type="text"></S.Input>
          <S.Button>Search</S.Button>
        </S.Form>
      </S.SearchWrapper>
    </div>
  )
}
