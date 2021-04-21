import React, {
  useState,
  FC,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react"
import * as S from "./Search.styles"
import { fetchData } from "common/utils"
import { Player } from "./types"

type PlayerProps = {
  players: Player[]
  setPlayers: Dispatch<SetStateAction<Player[]>>
  setError: Dispatch<SetStateAction<string | undefined>>
}

export const Search: FC<PlayerProps> = ({
  players,
  setPlayers,
  setError,
}: PlayerProps) => {
  const [search, setSearch] = useState<string>("")
  const url = `${process.env.REACT_APP_API}`

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    fetchData(`${url}/user/${search}`)
      .then((response) => {
        setPlayers([...players, response] as Player[])
        setSearch("")
      })
      .catch((err) => setError(err))
  }

  return (
    <S.SearchContainer>
      <S.Form onSubmit={handleSubmit}>
        <S.Input value={search} onChange={handleChange} type="text"></S.Input>
        <S.Button>Search</S.Button>
      </S.Form>
    </S.SearchContainer>
  )
}
