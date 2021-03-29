import React from "react"
import { useState, ChangeEvent } from "react"
import * as S from "./Search.styles"
import { fetchData } from "common/utils"
import { Player } from "./types"

export const Search: React.FC = () => {
  const [result, setResult] = useState<Player[]>([])
  const [value, setValue] = useState<string>("")
  const url = `${process.env.REACT_APP_API}`

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleClick = () => {
    console.log(value)
    fetchData(`${url}/user/${value}`)
      .then((response: any) => {
        console.log(response)
        setResult(response)
        setValue("")
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <S.SearchWrapper>
        <S.Input value={value} onChange={handleChange} type="text"></S.Input>
        <S.Button onClick={handleClick}>Search</S.Button>
      </S.SearchWrapper>
    </div>
  )
}
