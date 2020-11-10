import * as Router from 'koa-joi-router';

const joi = Router.Joi;

export const createDish: Router.Config = {
  meta: {
    swagger: {
      summary: 'Add dish',
      tags: ['dishes'],
    },
  },
  validate: {
    params: {
      restaurantId: joi.number().required(),
    },
    type: 'json',
    body: {
      name: joi.string().required(),
      photo: joi.string().required(),
      description: joi.string().required(),
      price: joi.string().required(),
      sectionId: joi.number().required(),
      menuId: joi.number().required(),
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

export const getDishById: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get dish by id',
      tags: ['dishes'],
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
          restaurantId: joi.number(),
          name: joi.string().required(),
          photo: joi.string().required(),
          description: joi.string().required(),
          price: joi.string().required(),
          discount: joi.number().required(),
          sectionId: joi.number().required(),
          menuId: joi.number().required(),
          sectionName: joi.string().required(),
          menuName: joi.string().required(),
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

export const getDishesByRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get dishes by restaurant',
      tags: ['dishes'],
    },
  },
  validate: {
    params: {
      restaurantId: joi.number().required(),
      sectionId: joi.number(),
      active: joi.boolean(),
    },
    output: {
      200: {
        body: {
          sections: joi.array().items({
            id: joi.number(),
            name: joi.string(),
            menus: joi.array().items({
              id: joi.number(),
              name: joi.string(),
              dishes: joi.array().items({
                id: joi.number(),
                name: joi.string(),
                description: joi.string(),
                photo: joi.string(),
                price: joi.string(),
                discount: joi.number(),
              })
            })
          })
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

export const updateDish: Router.Config = {
  meta: {
    swagger: {
      summary: 'Update dish',
      tags: ['dishes'],
    },
  },
  validate: {
    type: 'json',
    body: {
      name: joi.string(),
      photo: joi.string(),
      description: joi.string(),
      price: joi.string(),
      discount: joi.number().min(0).max(1),
      sectionId: joi.number(),
      menuId: joi.number(),
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

export const deleteDish: Router.Config = {
  meta: {
    swagger: {
      summary: 'Delete dish',
      tags: ['dishes'],
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

