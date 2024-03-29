import 'cross-fetch/polyfill';
import { request } from '../test-utils/requestClient';
const utils = require('../utils');

const userData = {};

describe('Should test admin account', () => {
  it('should be able to login as admin', async () => {
    const query = `
    mutation {
      login(email: "admin@email.com", password:"password") {
        __typename
          ... on User {
          user_id
          first_name
          last_name
          email
          roles
          permissions
          token
          creation_date
          last_login
          error
          }
          ... on BadUserCredsError {
              message
          }
        }
      }
    `;

    const { data } = await request(query);
    expect(data).toBeDefined();
    userData.token = data.login.token;
  });

  it('should be able to get users as admin', async () => {
    const query = `
      query {
        users {
          user_id
          first_name
          last_name
          email
          roles
          permissions
          creation_date
          last_login
        }
      }
    `;

    const { data } = await request(query, userData.token);

    expect(data.users).toBeDefined();
    expect(data.users.length).toBeGreaterThan(1);
  });

  it('should be able to get a user as admin', async () => {
    const query = `
      query {
        user (user_id: "2") {
          user_id
          first_name
          last_name
          email
          roles
          permissions
        }
      }
    `;

    const { data } = await request(query, userData.token);

    expect(data.user).toBeDefined();
    expect(data.user.user_id).toEqual('2');
    expect(data.user.first_name).toBeDefined();
    expect(data.user.last_name).toBeDefined();
    expect(data.user.email).toEqual('user@email.com');
    expect(data.user.roles).toEqual('["USER"]');
    expect(data.user.permissions).toEqual('["read:own_account"]');
  });

  it('should be able to create a user as admin', async () => {
    const query = `
    mutation {
      addUser (
        email: "${utils.getRandomCode()}@email.com",
        first_name: "New", 
        last_name: "User",
        password: "password",
        enabled: true
        ) {
        __typename
        ... on User {
            user_id
            first_name
            last_name
            email
            roles
            permissions
            token
            creation_date
            last_login
        }
        ... on UserExists {
            message
        }
      }
    }
    `;

    const res = await request(query, userData.token);

    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    expect(res.data.addUser).toBeDefined();
    expect(res.data.addUser.user_id).toBeDefined();
    userData.createdUserId = res.data.addUser.user_id;
  });
  it('should be able to update a user as admin', async () => {
    const query = `
    mutation {
      updateUser (user_id: "${userData.createdUserId}", first_name: "Updated First Name", last_name: "Updated Last Name") {
        user_id
        first_name
        last_name
        email
        roles
        permissions
      }
    }
    `;

    const res = await request(query, userData.token);

    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    expect(res.data.updateUser).toBeDefined();
    expect(res.data.updateUser.first_name).toEqual('Updated First Name');
    expect(res.data.updateUser.last_name).toEqual('Updated Last Name');
  });
  it('should be able to delete created user as admin', async () => {
    const query = `
    mutation {
      removeUser (user_id: "${userData.createdUserId}") {
        user_id
      }
    }
    `;

    const res = await request(query, userData.token);

    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    expect(res.data.removeUser).toBeDefined();
    expect(res.data.removeUser.user_id).toEqual(userData.createdUserId);
  });
});
