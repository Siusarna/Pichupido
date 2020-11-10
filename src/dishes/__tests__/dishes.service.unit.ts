import * as service from '../dishes.service';
import * as data from './dishes.service.unit.data';
import * as images from '../../testing.utils/images';

jest.mock('../dishes.queries.ts');
jest.mock('../../utils/s3');
jest.mock('../../sections/sections.queries');
jest.mock('../../menu/menu.queries');

const mockDishDb = jest.requireMock('../dishes.queries.ts')
const mockSectionsDb = jest.requireMock('../../sections/sections.queries');
const mockMenuDb = jest.requireMock('../../menu/menu.queries');
const mockS3 = jest.requireMock('../../utils/s3');

const dbData = data.dbData;

beforeAll(() => {
  mockDishDb.__setDbData(dbData);
  mockSectionsDb.__setDbData([{
    id: 1,
    name: 'Drinks',
    restaurantId: 1,
  },
  {
    id: 4,
    name: 'Drinks',
    restaurantId: 2,
  }]);
  mockMenuDb.__setDbData([{
    id: 1,
    active: true,
    name: 'Main',
    restaurantId: 1,
  },
  {
    id: 3,
    active: true,
    name: 'Main',
    restaurantId: 2,
  }]);
  mockDishDb.__setMenuRestaurantRelation((menuId: number) => {
    if (menuId === 1 || menuId === 2) {
      return 1;
    }
    else {
      return 2;
    }
  })
});

describe('getDishById tests', () => {
  test('should return dish', async () => {
    const dish = await service.getDishById(2);
    expect(dish).toEqual(dbData[0]);
  })

  test('should throw error if there are no dishes with id', async () => {
    try {
      await service.getDishById(12);
    } catch (error) {
      expect(error).toBe('There are no dishes with this id');
    }
  });
});
/*
describe('getDishesByRestaurant tests', () => {
  test('should return array with dishes', async () => {
    const dish = await service.getDishesByRestaurant(1);
    expect(dish).toEqual(data.byRestaurantResult);
  })

  test('should return empty array', async () => {
    const dish = await service.getDishesByRestaurant(4);
    expect(dish).toEqual({ sections: [] });
  });
});

describe('getActiveDishesByRestaurant tests', () => {
  test('should return array with dishes', async () => {
    const dish = await service.getActiveDishesByRestaurant(1);
    expect(dish).toEqual(data.activeByRestaurantResult);
  })

  test('should return empty array', async () => {
    const dish = await service.getActiveDishesByRestaurant(4);
    expect(dish).toEqual({ sections: [] });
  });
});

describe('getDishesBySection tests', () => {
  test('should return array with dishes', async () => {
    const dish = await service.getDishesBySection(1);
    expect(dish).toEqual(data.bySectionResult);
  })

  test('should return empty array', async () => {
    const dish = await service.getDishesBySection(6);
    expect(dish).toEqual({ sections: [] });
  });
});

describe('getActiveDishesBySection tests', () => {
  test('should return array with dishes', async () => {
    const dish = await service.getActiveDishesBySection(1);
    expect(dish).toEqual(data.activeBySectionResult);
  })

  test('should return empty array', async () => {
    const dish = await service.getActiveDishesBySection(6);
    expect(dish).toEqual({ sections: [] });
  });
});
*/
describe('createDish tests', () => {
  test('should create dish', async () => {
    jest.spyOn(mockDishDb, 'insertDish');
    jest.spyOn(mockS3, 'uploadImage');
    const id = await service.createDish({
      name: 'Spaghetti',
      description: 'Good dish',
      photo: images.goodImg,
      price: 20,
      sectionId: 1,
      menuId: 1,
    }, 1);
    expect(id).toBe(9);
    expect(mockS3.uploadImage).toBeCalledWith(images.goodImg);
    expect(mockDishDb.insertDish).toBeCalledWith({
      name: 'Spaghetti',
      description: 'Good dish',
      photo: mockS3.defaultUrl,
      price: 20,
      sectionId: 1,
      menuId: 1,
    });
  });

  test('should throw error if section doesn\'t exist', async () => {
    try {
      await service.createDish({
        name: 'Spaghetti',
        description: 'Good dish',
        photo: images.goodImg,
        price: 20,
        sectionId: 6,
        menuId: 1,
      }, 1);
    } catch (error) {
      expect(error).toBe('Invalid section id');
    }
  });

  test('should throw error if menu doesn\'t exist', async () => {
    try {
      await service.createDish({
        name: 'Spaghetti',
        description: 'Good dish',
        photo: images.goodImg,
        price: 20,
        sectionId: 1,
        menuId: 6,
      }, 1);
    } catch (error) {
      expect(error).toBe('Invalid menu id');
    }
  });

  test('should throw error if section does not belong to your restautant', async () => {
    try {
      await service.createDish({
        name: 'Spaghetti',
        description: 'Good dish',
        photo: images.goodImg,
        price: 20,
        sectionId: 4,
        menuId: 1,
      }, 1);
    } catch (error) {
      expect(error).toBe('Section or menu does not belong to your restautant');
    }
  });

  test('should throw error if menu does not belong to your restautant', async () => {
    try {
      await service.createDish({
        name: 'Spaghetti',
        description: 'Good dish',
        photo: images.goodImg,
        price: 20,
        sectionId: 1,
        menuId: 3,
      }, 1);
    } catch (error) {
      expect(error).toBe('Section or menu does not belong to your restautant');
    }
  });

  test('should throw error if photo is invalid', async () => {
    try {
      await service.createDish({
        name: 'Spaghetti',
        description: 'Good dish',
        photo: images.badImg,
        price: 20,
        sectionId: 1,
        menuId: 1,
      }, 1);
    } catch (error) {
      expect(error).toBe('Invalid photo');
    }
  });
});

