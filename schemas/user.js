const responseUser = {
  type: 'object',
  required: ['token'],
  properties: {
    token: { type: 'string' },
  },
};

const userSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: responseUser,
    },
  },
};

const updateSchema = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      email: { format: 'email' },
      name: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      required: ['id', 'username', 'email', 'name'],
      properties: {
        id: { type: 'number' },
        username: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
      },
    },
  },
};

const userResponse = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number' },
    username: { type: 'string' },
    email: { type: 'string' },
    name: { type: 'string' },
    role: { type: 'string' },
  },
};

const userParams = {
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: {
    id: {
      type: 'number',
    },
  },
};

const userBody = {
  type: 'object',
  required: ['username'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
    name: { type: 'string' },
    role: { type: 'string' },
  },
};

const create = {
  schema: {
    body: {
      ...userBody,
      required: ['username', 'password'],
    },
    response: {
      200: userResponse,
    },
  },
};

const list = {
  schema: {
    response: {
      200: {
        type: 'object',
        required: ['results', 'total'],
        properties: {
          results: {
            type: 'array',
            items: userResponse,
          },
          total: { type: 'number' },
        },
      },
    },
  },
};

const one = {
  schema: {
    params: userParams,
    response: {
      200: userResponse,
    },
  },
};

const update = {
  schema: {
    params: userParams,
    body: userBody,
    response: {
      200: userResponse,
    },
  },
};

const remove = {
  schema: {
    params: userParams,
  },
};

const many = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: userResponse,
      },
    },
  },
};

module.exports = {
  userSchema,
  updateSchema,
  responseUser,

  create,
  list,
  one,
  update,
  remove,
  many,
};
