import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import type * as types from '../types';

// getTodos
// type Todos = types.Todo[];

// getMyTodos
type Todos = (types.Todo & { username: string })[];


const fetchTodos = () => (
  // axios.get<Todos>('https://jsonplaceholder.foo.typicode.com/todos')
  axios.get<Todos>('https://jsonplaceholder.typicode.com/todos')
);

const useFetchTodos = () => (
  useQuery<Todos>({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await fetchTodos();

      return data;
    },
  })
);

export default useFetchTodos;
