import React, {
  useState,
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
  setError: Dispatch<SetStateAction<boolean>>
}

export const Search: React.FC<PlayerProps> = ({
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
    !!search &&
      fetchData(`${url}/user/${search}`)
        .then((response) => {
          setPlayers([...players, response] as Player[])
        })
        .catch(() => setError(true))
        .finally(() => setSearch(""))
  }

  return (
    <S.SearchContainer>
      <S.Form onSubmit={handleSubmit}>
        <S.Input value={search} onChange={handleChange} type="text"></S.Input>
        <S.Button type="submit">Search</S.Button>
      </S.Form>
    </S.SearchContainer>
  )
}
