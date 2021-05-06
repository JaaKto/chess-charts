import { createGlobalStyle } from "styled-components"
import { normalize } from "styled-normalize"

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    body {
    font-family: "Roboto", sans-serif;
  }
`
