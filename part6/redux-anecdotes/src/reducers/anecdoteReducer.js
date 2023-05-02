
import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';



const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: { anecdotes: [] },
  reducers: {
    initAnecdotes: (state, action) => {
      state.anecdotes = action.payload;
    },
    addAnecdote: (state, action) => {
      state.anecdotes.push(action.payload);
    },
    vote: (state, action) => {
      const id = action.payload.id
      console.log(id)
      const anecdoteToVote = state.anecdotes.find((a) => a.id === id)
      console.log(anecdoteToVote)
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      const updatedAnecdotes = state.anecdotes.map((a) =>
        a.id === id ? updatedAnecdote : a
      )
      return {
        ...state,
        anecdotes: updatedAnecdotes,
      }
    }
  }
});

export const { initAnecdotes, addAnecdote, vote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;


export const initializeAncedotes = () => {
  return async dispatch => {
    const ancedotes = await anecdoteService.getAll()
    dispatch(initAnecdotes(ancedotes))
  }
}


export const createAncedote = (content) => {
  return async dispatch => {
    const ancedotes = await anecdoteService.createNew(content)
    dispatch(addAnecdote(ancedotes))
  }
}

export const voteAncedote = (content) => {
  return async dispatch => {
    console.log(content)
    const newObject = {
      content: content.content,
      votes: content.votes + 1 ,
    }
    console.log(content.id)
    const ancedotes = await anecdoteService.update(content.id,newObject)
    dispatch(vote(ancedotes))
  }
}
