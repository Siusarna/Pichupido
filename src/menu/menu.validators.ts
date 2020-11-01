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
    type: 'form',
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

export const getMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get menu by id',
      tags: ['menu'],
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
          isActive: joi.boolean(),
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

export const getMenusByRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get menus by restaurant',
      tags: ['menu'],
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
          isActive: joi.boolean(),
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

export const updateMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Update menu',
      tags: ['menu'],
    },
  },
  validate: {
    type: 'form',
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

export const deleteMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Delete menu',
      tags: ['menu'],
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

export const activateMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Set menu status to active',
      tags: ['menu'],
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

export const deactivateMenu: Router.Config = {
  meta: {
    swagger: {
      summary: 'Set menu status to non-active',
      tags: ['menu'],
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

