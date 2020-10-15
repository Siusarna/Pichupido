import koaPassport from 'koa-passport';
import { localStrategy } from './local.strategy';
import { jwtStrategy } from './jwt.strategy';

koaPassport.use(localStrategy);
koaPassport.use(jwtStrategy);

export default koaPassport;
