import { voteAncedote } from '../reducers/anecdoteReducer';
import { useSelector, useDispatch } from 'react-redux';
import {displayNotification } from '../reducers/notificationReducer';


const AncedoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes.anecdotes);
  const filter = useSelector(state => state.filter);
  
  console.log("filter" ,filter)


  const voting = (anecdote) => {
    dispatch(displayNotification(`You voted on ${anecdote.content}`, 5))
    dispatch(voteAncedote(anecdote))
  };

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voting(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
    )
}


export default AncedoteList;