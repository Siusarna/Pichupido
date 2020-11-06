export const dbData = [
  {
    id: 2,
    name: 'Summer Potatos',
    sectionId: 3,
    menuId: 2,
    sectionName: 'Second meals',
    menuName: 'Summer',
    discount: 0,
    isActive: false,
    price: '$30.50',
    description: 'Mashed potatos - 300g',
    photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/b31c805f-f94d-46e0-b5b2-c3813fe2c235.jpeg'
  },
  {
    id: 3,
    name: 'Borsch',
    sectionId: 2,
    menuId: 1,
    sectionName: 'First meals',
    menuName: 'Main',
    discount: 0,
    isActive: true,
    price: '$60.00',
    description: 'Mashed potatos - 300g',
    photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/4d0d0d7c-73f0-446f-8f8b-61b050f6046f.jpeg'
  },
  {
    id: 4,
    name: 'Soup',
    sectionId: 2,
    menuId: 1,
    sectionName: 'First meals',
    menuName: 'Main',
    discount: 0,
    isActive: true,
    price: '$50.00',
    description: 'Soup with chicken - 400g',
    photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/f4bbede5-a23d-4f6f-baeb-6bc0a64ba78d.jpeg'
  },
  {
    id: 5,
    name: 'Beer',
    sectionId: 1,
    menuId: 1,
    sectionName: 'Drinks',
    menuName: 'Main',
    discount: 0,
    isActive: true,
    price: '$23.50',
    description: 'Beer - 0.5L',
    photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8eb010f9-9e4a-4d17-ba64-f2bee02daccf.jpeg'
  },
  {
    id: 6,
    name: 'Vodka',
    sectionId: 1,
    menuId: 1,
    sectionName: 'Drinks',
    menuName: 'Main',
    discount: 0,
    isActive: true,
    price: '$70.00',
    description: 'Vodka - 0.5L',
    photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/4360caf2-190d-4919-8d11-c26a45ab1c93.jpeg'
  },
  {
    id: 7,
    name: 'Wine',
    sectionId: 1,
    menuId: 1,
    sectionName: 'Drinks',
    menuName: 'Main',
    discount: 0,
    isActive: true,
    price: '$95.00',
    description: 'Wine - 1L',
    photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8a465d03-015f-4c68-9afe-1d0d4f8f2855.jpeg'
  },
  {
    id: 8,
    name: 'Tea',
    sectionId: 1,
    menuId: 2,
    sectionName: 'Drinks',
    menuName: 'Summer',
    discount: 0,
    isActive: false,
    price: '$15.00',
    description: 'Tea - 0.325L',
    photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/5286b66e-cd1e-486d-a619-98ec7677c9b7.jpeg'
  },
  {
    id: 9,
    name: 'Tea',
    sectionId: 4,
    menuId: 3,
    sectionName: 'Drinks',
    menuName: 'Main',
    discount: 0,
    isActive: true,
    price: '$15.00',
    description: 'Tea - 0.325L',
    photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/5286b66e-cd1e-486d-a619-98ec7677c9b72.jpeg'
  }
];

export const byRestaurantResult = {
  sections: [
    {
      id: 3,
      menus: [
        {
          dishes: [
            {
              description: 'Mashed potatos - 300g',
              discount: 0,
              id: 2,
              name: 'Summer Potatos',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/b31c805f-f94d-46e0-b5b2-c3813fe2c235.jpeg',
              price: '$30.50'
            }
          ],
          id: 2,
          name: 'Summer'
        }
      ],
      name: 'Second meals'
    },
    {
      id: 2,
      menus: [
        {
          dishes: [
            {
              description: 'Mashed potatos - 300g',
              discount: 0,
              id: 3,
              name: 'Borsch',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/4d0d0d7c-73f0-446f-8f8b-61b050f6046f.jpeg',
              price: '$60.00'
            },
            {
              description: 'Soup with chicken - 400g',
              discount: 0,
              id: 4,
              name: 'Soup',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/f4bbede5-a23d-4f6f-baeb-6bc0a64ba78d.jpeg',
              price: '$50.00'
            }
          ],
          id: 1,
          name: 'Main'
        }
      ],
      name: 'First meals'
    },
    {
      id: 1,
      menus: [
        {
          dishes: [
            {
              description: 'Beer - 0.5L',
              discount: 0,
              id: 5,
              name: 'Beer',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8eb010f9-9e4a-4d17-ba64-f2bee02daccf.jpeg',
              price: '$23.50'
            },
            {
              description: 'Vodka - 0.5L',
              discount: 0,
              id: 6,
              name: 'Vodka',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/4360caf2-190d-4919-8d11-c26a45ab1c93.jpeg',
              price: '$70.00'
            },
            {
              description: 'Wine - 1L',
              discount: 0,
              id: 7,
              name: 'Wine',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8a465d03-015f-4c68-9afe-1d0d4f8f2855.jpeg',
              price: '$95.00'
            }
          ],
          id: 1,
          name: 'Main'
        },
        {
          dishes: [
            {
              description: 'Tea - 0.325L',
              discount: 0,
              id: 8,
              name: 'Tea',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/5286b66e-cd1e-486d-a619-98ec7677c9b7.jpeg',
              price: '$15.00'
            }
          ],
          id: 2,
          name: 'Summer'
        }
      ],
      name: 'Drinks'
    }
  ]
};

