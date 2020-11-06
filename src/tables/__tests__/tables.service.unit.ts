import * as service from '../tables.service';

jest.mock('../tables.queries.ts');
jest.mock('../../utils/s3');
const mockDb = jest.requireMock('../tables.queries.ts');
const mockS3 = jest.requireMock('../../utils/s3');

const dbData = [
  {
    id: 1,
    restaurantId: 1,
    url: 'https://pichupido-user.herokuapp.com/restaurants/1?tableNumber=1',
    qrCodeUrl: 'https://pichupido.s3.eu-north-1.amazonaws.com/7609305c-4979-44fe-be57-7c336bd7f6ac1.png',
  },
  {
    id: 2,
    restaurantId: 1,
    url: 'https://pichupido-user.herokuapp.com/restaurants/1?tableNumber=2',
    qrCodeUrl: 'https://pichupido.s3.eu-north-1.amazonaws.com/7609305c-4979-44fe-be57-7c336bd7f6ac2.png',
  },
  {
    id: 3,
    restaurantId: 2,
    url: 'https://pichupido-user.herokuapp.com/restaurants/2?tableNumber=3',
    qrCodeUrl: 'https://pichupido.s3.eu-north-1.amazonaws.com/7609305c-4979-44fe-be57-7c336bd7f6ac3.png',
  },
];

beforeAll(() => {
  mockDb.__setDbData(dbData);
});

describe('getTable tests', () => {
  test('should return table', async () => {
    const table = await service.getTable(2);
    expect(table).toEqual(dbData[1]);
  })

  test('should throw error if there are no tables with id', async () => {
    try {
      await service.getTable(5);
    } catch (error) {
      expect(error).toBe('There is no table with this id');
    }
  });
});

describe('getTablesByRestaurant tests', () => {
  test('should return array of tables', async () => {
    const tables = await service.getTablesByRestaurant(1);
    expect(tables).toEqual(dbData.slice(0, 2));
  });

  test('should return empty array if there are no tables', async () => {
    const tables = await service.getTablesByRestaurant(4);
    expect(tables).toEqual([]);
  });
});

describe('createTable tests', () => {
  test('should create table', async () => {
    jest.spyOn(mockDb, 'insertTable');
    jest.spyOn(mockDb, 'setUrl');
    const restaurantId = 1;
    const id = await service.createTable(restaurantId);

    const expectedId = 4;
    expect(id).toBe(expectedId);
    const expectedUrl = `https://pichupido-user.herokuapp.com/restaurants/${restaurantId}?tableNumber=${expectedId}`;
    expect(mockDb.insertTable).toBeCalledWith(restaurantId);
    expect(mockDb.setUrl).toBeCalledWith(expectedId, expectedUrl, mockS3.defaultUrl);
  });
});

describe('deleteTable tests', () => {
  test('should delete table', async () => {
    jest.spyOn(mockDb, 'deleteTable');
    jest.spyOn(mockS3, 'deleteImage');
    await service.deleteTable(1, 1);
    expect(mockS3.deleteImage).toBeCalledWith(dbData[0].qrCodeUrl);
    expect(mockDb.deleteTable).toBeCalledWith(1);
  });

  test('should throw error if there are no tables with id', async () => {
    try {
      await service.deleteTable(1, 5);
    } catch (error) {
      expect(error).toBe('There is no table with this id')
    }
  });

  test('should throw error if table is from another restaurant', async () => {
    try {
      await service.deleteTable(1, 3);
    } catch (error) {
      expect(error).toBe('This table does not belong to your restaurant')
    }
  });
});