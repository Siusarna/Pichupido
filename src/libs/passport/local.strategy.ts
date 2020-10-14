import { Strategy as Local, IStrategyOptions } from 'passport-local';

const opts: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

export const localStrategy = new Local(opts, async (email, password, done) => {
  const user = {
    checkPassword: (password) => {
      return true;
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
