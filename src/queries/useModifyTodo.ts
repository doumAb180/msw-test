import axios, { AxiosError } from 'axios';

import { useMutation } from '@tanstack/react-query';

import * as types from '../types';


const modifyTodo = (request: string) => (
  axios.put('https://jsonplaceholder.typicode.com/todo', {
    request,
  })
);

const useModifyTodo = () => (
  useMutation<
    types.Todo,
    AxiosError,
    string
  >({
    mutationFn: async (variable) => {
      const { data } = await modifyTodo(variable);

      return data;
    },
  })
);

export default useModifyTodo;
