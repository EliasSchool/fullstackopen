import { useDispatch } from 'react-redux';
import { createAncedote } from '../reducers/anecdoteReducer';
import {displayNotification } from '../reducers/notificationReducer';
const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const addAnecdotes = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(displayNotification(`You added ${content}`, 5))
    dispatch(createAncedote(content))
  }
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm