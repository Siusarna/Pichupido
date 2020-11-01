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
    type: 'json',
    body: {
      name: joi.string(),
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

export const getSection: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get section by id',
      tags: ['sections'],
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
          name: joi.string(),
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

export const getSectionByRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get section by restaurant',
      tags: ['sections'],
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
          name: joi.string(),
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

export const deleteSection: Router.Config = {
  meta: {
    swagger: {
      summary: 'Delete section',
      tags: ['sections'],
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

