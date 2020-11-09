import { createAndUpdateTokens } from '../tokens';
import * as queries from './accounts.queries';
import { checkPassword, genSalt, genHash } from '../utils/passwords';
import { Credentials, UserData, UserId } from './accounts.types';


export class AccountsServices {
  static async signIn({ password, email }: Credentials): Promise<{ user: UserData & UserId, accessToken: string, refreshToken: string }> {
    const [user] = await queries.getUserByEmail(email);
    if (!user || !checkPassword(password, user.password, user.salt)) {
      throw new Error('Email or password is incorrect');
    }

    const { accessToken, refreshToken } = await createAndUpdateTokens(user.id);
    const { id, firstName, lastName, role } = user;
    return {
      user: {
        id,
        firstName,
        lastName,
        role,
      },
      accessToken,
      refreshToken,
    }
  }

  static async signUp({ email, password, ...rest }: UserData & Credentials): Promise<void> {
    const [user] = await queries.getUserByEmail(email);
    if (user) {
      throw new Error('User with this email already exist');
    }

    const salt = genSalt();
    const passwordHash = genHash(password, salt);
    await queries.insertNewUser({
      password: passwordHash,
      email,
      salt,
      ...rest,
    });
  }

  static async profile({ id }: UserId): Promise<UserData> {
    const [{ password, salt, ...rest }] = await queries.getUserById(id);
    return rest;
  }

  static async deleteProfile({ id }: UserId): Promise<void> {
    await queries.deleteUserById(id);
  }
}
