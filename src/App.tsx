import React from 'react';
import { useFetchTodos } from './queries';

function App() {
  const { data: todos } = useFetchTodos();

  return (
    <ul>
      {todos?.map(todo => (
        <li key={todo.id}>
          <p>Title: {todo.title}</p>
          {/* <p>Username: {todo.username}</p> */}
          <input
            type='checkbox'
            defaultChecked={todo.completed}
          />
        </li>
      ))}
    </ul>
  );
}

export default App;
