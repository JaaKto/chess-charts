import React, { useEffect, MouseEvent, Dispatch, SetStateAction } from "react"
import * as S from "./Snackbar.styles"

type SnackbarProps = {
  setError: Dispatch<SetStateAction<boolean>>
  message: string
  error: boolean
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  setError,
  error,
}: SnackbarProps) => {
  useEffect(() => {
    if (error) {
      setTimeout(function () {
        setError(false)
      }, 4000)
    }
  })

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setError(false)
  }

  if (error) {
    return (
      <S.SnackbarContainer>
        <S.Button onClick={handleClick}>✖</S.Button>
        {message}
      </S.SnackbarContainer>
    )
  } else {
    return null
  }
}
