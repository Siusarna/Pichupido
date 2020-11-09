import * as service from '../menu.service';

jest.mock('../menu.queries.ts');
const mockDb = jest.requireMock('../menu.queries.ts')

const dbData = [
  {
    id: 1,
    name: 'Main',
    isActive: true,
    restaurantId: 1,
  },
  {
    id: 2,
    name: 'Summer',
    isActive: false,
    restaurantId: 1,
  },
  {
    id: 3,
    name: 'Main',
    actiisActiveve: true,
    restaurantId: 2,
  },
];

beforeAll(() => {
  mockDb.__setDbData(dbData);
});

describe('getMenu tests', () => {
  test('should return menu', async () => {
    const menu = await service.getMenu(2);
    expect(menu).toEqual(dbData[1]);
  })

  test('should throw error if there are no menus with id', async () => {
    try {
      await service.getMenu(5);
    } catch (error) {
      expect(error).toBe('There is no menu with this id');
    }
  });
});

describe('getMenuByRestaurant tests', () => {
  test('should return array of menus', async() => {
    const menus = await service.getMenusByRestaurant(1);
    expect(menus).toEqual(dbData.slice(0, 2));
  });

  test('should return empty array if there are no menus', async() => {
    const menus = await service.getMenusByRestaurant(4);
    expect(menus).toEqual([]);
  });
});

describe('createMenu tests', () => {
  test('should create menu and return id', async () => {
    jest.spyOn(mockDb, 'insertMenu');
    const id = await service.createMenu({ name: 'Autumn' }, 1);
    expect(mockDb.insertMenu).toBeCalledWith({ name: 'Autumn', restaurantId: 1 });
    expect(id).toBe(4);
  });

  test('should throw error if try to create menu with already existing name', async () => {
    try {
      await service.createMenu({ name: 'Summer' }, 1);
    } catch (error) {
      expect(error).toBe('There is already menu with this name');
    }
  });

  test('should not throw error if menu with already existing name is in other restaurant', async () => {
    jest.spyOn(mockDb, 'insertMenu');
    const id = await service.createMenu({ name: 'Summer' }, 2);
    expect(mockDb.insertMenu).toBeCalledWith({ name: 'Summer', restaurantId: 2 });
    expect(id).toBe(4);
  });
});

describe('updateMenu tests', () => {
  test('should update menu', async() => {
    jest.spyOn(mockDb, 'updateMenu');
    await service.updateMenu({ isActive: true }, 1, 1);
    expect(mockDb.updateMenu).toBeCalledWith({ isActive: true }, 1);
  });

  test('should throw error if there are no menus with id', async() => {
    try {
      await service.updateMenu({ name: 'Winter' }, 1, 5);
    } catch (error) {
      expect(error).toBe('There is no menu with this id')
    }
  });

  test('shouldn\'t throw error if menu is from another restaurant', async() => {
    try {
      await service.updateMenu({ name: 'Winter' }, 1, 3);
    } catch (error) {
      expect(error).toBe('This menu does not belong to your restaurant')
    }
  });
});

describe('deleteMenu tests', () => {
  test('should delete menu', async() => {
    jest.spyOn(mockDb, 'deleteMenu');
    await service.deleteMenu(1, 1);
    expect(mockDb.deleteMenu).toBeCalledWith(1);
  });

  test('should throw error if there are no menus with id', async() => {
    try {
      await service.deleteMenu(1, 5);
    } catch (error) {
      expect(error).toBe('There is no menu with this id')
    }
  });

  test('should throw error if menu is from another restaurant', async() => {
    try {
      await service.deleteMenu(1, 3);
    } catch (error) {
      expect(error).toBe('This menu does not belong to your restaurant')
    }
  });
});