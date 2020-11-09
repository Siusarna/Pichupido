import * as service from '../restaurants.service';
import * as images from '../../testing.utils/images';

jest.mock('../restaurants.queries.ts');
jest.mock('../../utils/s3');

const mockDb = jest.requireMock('../restaurants.queries.ts')
const mockS3 = jest.requireMock('../../utils/s3');

const dbData = [
  {
    id: 1,
    name: 'My-rest',
    adminId: 1,
    cover: 'https://pichupido.s3.eu-north-1.amazonaws.com/7609305c-4979-44fe-be57-cover.png',
    logo: 'https://pichupido.s3.eu-north-1.amazonaws.com/7609305c-4979-44fe-be57-logo.png',
    workingHours: '10:00 - 18:00',
    location: 'Zaporizhya',
    description: 'Good restaurant',
  },
  {
    id: 2,
    name: 'My-rest-2',
    adminId: 2,
    cover: 'https://pichupido.s3.eu-north-1.amazonaws.com/7609305c-4979-44fe-7c336bd7f6cover.png',
    logo: 'https://pichupido.s3.eu-north-1.amazonaws.com/7609305c-4979-44fe-7c336bd7f6logo.png',
    workingHours: '10:00 - 20:00',
    location: 'Zaporizhya',
    description: 'Bad restaurant',
  },
];

beforeAll(() => {
  mockDb.__setDbData(dbData);
});


describe('getRestaurant tests', () => {
  test('should return restaurant', async () => {
    const restaurant = await service.getRestaurant(2);
    expect(restaurant).toEqual(dbData[1]);
  })

  test('should throw error if there are no restaurants with id', async () => {
    try {
      await service.getRestaurant(5);
    } catch (error) {
      expect(error).toBe('There are no restaurants with this id');
    }
  });
});

describe('getAllRestaurants tests', () => {
  test('should return array of all restaurants', async() => {
    const restaurants = await service.getAllRestaurants();
    expect(restaurants).toEqual(dbData);
  });
});

describe('createRestaurant test', () => {
  test('should create restaurant', async () => {
    jest.spyOn(mockDb, 'insertRestaurant');
    jest.spyOn(mockS3, 'uploadImage');

    const expectedId = 3;
    const adminId = 3;

    const id = await service.createRestaurant({
      name: 'name',
      cover: images.goodImg,
      logo: images.goodImg,
      description: 'very good',
      location: 'Kyiv',
      workingHours: '24/7',
    }, adminId);

    expect(id).toBe(expectedId);
    expect(mockS3.uploadImage).toBeCalledWith(images.goodImg);
    expect(mockS3.uploadImage).toBeCalledTimes(2);
    expect(mockDb.insertRestaurant).toBeCalledWith({
      name: 'name',
      cover: mockS3.defaultUrl,
      logo: mockS3.defaultUrl,
      description: 'very good',
      location: 'Kyiv',
      workingHours: '24/7',
      adminId,
    });
  });

  test('should throw error if admin trying to create second restaurant', async() => {
    const adminId = 1;

    try {
      await service.createRestaurant({
        name: 'name',
        cover: images.goodImg,
        logo: images.goodImg,
        description: 'very good',
        location: 'Kyiv',
        workingHours: '24/7',
      }, adminId);
    } catch (error) {
      expect(error).toBe('There already is restaurant with this admin');
    }
  });

  test('should throw error if logo is invalid', async() => {
    const adminId = 3;

    try {
      await service.createRestaurant({
        name: 'name',
        cover: images.goodImg,
        logo: images.badImg,
        description: 'very good',
        location: 'Kyiv',
        workingHours: '24/7',
      }, adminId);
    } catch (error) {
      expect(error).toBe('Invalid image');
    }
  });

  test('should throw error if cover is invalid', async() => {
    const adminId = 3;

    try {
      await service.createRestaurant({
        name: 'name',
        cover: images.badImg,
        logo: images.goodImg,
        description: 'very good',
        location: 'Kyiv',
        workingHours: '24/7',
      }, adminId);
    } catch (error) {
      expect(error).toBe('Invalid image');
    }
  });
});

