import { Strategy as JWT, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from 'config';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(config.get('tokens.jwtFromRequest')),
  secretOrKey: config.get('tokens.accessSecret'),
};

export const jwtStrategy = new JWT(opts, async (jwtPayload, done) => {
  if (jwtPayload.expiresIn <= new Date().getTime()) {
    done({ isPassport: true, message: 'Expired access token' }, false);
  }
  const user = {};
  if (!user) {
    return done({ isPassport: true, message: 'User doesn\'t exist!' }, false);
  }
  return done(null, user);
});
