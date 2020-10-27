export interface JwtConfig {
  jwtFromRequest: string,
  accessExpiresIn: number,
  refreshExpiresIn: number,
  accessSecret: string,
  refreshSecret: string,
}

export interface AccessToken {
  userId: string,
  type: string
}

export interface RefreshToken {
  userId: string,
  tokenId: string,
  type: string
}

export interface Tokens {
  accessToken: string,
  refreshToken: string,
}

export interface Token {
  tokenId: string,
  userId: string,
  updatedAt?: Date,
}
