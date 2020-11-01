export interface JwtConfig {
  jwtFromRequest: string,
  accessExpiresIn: number,
  refreshExpiresIn: number,
  accessSecret: string,
  refreshSecret: string,
}

export interface AccessToken {
  userId: number,
  type: string
}

export interface RefreshToken {
  userId: number,
  tokenId: string,
  type: string
}

export interface Tokens {
  accessToken: string,
  refreshToken: string,
}

export interface Token {
  tokenId: string,
  userId: number,
  updatedAt?: Date,
}
