const TABLE = 'users';

exports.seed = (knex) => {
  return knex(TABLE)
    .del()
    .then(() => {
      // Inserts seed entries
      return knex(TABLE)
        .insert([
          {
            username: 'superadmin',
            password:
              '$2y$10$TAjBBYht816aMzYU/bocMeCbexepOm.0rzoYoFkJ1FklfD1/U0yL2', // SuperAdminP@ssW0rd
            email: 'admin@novele.com',
            name: 'Superadmin',
            role: 'admin',
          },
          {
            username: 'user',
            password:
              '$2y$10$TAjBBYht816aMzYU/bocMeCbexepOm.0rzoYoFkJ1FklfD1/U0yL2', // SuperAdminP@ssW0rd
            email: 'user@novele.com',
            name: 'User',
            role: 'user',
          },
        ])
        .then(() => {
          return knex.raw(
            'SELECT setval(\'users_id_seq\', (SELECT MAX(id) from "users"));'
          );
        });
    });
};
