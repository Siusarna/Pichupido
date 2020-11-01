import jwt from 'jsonwebtoken';
import config from 'config';
import { v4 as uuidv4 } from 'uuid';

import * as queries from './tokens.queries';
import { JwtConfig, Tokens } from './tokens.types';

const ACCESS_TOKEN = 'access';
const REFRESH_TOKEN = 'refresh';

const jwtConf: JwtConfig = config.get('tokens');

const generateAccessToken = (userId: number) => {
  const payload = {
    userId,
    type: ACCESS_TOKEN,
  };
  const options = { expiresIn: jwtConf.accessExpiresIn };
  return jwt.sign(payload, jwtConf.accessSecret, options);
};

const generateRefreshToken = (userId: number) => {
  const tokenId = uuidv4().toString();
  const payload = {
    type: REFRESH_TOKEN,
    tokenId,
    userId,
  };
  const options = { expiresIn: jwtConf.refreshExpiresIn };
  return {
    refreshToken: jwt.sign(payload, jwtConf.refreshSecret, options),
    tokenId,
  };
};

export const createAndUpdateTokens = async (userId: number): Promise<Tokens> => {
  try {
    const accessToken = generateAccessToken(userId);
    const { tokenId, refreshToken } = generateRefreshToken(userId);
    const tokenFromDb = queries.getToken(userId);
    const token = { userId, tokenId, updatedAt: new Date() };
    if (tokenFromDb) {
      await queries.updateToken(token);
    } else {
      await queries.insertToken(token);
    }
    return {
      refreshToken,
      accessToken,
    };
  } catch (e) {
    throw Error(e.message);
  }
};
