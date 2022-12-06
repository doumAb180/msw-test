import React from 'react';
import { useFetchTodos, useFetchTodo } from './queries';

function App() {
  const { data: todos } = useFetchTodos();
  const { data: todo } = useFetchTodo(10);

  return (
    <>
      <h2>TODOS</h2>
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

      <div>
        <h2>TODO</h2>
        <p>ID: {todo?.id}</p>
        <p>Title: {todo?.title}</p>
      </div>
    </>
  );
}

export default App;
