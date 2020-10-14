import * as Router from 'koa-joi-router';
export const PASSWORD_PATTERN = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})', 'i');

const joi = Router.Joi;
const joiPassword = joi.string().regex(PASSWORD_PATTERN).required()
  .min(6).error(new Error('Password Must contain a number, a character, a special character and be 6 characters long at least'));

export class AccountsValidator {
  static signIn: Router.Config = {
    meta: {
      swagger: {
        summary: 'User sign in',
        description: 'Sign in user by email and password',
        tags: ['accounts'],
      },
    },
    validate: {
      type: 'json',
      body: {
        email: joi.string().email().required(),
        password: joiPassword,
      },
      output: {
        200: {
          body: {
            tokens: joi.object({
              accessToken: joi.string(),
              accessExpiresIn: joi.number(),
              refreshToken: joi.string(),
              refreshExpiresIn: joi.number(),
            }),
            user: {
              id: joi.number(),
              firstName: joi.string(),
              lastName: joi.string(),
              username: joi.string().allow(null),
              photo: joi.string(),
              role: joi.string().allow(null),
            },
          },
        },
      },
    },
  };
}
