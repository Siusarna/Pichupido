import * as service from '../sections.service';

jest.mock('../sections.queries.ts');
const mockDb = jest.requireMock('../sections.queries.ts')

const dbData = [
  {
    id: 1,
    name: 'Drinks',
    restaurantId: 1,
  },
  {
    id: 2,
    name: 'First meals',
    restaurantId: 1,
  },
  {
    id: 3,
    name: 'Drinks',
    restaurantId: 2,
  },
];

beforeAll(() => {
  mockDb.__setDbData(dbData);
});

describe('getSection tests', () => {
  test('should return section', async () => {
    const section = await service.getSection(2);
    expect(section).toEqual(dbData[1]);
  })

  test('should throw error if there are no sections with id', async () => {
    try {
      await service.getSection(5);
    } catch (error) {
      expect(error).toBe('There is no section with this id');
    }
  });
});

describe('getSectionByRestaurant tests', () => {
  test('should return array of sections', async() => {
    const sections = await service.getSectionByRestaurant(1);
    expect(sections).toEqual(dbData.slice(0, 2));
  });

  test('should return empty array if there are no sections', async() => {
    const sections = await service.getSectionByRestaurant(4);
    expect(sections).toEqual([]);
  });
});

describe('createSection tests', () => {
  test('should create section and return id', async () => {
    jest.spyOn(mockDb, 'insertSection');
    const id = await service.createSection({ name: 'Second meal' }, 1);
    expect(mockDb.insertSection).toBeCalledWith({ name: 'Second meal', restaurantId: 1 });
    expect(id).toBe(4);
  });

  test('should throw error if try to create section with already existing name', async () => {
    try {
      await service.createSection({ name: 'First meals' }, 1);
    } catch (error) {
      expect(error).toBe('There is already section with this name');
    }
  });

  test('should not throw error if section with already existing name is in other restaurant', async () => {
    jest.spyOn(mockDb, 'insertSection');
    const id = await service.createSection({ name: 'First meals' }, 2);
    expect(mockDb.insertSection).toBeCalledWith({ name: 'Second meal', restaurantId: 1 });
    expect(id).toBe(4);
  });
});

describe('updateSection tests', () => {
  test('should update section', async() => {
    jest.spyOn(mockDb, 'updateSection');
    await service.updateSection({ name: 'Drinks 2' }, 1, 1);
    expect(mockDb.updateSection).toBeCalledWith({ name: 'Drinks 2' }, 1);
  });

  test('should throw error if there are no sections with id', async() => {
    try {
      await service.updateSection({ name: 'Drinks 2' }, 1, 5);
    } catch (error) {
      expect(error).toBe('There is no section with this id')
    }
  });

  test('should throw error if section is from another restaurant', async() => {
    try {
      await service.updateSection({ name: 'Drinks 2' }, 1, 3);
    } catch (error) {
      expect(error).toBe('This section does not belong to your restaurant')
    }
  });
});

describe('deleteSection tests', () => {
  test('should delete section', async() => {
    jest.spyOn(mockDb, 'deleteSection');
    await service.deleteSection(1, 1);
    expect(mockDb.deleteSection).toBeCalledWith(1);
  });

  test('should throw error if there are no sections with id', async() => {
    try {
      await service.deleteSection(1, 5);
    } catch (error) {
      expect(error).toBe('There is no section with this id')
    }
  });

  test('should throw error if section is from another restaurant', async() => {
    try {
      await service.deleteSection(1, 3);
    } catch (error) {
      expect(error).toBe('This section does not belong to your restaurant')
    }
  });
});