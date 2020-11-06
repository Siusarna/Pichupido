import { checkPassword, genSalt, genHash } from '../passwords';

describe('passwords check', () => {
  test('check passwords basic flow', () => {
    const password = 'qwerty123!';
    const salt = genSalt();
    const hash = genHash(password, salt);

    expect(checkPassword(password, hash, salt)).toBe(true);

    const wrongPassword = 'qwerTy123';
    expect(checkPassword(wrongPassword, hash, salt)).toBe(false);
  })
})