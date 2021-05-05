import styled from "styled-components"

export const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0 50px;
  margin: 0;
`
export const ListItem = styled.li`
  font-size: 20px;
  border: 2px solid #bf811d;
  border-radius: 5px;
  padding: 5px 10px;
  color: #bababa;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`
export const Button = styled.button`
  border: none;
  background: none;
  color: #bababa;
  padding: 0 0 0 5px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`
