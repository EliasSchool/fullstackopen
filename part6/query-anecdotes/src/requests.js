import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAncedotes = () =>  {
  return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = (content) => {
  return axios.post(baseUrl, { content, votes: 0 }).then(res => res.data)
}

export const update = (newObject) => {
  console.log(newObject)
  return axios.put(`${baseUrl}/${newObject.id}`, newObject).then(res => res.data)
}


