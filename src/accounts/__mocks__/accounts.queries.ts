import { DefaultDbMock } from '../../testing.utils/dbMock';
import { HashedCredentials, User, UserData, UserId } from '../accounts.types';

const db = new DefaultDbMock<
  User, 
  HashedCredentials & UserData, 
  UserData
>();

export const __setDbData = db.__setDbData;

export async function getUserById(id: number): Promise<User[]> {
  return await db.selectMany((user) => user.id === id);
}

export async function getUserByEmail(email: string): Promise<User[]> {
  return await db.selectMany((user) => user.email === email);
}

export async function insertNewUser(user: HashedCredentials & UserData): Promise<UserId> {
  const id = await db.insert(user);
  return { id };
}

export const deleteUserById = db.delete;