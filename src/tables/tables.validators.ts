import * as Router from 'koa-joi-router';

const joi = Router.Joi;

export const createTable: Router.Config = {
  meta: {
    swagger: {
      summary: 'Add table',
      tags: ['tables'],
    },
  },
  validate: {
    output: {
      201: {
        body: {
          id: joi.number(),
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

export const getTable: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get table by id',
      tags: ['tables'],
    },
  },
  validate: {
    params: {
      id: joi.number().required(),
      restaurantId: joi.number().required(),
    },
    output: {
      200: {
        body: {
          id: joi.number().required(),
          restaurantId: joi.number().required(),
          url: joi.string().required(),
          qrCodeUrl: joi.string().required(),
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

export const getTablesByRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get table by restaurant',
      tags: ['tables'],
    },
  },
  validate: {
    params: {
      restaurantId: joi.number().required(),
    },
    output: {
      200: {
        body: joi.array().items({
          id: joi.number().required(),
          restaurantId: joi.number().required(),
          url: joi.string().required(),
          qrCodeUrl: joi.string().required(),
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

export const deleteTable: Router.Config = {
  meta: {
    swagger: {
      summary: 'Delete table',
      tags: ['tables'],
    },
  },
  validate: {
    params: {
      id: joi.number().required(),
      restaurantId: joi.number().required(),
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

