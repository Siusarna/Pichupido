import { Strategy as Local, IStrategyOptions } from 'passport-local';

const opts: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

export const localStrategy = new Local(opts, async (email: string, password: string, done) => {
  const user = {
    checkPassword: (password: string) => {
      return !password && email;
    },
  };
  if (!user) {
    return done({ isPassport: true, message: 'User doesn\'t exist!' }, false);
  }
  if (!user.checkPassword(password)) {
    return done({ isPassport: true, message: 'Incorrect password!' }, false);
  }
  return done(null, user);
});
