import { rest } from 'msw';

const getUserList = rest.get('/user', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      name: 'kim',
    }),
  );
});

export const handlers = [
  getUserList,
];