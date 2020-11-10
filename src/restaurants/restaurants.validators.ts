import * as Router from 'koa-joi-router';

const joi = Router.Joi;

export const createRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Add restaurant',
      tags: ['restaurants'],
    },
  },
  validate: {
    type: 'json',
    body: {
      name: joi.string().required(),
      logo: joi.string().required(),
      cover: joi.string().required(),
      workingHours: joi.string().required(),
      location: joi.string().required(),
      description: joi.string().required(),
    },
    output: {
      201: {
        body: {
          id: joi.number(),
        },
      },
      400: {
        body: {
          error: joi.string(),
        },
      },
    },
  },
};

export const getRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get restaurant by id',
      tags: ['restaurants'],
    },
  },
  validate: {
    params: {
      id: joi.number().required(),
    },
    output: {
      200: {
        body: {
          id: joi.number().required(),
          name: joi.string().required(),
          adminId: joi.number().required(),
          logo: joi.string().required(),
          cover: joi.string().required(),
          workingHours: joi.string().required(),
          location: joi.string().required(),
          description: joi.string().required(),
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

export const getAllRestaurants: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get all restaurants',
      tags: ['restaurants'],
    },
  },
  validate: {
    params: {
      id: joi.number().required(),
    },
    output: {
      200: {
        body: joi.array().items({
          id: joi.number().required(),
          name: joi.string().required(),
          adminId: joi.number().required(),
          logo: joi.string().required(),
          cover: joi.string().required(),
          workingHours: joi.string().required(),
          location: joi.string().required(),
          description: joi.string().required(),
        }),
      },
      400: {
        body: {
          error: joi.string().required(),
        },
      },
    },
  },
};

export const updateRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Update restaurant',
      tags: ['restaurants'],
    },
  },
  validate: {
    type: 'json',
    body: {
      name: joi.string(),
      logo: joi.string(),
      cover: joi.string(),
      workingHours: joi.string(),
      location: joi.string(),
      description: joi.string(),
    },
    params: {
      id: joi.number().required(),
    },
    output: {
      204: {
        body: {},
      },
      400: {
        body: {
          error: joi.string(),
        },
      },
    },
  },
}

export const deleteRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Delete restaurant',
      tags: ['restaurants'],
    },
  },
  validate: {
    params: {
      id: joi.number().required(),
    },
    output: {
      204: {
        body: {},
      },
      400: {
        body: {
          error: joi.string().required(),
        },
      },
    },
  },
}

