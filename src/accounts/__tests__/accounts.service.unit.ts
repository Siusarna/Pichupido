import * as service from '../accounts.service';

jest.mock('../accounts.queries.ts');

const mockDb = jest.requireMock('../accounts.queries')

const dbData = [ 
  {
    id: 1,
    firstName: 'Vlad',
    lastName: 'Khmara',
    email: 'hello@gmail.com',
    role: 'admin',
    password: '+LBHJHaNimXRu3J2x7o/5H0fjzM=',
    salt: '8BTDbSYmNPk=',
  },
  {
    id: 1,
    firstName: 'Dima',
    lastName: 'Petruniak',
    email: 'bla@gmail.com',
    role: 'admin',
    password: 'OB6Y1vh8D8zH0cRG1JLKOA3DkxA=',
    salt: 'BhdLRAJob/o=',
  }
]

beforeAll(() => {
  mockDb.__setDbData(dbData);
});

describe('sign-up tests', () => {
  test('should create new user', async () => {
    spyOn(mockDb, 'insertNewUser');
    await service.AccountsServices.signUp({
      email: 'hehe@gmail.com',
      firstName: 'aa',
      lastName: 'bb',
      password: 'qwerty',
      confirmPassword: 'qwerty',
      role: 'admin',
    });
    expect(mockDb.insertNewUser).toBeCalledTimes(1);
  });

  test('should throw error if user with this email already exists', async() => {
    try {
      await service.AccountsServices.signUp({
        email: 'hello@gmail.com',
        firstName: 'aa',
        lastName: 'bb',
        password: 'qwerty',
        confirmPassword: 'qwerty',
        role: 'admin',
      });  
    } catch (error) {
      expect(error.message).toBe('User with this email already exist')
    }
  });
});

describe('profile tests', () => {
  test('should return profile', async() => {
    const profile = await service.AccountsServices.profile({ id: 1 });
    expect(profile).toEqual({
      id: 1,
      firstName: 'Vlad',
      lastName: 'Khmara',
      email: 'hello@gmail.com',
      role: 'admin',
    });
  });
});

describe('deleteProfile tests', () => {
  test('should delete profile', async() => {
    spyOn(mockDb, 'deleteUserById');
    await service.AccountsServices.deleteProfile({ id: 1 });
    expect(mockDb.deleteUserById).toBeCalledWith(1);
  });
});