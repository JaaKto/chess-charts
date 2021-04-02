import React from "react"
import { useState, ChangeEvent } from "react"
import * as S from "./Search.styles"
import { fetchData } from "common/utils"
import { Player } from "./types"

export const Search: React.FC = () => {
  const [result, setResult] = useState<Player[] | unknown>([])
  const [value, setValue] = useState<string>("")
  const url = `${process.env.REACT_APP_API}`

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(value)
    fetchData(`${url}/user/${value}`)
      .then((response: Player | unknown) => {
        console.log(response)
        setResult(response)
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
