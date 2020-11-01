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
      name: joi.string(),
      logo: joi.string(),
      cover: joi.string(),
      workingHours: joi.string(),
      location: joi.string(),
      description: joi.string(),
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
      id: joi.number(),
    },
    output: {
      200: {
        body: {
          id: joi.number(),
          name: joi.string(),
          adminId: joi.number(),
          logo: joi.string(),
          cover: joi.string(),
          workingHours: joi.string(),
          location: joi.string(),
          description: joi.string(),
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

export const getAllRestaurants: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get all restaurants',
      tags: ['restaurants'],
    },
  },
  validate: {
    params: {
      id: joi.number(),
    },
    output: {
      200: {
        body: joi.array().items({
          id: joi.number(),
          name: joi.string(),
          adminId: joi.number(),
          logo: joi.string(),
          cover: joi.string(),
          workingHours: joi.string(),
          location: joi.string(),
          description: joi.string(),
        }),
      },
      400: {
        body: {
          error: joi.string(),
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
      id: joi.number(),
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
      id: joi.number(),
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