describe('updateDish tests', () => {
  test('should update dish', async() => {
    jest.spyOn(mockDishDb, 'updateDish');
    jest.spyOn(mockS3, 'uploadImage');
    jest.spyOn(mockS3, 'deleteImage');

    await service.updateDish({
      photo: images.goodImg,
    }, 1, 2);

    expect(mockS3.uploadImage).toBeCalledWith(images.goodImg);
    expect(mockS3.deleteImage).toBeCalledWith(data.dbData[0].photo);
    expect(mockDishDb.updateDish).toBeCalledWith({
      photo: mockS3.defaultUrl,
    }, 2);
  });

  test('should throw error if section doesn\'t exist', async () => {
    try {
      await service.updateDish({
        sectionId: 6
      }, 1, 2);
    } catch (error) {
      expect(error).toBe('Invalid section id');
    }
  });

  test('should throw error if menu doesn\'t exist', async () => {
    try {
      await service.updateDish({
        menuId: 6,
      }, 1, 2);
    } catch (error) {
      expect(error).toBe('Invalid menu id');
    }
  });

  test('should throw error if section does not belong to your restautant', async () => {
    try {
      await service.updateDish({
        sectionId: 4
      }, 1, 2);
    } catch (error) {
      expect(error).toBe('Invalid section id');
    }
  });

  test('should throw error if menu does not belong to your restautant', async () => {
    try {
      await service.updateDish({
        menuId: 3,
      }, 1, 2);
    } catch (error) {
      expect(error).toBe('Invalid menu id');
    }
  });

  test('should throw error if photo is invalid', async () => {
    try {
      await service.updateDish({
        photo: images.badImg,
      }, 1, 2);
    } catch (error) {
      expect(error).toBe('Invalid photo');
    }
  });

  test('should throw error if photo is invalid', async () => {
    try {
      await service.updateDish({
        photo: images.goodImg,
      }, 1, 15);
    } catch (error) {
      expect(error).toBe('There are no dishes with this id');
    }
  });
});

describe('deleteDish tests', () => {
  test('should delete dish', async () => {
    jest.spyOn(mockDishDb, 'deleteDish');
    jest.spyOn(mockS3, 'deleteImage');
    await service.deleteDish(1, 5);

    expect(mockS3.deleteImage).toBeCalledWith(data.dbData[3].photo);
    expect(mockDishDb.deleteDish).toBeCalledWith(5);
  });

  test('should throw error if dish does not belong to your restautant', async () => {
    try {
      await service.deleteDish(2, 5);
    } catch (error) {
      expect(error).toBe('This dish doesn\'t belong to your restaurant');
    }
  });

  test('should throw error if dish does not exist', async () => {
    try {
      await service.deleteDish(1, 15);
    } catch (error) {
      expect(error).toBe('There are no dishes with this id');
    }
  })
});