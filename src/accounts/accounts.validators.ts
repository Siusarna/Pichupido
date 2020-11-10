import * as Router from 'koa-joi-router';
export const PASSWORD_PATTERN = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})', 'i');

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
            user: {
              id: joi.number(),
              firstName: joi.string(),
              lastName: joi.string(),
              role: joi.string().allow(null),
            },
          },
        },
        400: {
          body: {
            error: joi.string().required(),
          },
        },

      },
    },
  };

  static signUp: Router.Config = {
    meta: {
      swagger: {
        summary: 'User sign up',
        description: 'User registration',
        tags: ['accounts'],
      },
    },
    validate: {
      type: 'json',
      body: {
        email: joi.string().email().required(),
        password: joiPassword,
        confirmPassword: joi.string().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        role: joi.string().valid('admin', 'employee').required(),
      },
      output: {
        201: {
          body: {},
        },
        400: {
          body: {
            error: joi.string().required(),
          },
        },
      },
    },
  };

  static getProfile: Router.Config = {
    meta: {
      swagger: {
        summary: 'Get user profile',
        description: 'Get profile data of current user',
        tags: ['accounts'],
      },
    },
    validate: {
      output: {
        200: {
          body: {
            id: joi.number().required(),
            email: joi.string().email().required(),
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            role: joi.string().allow(null).required(),
          },
        },
        400: {
          body: {
            error: joi.string().required(),
          },
        },
      },
    },
  }

  static updateProfile: Router.Config = {
    meta: {
      swagger: {
        summary: 'Update user profile',
        tags: ['accounts'],
      },
    },
    validate: {
      type: 'json',
      body: {
        firstName: joi.string(),
        lastName: joi.string(),
      },
      output: {
        201: {
          body: {},
        },
        400: {
          body: {
            error: joi.string().required(),
          },
        },
      },
    },
  };

  static deleteProfile: Router.Config = {
    meta: {
      swagger: {
        summary: 'Delete user profile',
        description: 'Delete profile data of current user',
        tags: ['accounts'],
      },
    },
    validate: {
      output: {
        204: {
          body: {}
        },
        400: {
          body: {
            error: joi.string().required(),
          },
        },
      },
    },
  }

  static logout: Router.Config = {
    meta: {
      swagger: {
        summary: 'Log out',
        tags: ['accounts'],
      },
    },
    validate: {
      output: {
        201: {
          body: {},
        },
        400: {
          body: {
            error: joi.string().required(),
          },
        },
      },
    },
  };

}

