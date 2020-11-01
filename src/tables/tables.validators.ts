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
          error: joi.string(),
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
      id: joi.number(),
    },
    output: {
      200: {
        body: {
          id: joi.number(),
          restaurantId: joi.number(),
          url: joi.string(),
          qrCodeUrl: joi.string(),
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

export const getTablesByRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get table by restaurant',
      tags: ['tables'],
    },
  },
  validate: {
    params: {
      restaurantId: joi.number(),
    },
    output: {
      200: {
        body: joi.array().items({
          id: joi.number(),
          restaurantId: joi.number(),
          url: joi.string(),
          qrCodeUrl: joi.string(),
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

export const deleteTable: Router.Config = {
  meta: {
    swagger: {
      summary: 'Delete table',
      tags: ['tables'],
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

