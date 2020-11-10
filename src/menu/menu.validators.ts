import * as Router from 'koa-joi-router';

const joi = Router.Joi;

export const createMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Add menu',
      tags: ['menu'],
    },
  },
  validate: {
    params: {
      restaurantId: joi.number().required(),
    },
    type: 'json',
    body: {
      name: joi.string().required(),
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

export const getMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get menu by id',
      tags: ['menu'],
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
          isActive: joi.boolean().required(),
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

export const getMenusByRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get menus by restaurant',
      tags: ['menu'],
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
          isActive: joi.boolean().required(),
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

export const updateMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Update menu',
      tags: ['menu'],
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

export const deleteMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Delete menu',
      tags: ['menu'],
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

export const activateMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Set menu status to active',
      tags: ['menu'],
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

export const deactivateMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Set menu status to non-active',
      tags: ['menu'],
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