describe('updateRestaurant tests', () => {
  test('should update restaurant', async() => {
    jest.spyOn(mockDb, 'updateRestaurant');
    const newRest = { name: 'new name' }
    const id = 1;
    const userId = 1;
    await service.updateRestaurant(newRest, userId, id);
    expect(mockDb.updateRestaurant).toBeCalledWith(newRest, id);
  });

  test('should update logo', async() => {
    jest.spyOn(mockDb, 'updateRestaurant');
    jest.spyOn(mockS3, 'uploadImage');
    jest.spyOn(mockS3, 'deleteImage');

    const newRest = { logo: images.goodImg }
    const id = 1;
    const userId = 1;
    await service.updateRestaurant(newRest, userId, id);
    expect(mockDb.updateRestaurant).toBeCalledWith({ logo: mockS3.defaultUrl }, id);
    expect(mockS3.uploadImage).toBeCalledWith(images.goodImg);
    expect(mockS3.deleteImage).toBeCalledWith(dbData[0].logo);
  });

  test('should update cover', async() => {
    jest.spyOn(mockDb, 'updateRestaurant');
    jest.spyOn(mockS3, 'uploadImage');
    jest.spyOn(mockS3, 'deleteImage');

    const newRest = { cover: images.goodImg }
    const id = 1;
    const userId = 1;
    await service.updateRestaurant(newRest, userId, id);
    expect(mockDb.updateRestaurant).toBeCalledWith({ logo: mockS3.defaultUrl }, id);
    expect(mockS3.uploadImage).toBeCalledWith(images.goodImg);
    expect(mockS3.deleteImage).toBeCalledWith(dbData[0].cover);
  });

  test('should throw error if logo is invalid', async() => {
    const newRest = { logo: images.badImg }
    const id = 1;
    const userId = 1;
    try {
      await service.updateRestaurant(newRest, userId, id);
    } catch (error) {
      expect(error).toBe('Invalid image');
    }
  });

  test('should throw error if cover is invalid', async() => {
    const newRest = { cover: images.badImg }
    const id = 1;
    const userId = 1;
    try {
      await service.updateRestaurant(newRest, userId, id);
    } catch (error) {
      expect(error).toBe('Invalid image');
    }
  }); 

  test('should throw error if restaurant id is invalid', async () => {
    const newRest = { name: 'new name' }
    const id = 6;
    const userId = 1;

    try {
      await service.updateRestaurant(newRest, userId, id);
    } catch (error) {
      expect(error).toBe('There are no restaurants with this id');
    }
  });

  test('should throw error if restaurant does not belong to admin', async () => {
    const newRest = { name: 'new name' }
    const id = 1;
    const userId = 2;

    try {
      await service.updateRestaurant(newRest, userId, id);
    } catch (error) {
      expect(error).toBe('Only restaurant admin can update restaurant info');
    }
  });
});

describe('deleteRestaurant tests', () => {
  test('should delete restaurant', async () => {
    jest.spyOn(mockDb, 'deleteRestaurant');
    jest.spyOn(mockS3, 'deleteImage');

    const id = 1;
    const adminId = 1;

    await service.deleteRestaurant(id, adminId);
    expect(mockDb.deleteRestaurant).toBeCalledWith(id);
    expect(mockS3.deleteImage).toBeCalledWith(dbData[0].cover);
    expect(mockS3.deleteImage).toBeCalledWith(dbData[0].logo);
  });

  test('should throw error if restaurant id is invalid', async () => {
    const id = 5;
    const adminId = 1;

    try {
      await service.deleteRestaurant(adminId, id);
    } catch (error) {
      expect(error).toBe('There are no restaurants with this id')
    }
  });

  test('should throw error if restaurant id is invalid', async () => {
    const id = 1;
    const adminId = 2;

    try {
      await service.deleteRestaurant(adminId, id);
    } catch (error) {
      expect(error).toBe('Only restaurant admin can delete restaurant')
    }
  });
});