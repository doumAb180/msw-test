import { rest } from 'msw';

import type * as types from '../types';

const getTodos = rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.delay(1000),
    ctx.json([{
      "userId": 1,
      "id": 1,
      "title": "MSW-TEST",
      "completed": true,
    }]),
  );
});

const getMyTodos = rest.get('https://jsonplaceholder.typicode.com/todos', async (req, res, ctx) => {
  const originResponse = await ctx.fetch(req);

  const originData: types.Todo[]  = await (originResponse.json());

  const myData = originData
    .slice(0, 10)
    .map(item => ({
      ...item,
      username: 'tester',
    }));

  return res(
    ctx.status(200),
    ctx.delay(1000),
    ctx.json(myData),
  );
});

const getTodo = rest.get('https://jsonplaceholder.typicode.com/todos/:todo', async (req, res, ctx) => {
  const originResponse = await ctx.fetch(req);

  const originData: types.Todo = await (originResponse.json());

  return res(
    ctx.status(200),
    ctx.json({
      ...originData,
      id: Number(req.params.todo),
    }),
  );
});

export const handlers = [
  // getTodos,
  // getMyTodos,
  // getTodo,
];