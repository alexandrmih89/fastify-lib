'use strict';

const fastify = require('../../index');

const user = {
  login: 'test',
  password: 'test',
};

let id;

describe('Test for the auth', () => {
  afterAll(async () => {
    fastify.close();
  });

  test('Should register a new user', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/register',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      payload: user,
    });

    const res = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(res).toEqual({
      token: expect.any(String),
    });

    done();
  });

  test('Should receive an error', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/register',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      payload: user,
    });

    const res = JSON.parse(response.payload);

    expect(response.statusCode).toBe(403);
    expect(res.message).toBe('User already exists');

    done();
  });
});
