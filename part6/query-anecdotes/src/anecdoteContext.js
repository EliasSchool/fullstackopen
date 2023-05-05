import { createContext, useReducer } from 'react'


const anecdoteReducer = (state, action) => {
  switch (action.type)  {
    case "NOTIF": 
      return action.payload
    case "ERROR": 
      return action.payload
    case "CLEARNOTIF": 
      return action.payload
    default: 
      return state
  }
}

const anecdoteContext = createContext()

export const AnecdoteProvider = ({ children }) => {
  const [message, messageDispatch] = useReducer(anecdoteReducer, 0)

  return (
    <anecdoteContext.Provider value={[message, messageDispatch]}>
      {children}
    </anecdoteContext.Provider>
    )
}

export default anecdoteContext