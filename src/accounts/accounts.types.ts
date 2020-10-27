export interface UserId {
  id: string
}

export interface UserData {
  firstName: string,
  lastName: string,
  role: string,
}

export interface Credentials {
  email: string,
  password: string,
  confirmPassword?: string,
}

export interface HashedCredentials {
  email: string,
  password: string,
  salt: string,
}

export type User = UserId & UserData & HashedCredentials;
