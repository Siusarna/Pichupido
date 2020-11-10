import * as Router from 'koa-joi-router';

const joi = Router.Joi;

export const createSection: Router.Config = {
  meta: {
    swagger: {
      summary: 'Add section',
      tags: ['sections'],
    },
  },
  validate: {
    params: {
      restaurantId: joi.number().required(),
    },
    type: 'json',
    body: {
      name: joi.string(),
    },
    output: {
      201: {
        body: {
          id: joi.number().required(),
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

export const getSection: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get section by id',
      tags: ['sections'],
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
          name: joi.string().required(),
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

export const getSectionByRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get section by restaurant',
      tags: ['sections'],
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
          name: joi.string().required(),
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

export const updateSection: Router.Config = {
  meta: {
    swagger: {
      summary: 'Update section',
      tags: ['sections'],
    },
  },
  validate: {
    type: 'json',
    body: {
      name: joi.string(),
    },
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

export const deleteSection: Router.Config = {
  meta: {
    swagger: {
      summary: 'Delete section',
      tags: ['sections'],
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

