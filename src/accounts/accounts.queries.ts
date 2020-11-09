import { getInsertClauses, getSelectClause } from '../libs/db/typeMapping';
import { query } from '../libs/db';
import { HashedCredentials, User, UserData, UserId } from './accounts.types';

const userProps = {
  email: {},
  firstName: { dbAlias: 'first_name' },
  lastName: { dbAlias: 'last_name' },
  role: {},
  password: {},
  salt: {},
};

export async function getUserById(id: number): Promise<User[]> {
  const selectClause = getSelectClause({ ...userProps, id: {} });
  return (await query(`SELECT ${selectClause} FROM "User" WHERE id = $1`, [id])).rows;
}

export async function getUserByEmail(email: string): Promise<User[]> {
  const selectClause = getSelectClause({ ...userProps, id: {} });
  return (await query(`SELECT ${selectClause} FROM "User" WHERE email = $1`, [email])).rows;
}

export async function insertNewUser(user: HashedCredentials & UserData): Promise<UserId> {
  const [props, values, valueIdxs] = getInsertClauses(user, userProps);
  return (await query(`INSERT INTO "User"(${props}) VALUES (${valueIdxs})`, values)).rows[0];
}

export async function deleteUserById(id: number): Promise<void> {
  await query(`
  DELETE FROM "User"
  WHERE id = $1
  `, [id]);
}