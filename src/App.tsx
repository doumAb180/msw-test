import React, { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useFetchTodos, useFetchTodo, useModifyTodo } from './queries';

import type * as types from './types';

const TODO_ID = 11;

function App() {
  const { data: todos } = useFetchTodos();
  const { data: todo } = useFetchTodo(TODO_ID);

  const modifyTodo = useModifyTodo();

  const [inputValue, setInputValue] = useState('');

  const queryClient = useQueryClient();

  const handleChangeInputValue = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  const handleSubmit = () => {
    if (!inputValue) {
      return;
    }

    modifyTodo.mutate(inputValue, {
      onSuccess: (res) => {
        queryClient.setQueryData<types.Todo>(['todo', TODO_ID], () => (res))
      }
    });
  };


  return (
    <>
      {/* <h2>TODOS</h2>
      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>
            <p>Title: {todo.title}</p>
            <p>Username: {todo.username}</p>
            <input
              type='checkbox'
              defaultChecked={todo.completed}
            />
          </li>
        ))}
      </ul> */}

      <div>
        <h2>TODO</h2>
        <p>ID: {todo?.id}</p>
        <p>Title: {todo?.title}</p>
      </div>

      <input
        placeholder='title'
        value={inputValue}
        onChange={handleChangeInputValue}
      />
      <button
        type='button'
        onClick={handleSubmit}
      >
        {modifyTodo.isLoading ? '수정 중.....' : '수정'}
      </button>
    </>
  );
}

export default App;
