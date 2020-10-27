import crypto from 'crypto';
import config from 'config';
const hash: { iterations: number, length: number } = config.get('crypto');
const salt: { length: number } = config.get('salt');


export const checkPassword = (
  inputPassword: string,
  passwordFromDb: string,
  salt: string
): boolean => {
  if (!inputPassword || !passwordFromDb) return false;
  return (
    crypto
      .pbkdf2Sync(inputPassword, salt, hash.iterations, hash.length, 'sha1')
      .toString('base64') === passwordFromDb
  );
};

export const genSalt = (): string => crypto
  .randomBytes(salt.length)
  .toString('base64');

export const genHash = (password: string, salt: string): string => crypto
  .pbkdf2Sync(password, salt, hash.iterations, hash.length, 'sha1')
  .toString('base64');

