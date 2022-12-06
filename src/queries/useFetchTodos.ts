import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import type * as types from '../types';

type MyTodos = (types.Todo & { username: string })[];


const fetchTodos = () => (
  axios.get<MyTodos>('https://jsonplaceholder.typicode.com/todos')
);

const useFetchTodos = () => (
  useQuery<MyTodos>({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await fetchTodos();

      return data;
    },
  })
);

export default useFetchTodos;
