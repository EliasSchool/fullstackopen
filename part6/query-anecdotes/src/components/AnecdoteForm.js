import {  useQueryClient ,useMutation } from 'react-query'
import {  createAnecdote } from '../requests'
import { useContext } from 'react'
import anecdoteContext from '../anecdoteContext'
const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const [message, messageDispatch] = useContext(anecdoteContext)
  const newAncedoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      messageDispatch({type: "ERROR", payload: "too short anecdote, must have length 5 or more"})
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    messageDispatch({type: "NOTIF", payload: "you created " + content})    
    newAncedoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
