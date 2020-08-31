const mockDB = {
  testDict: {},
  add: function (query, result) {
    query.toLowerCase();
    if (this.testDict[query] === undefined) {
      this.testDict[query] = result;
    }
  },
  result: function (query) {
    query.toLowerCase();
    const result =
      this.testDict[query] !== undefined ? this.testDict[query] : null;
    return result;
  },
};

// Login Admin
mockDB.add(
  "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE email = 'admin@email.com' RETURNING *",
  [
    {
      creator_id: '1',
      enabled: true,
      user_id: '1',
      first_name: 'Jane',
      last_name: 'Doe',
      password: '$2b$08$lHBqnA02wwnfSRySTo5K5.GLTFBmJTMHn3TP0FYvrLzMJBVLhGTmO',
      email: 'admin@email.com',
      roles: '["ADMIN"]',
      permissions: '["read:any_account", "read:own_account"]',
      created: '1598486870577',
      last_login: '1598573007553',
    },
  ]
);

// Login User
mockDB.add(
  "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE email = 'user@email.com' RETURNING *",
  [
    {
      creator_id: '1',
      enabled: true,
      user_id: '2',
      first_name: 'John',
      last_name: 'Doe',
      password: '$2b$08$lHBqnA02wwnfSRySTo5K5.GLTFBmJTMHn3TP0FYvrLzMJBVLhGTmO',
      email: 'user@email.com',
      roles: '["USER"]',
      permissions: '["read:own_account"]',
      created: '1598486870577',
      last_login: '1598720000743',
    },
  ]
);

// get Users

mockDB.add(`SELECT * FROM users`, [
  {
    user_id: '2',
    first_name: 'John',
    last_name: 'Doe',
    email: 'user@email.com',
    roles: '["USER"]',
    permissions: '["read:own_account"]',
    created: '1598486870577',
    last_login: '1598720000743',
  },
  {
    user_id: '5',
    first_name: 'Spike',
    last_name: 'Punch',
    email: 'spike.punch@email.com',
    roles: "['USER']",
    permissions: null,
    created: '1598571908952',
    last_login: '1598571908952',
  },
  {
    user_id: '1',
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'admin@email.com',
    roles: '["ADMIN"]',
    permissions: '["read:any_account", "read:own_account"]',
    created: '1598486870577',
    last_login: '1598718908775',
  },
]);
module.exports = mockDB;
