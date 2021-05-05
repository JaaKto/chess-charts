import React from "react"
import { HomePage } from "components/HomePage"
import GlobalStyle from "globalStyle"

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <HomePage />
    </React.Fragment>
  )
}

export default App
