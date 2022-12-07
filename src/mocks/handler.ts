import { rest } from 'msw';

import * as types from '../types';

const getTodos = rest.get('https://jsonplaceholder.foo.typicode.com/todos', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.delay(1000),
    ctx.json([{
      userId: 1,
      id: 1,
      title: 'MSW-TEST',
      completed: true,
    }]),
  );
});

const getMyTodos = rest.get('https://jsonplaceholder.typicode.com/todos', async (req, res, ctx) => {
  const originResponse = await ctx.fetch(req);

  const originData: types.Todo[]  = await originResponse.json();

  const myData = originData
    .slice(0, 10)
    .map(item => ({
      ...item,
      username: 'tester',
    }));

  return res(
    ctx.status(200),
    ctx.delay(500),
    ctx.json(myData),
  );
});

const getTodo = rest.get('https://jsonplaceholder.typicode.com/todos/:todo', async (req, res, ctx) => {
  const originResponse = await ctx.fetch(req);

  const originData: types.Todo = await (originResponse.json());

  return res(
    ctx.status(200),
    ctx.delay(1000),
    ctx.json({
      ...originData,
      id: Number(req.params.todo) + 10,
    }),
  );
});

const putTodo = rest.put('https://jsonplaceholder.typicode.com/todo', async (req, res, ctx) => {
  const { request } = await req.json();

  return res(
    ctx.status(200),
    ctx.delay(1500),
    ctx.json({
      userId: 1,
      id: 1,
      title: request,
      completed: true,
    }),
  );
});

export const handlers = [
  // getTodos,
  // getMyTodos,
  // getTodo,
  putTodo,
];