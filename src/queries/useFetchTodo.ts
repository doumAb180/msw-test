import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import type * as types from '../types';


const fetchTodo = (id: number) => (
  axios.get<types.Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`)
);

const useFetchTodo = (id: number) => (
  useQuery<types.Todo>({
    queryKey: ['todo', id],
    queryFn: async () => {
      const { data } = await fetchTodo(id);

      return data;
    },
  })
);

export default useFetchTodo;
