import styled from "styled-components"

export const SearchContainer = styled.div`
  display: flex;
  margin: 30px 50px 10px 50px;
`

export const Form = styled.form`
  display: flex;
  width: 100%;
`

export const Input = styled.input`
  font-family: "Roboto", sans-serif;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid #bababa;
  border-radius: 5px;
  padding: 10px;
  color: #bababa;
  width: 100%;
  &:focus {
    outline: none;
  }
`
export const Button = styled.button`
  font-family: "Roboto", sans-serif;
  background-color: #bababa;
  color: #161512;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px 20px;
  outline: none;
  margin-left: 2px;
  cursor: pointer;
`
