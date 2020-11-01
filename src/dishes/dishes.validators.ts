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
    type: 'form',
    body: {
      name: joi.string(),
      photo: joi.string(),
      description: joi.string(),
      price: joi.string(),
      sectionId: joi.number(),
      menuId: joi.number(),
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

export const getDishById: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get dish by id',
      tags: ['dishes'],
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
          photo: joi.string(),
          description: joi.string(),
          price: joi.string(),
          discount: joi.number(),
          sectionId: joi.number(),
          menuId: joi.number(),
          sectionName: joi.string(),
          menuName: joi.string(),
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

export const getDishesBySection: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get dishes by section',
      tags: ['dishes'],
    },
  },
  validate: {
    params: {
      sectionId: joi.number(),
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
          error: joi.string(),
        },
      },
    },
  },
};

export const getActiveDishesBySection: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get dishes by section, that are contained in active menus',
      tags: ['dishes'],
    },
  },
  validate: {
    params: {
      sectionId: joi.number(),
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
          error: joi.string(),
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
      restaurantId: joi.number(),
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
          error: joi.string(),
        },
      },
    },
  },
};

export const getActiveDishesByRestaurant: Router.Config = {
  meta: {
    swagger: {
      summary: 'Get dishes by restaurant, that are contained in active menus',
      tags: ['dishes'],
    },
  },
  validate: {
    params: {
      restaurantId: joi.number(),
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
          error: joi.string(),
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
    type: 'form',
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

export const deleteDish: Router.Config = {
  meta: {
    swagger: {
      summary: 'Delete dish',
      tags: ['dishes'],
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

