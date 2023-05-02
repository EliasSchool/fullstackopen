import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AncedoteList from './components/AncedoteList';
import { useDispatch } from 'react-redux'
import Filter from './components/Filter';
import Notification from './components/Notification';
import { initializeAncedotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAncedotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AncedoteList/>
      <AnecdoteForm/>
    </div>
  );
};

export default App
