const fastify = require('../../../index');

const user = {
  username: 'superadmin',
  password: '$2y$10$TAjBBYht816aMzYU/bocMeCbexepOm.0rzoYoFkJ1FklfD1/U0yL2', // SuperAdminP@ssW0rd
  email: 'admin@novele.com',
  name: 'Superadmin',
  role: 'admin',
};

const newUser = {
  username: 'test',
  password: '123123',
  email: 'test@test.com',
  name: 'Test user',
  role: 'user',
};

const updateUser = {
  username: 'test1',
  password: '123123',
  email: 'test1@test.com',
  name: 'Test user1',
  role: 'admin',
};

let token, userId;

describe('Tests for the user', () => {
  beforeAll(async () => {
    await fastify.ready();

    token = fastify.jwt.sign({
      payload: user,
    });
  });

  test('Should receive an error 401', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/admin/users',
      payload: newUser,
    });
    const res = JSON.parse(response.payload);
    expect(response.statusCode).toBe(401);
    expect(res.message).toBe('No Authorization was found in request.headers');

    done();
  });

  test('Should get an error 400', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/admin/users',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = JSON.parse(response.payload);
    expect(response.statusCode).toBe(400);
    expect(res.message).toBe('body should be object');
    done();
  });

  test('Should create a new user', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/admin/users',
      payload: newUser,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = JSON.parse(response.payload);
    userId = res.id;
    delete newUser.password;
    expect(response.statusCode).toBe(200);
    expect(res).toEqual({
      ...newUser,
      id: expect.any(Number),
    });

    done();
  });

  test('Should receive an error 500', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/admin/users',
      payload: {
        ...newUser,
        password: 123123,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = JSON.parse(response.payload);
    expect(response.statusCode).toBe(500);

    done();
  });

  test('Should get the user by id', async (done) => {
    const response = await fastify.inject({
      method: 'GET',
      url: `/admin/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = JSON.parse(response.payload);
    expect(response.statusCode).toBe(200);
    expect(res).toEqual({
      ...newUser,
      id: expect.any(Number),
    });

    done();
  });

  test('Should update the user', async (done) => {
    const response = await fastify.inject({
      method: 'PUT',
      url: `/admin/users/${userId}`,
      payload: updateUser,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = JSON.parse(response.payload);
    userId = res.id;
    delete updateUser.password;
    expect(response.statusCode).toBe(200);
    expect(res).toEqual({
      ...updateUser,
      id: userId,
    });

    done();
  });

  test('Should get users', async (done) => {
    const response = await fastify.inject({
      method: 'GET',
      url: `/admin/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = JSON.parse(response.payload);
    expect(response.statusCode).toBe(200);
    expect(res).toEqual({
      total: expect.any(Number),
      results: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          username: expect.any(String),
          email: expect.any(String),
          name: expect.any(String),
          role: expect.any(String),
        }),
      ])
    });

    done();
  });

  test('Should remove the user', async (done) => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: `/admin/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.statusCode).toBe(200);

    done();
  });

});
