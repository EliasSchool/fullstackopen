import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQueryClient ,useMutation, useQuery } from 'react-query'
import { useContext } from 'react'
import { getAncedotes, update } from './requests'
import anecdoteContext from './anecdoteContext'
const App = () => {


  const queryClient = useQueryClient()

  const result = useQuery(
    'anecdotes', getAncedotes,
    {
      retry: 1
    }
  )

  const [message, messageDispatch] = useContext(anecdoteContext)
  const updateAncedoteMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  const handleVote = (anecdote) => {
    messageDispatch({type: "NOTIF", payload: "you voted for " + anecdote.content})
    updateAncedoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }


  console.log(result)
  
  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  console.log(anecdotes)
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
