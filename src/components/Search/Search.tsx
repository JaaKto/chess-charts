import React from "react"
import { useState, ChangeEvent } from "react"
import * as S from "./Search.styles"
import { fetchData } from "common/utils"
import { Player } from "./types"

type PlayerProps = {
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
  players: Player[]
}

export const Search = ({ players, setPlayers, setError }: PlayerProps) => {
  const [value, setValue] = useState<string>("")
  const url = `${process.env.REACT_APP_API}`

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchData(`${url}/user/${value}`)
      .then((response: Player) => {
        console.log(response)
        // players => setPlayers([...players, response])
        if (response) {
          setPlayers([...players, response])
          setValue("")
        }
      })
      .catch((err) => setError(err))
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