export const activeByRestaurantResult = {
  sections: [
    {
      id: 2,
      menus: [
        {
          dishes: [
            {
              description: 'Mashed potatos - 300g',
              discount: 0,
              id: 3,
              name: 'Borsch',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/4d0d0d7c-73f0-446f-8f8b-61b050f6046f.jpeg',
              price: '$60.00'
            },
            {
              description: 'Soup with chicken - 400g',
              discount: 0,
              id: 4,
              name: 'Soup',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/f4bbede5-a23d-4f6f-baeb-6bc0a64ba78d.jpeg',
              price: '$50.00'
            }
          ],
          id: 1,
          name: 'Main'
        }
      ],
      name: 'First meals'
    },
    {
      id: 1,
      menus: [
        {
          dishes: [
            {
              description: 'Beer - 0.5L',
              discount: 0,
              id: 5,
              name: 'Beer',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8eb010f9-9e4a-4d17-ba64-f2bee02daccf.jpeg',
              price: '$23.50'
            },
            {
              description: 'Vodka - 0.5L',
              discount: 0,
              id: 6,
              name: 'Vodka',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/4360caf2-190d-4919-8d11-c26a45ab1c93.jpeg',
              price: '$70.00'
            },
            {
              description: 'Wine - 1L',
              discount: 0,
              id: 7,
              name: 'Wine',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8a465d03-015f-4c68-9afe-1d0d4f8f2855.jpeg',
              price: '$95.00'
            }
          ],
          id: 1,
          name: 'Main'
        },
      ],
      name: 'Drinks'
    }
  ]
};

export const bySectionResult = {
  sections: [
    {
      id: 1,
      menus: [
        {
          dishes: [
            {
              description: 'Beer - 0.5L',
              discount: 0,
              id: 5,
              name: 'Beer',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8eb010f9-9e4a-4d17-ba64-f2bee02daccf.jpeg',
              price: '$23.50'
            },
            {
              description: 'Vodka - 0.5L',
              discount: 0,
              id: 6,
              name: 'Vodka',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/4360caf2-190d-4919-8d11-c26a45ab1c93.jpeg',
              price: '$70.00'
            },
            {
              description: 'Wine - 1L',
              discount: 0,
              id: 7,
              name: 'Wine',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8a465d03-015f-4c68-9afe-1d0d4f8f2855.jpeg',
              price: '$95.00'
            }
          ],
          id: 1,
          name: 'Main'
        },
        {
          dishes: [
            {
              description: 'Tea - 0.325L',
              discount: 0,
              id: 8,
              name: 'Tea',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/5286b66e-cd1e-486d-a619-98ec7677c9b7.jpeg',
              price: '$15.00'
            }
          ],
          id: 2,
          name: 'Summer'
        }
      ],
      name: 'Drinks'
    }
  ]
};

export const activeBySectionResult = {
  sections: [
    {
      id: 1,
      menus: [
        {
          dishes: [
            {
              description: 'Beer - 0.5L',
              discount: 0,
              id: 5,
              name: 'Beer',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8eb010f9-9e4a-4d17-ba64-f2bee02daccf.jpeg',
              price: '$23.50'
            },
            {
              description: 'Vodka - 0.5L',
              discount: 0,
              id: 6,
              name: 'Vodka',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/4360caf2-190d-4919-8d11-c26a45ab1c93.jpeg',
              price: '$70.00'
            },
            {
              description: 'Wine - 1L',
              discount: 0,
              id: 7,
              name: 'Wine',
              photo: 'https://pichupido.s3.eu-north-1.amazonaws.com/8a465d03-015f-4c68-9afe-1d0d4f8f2855.jpeg',
              price: '$95.00'
            }
          ],
          id: 1,
          name: 'Main'
        },
      ],
      name: 'Drinks'
    }
  ]
};