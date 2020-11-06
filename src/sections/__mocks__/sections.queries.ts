/* eslint-disable @typescript-eslint/no-unused-vars */
import { Section, SectionData, SectionDataOptional } from '../sections.types';
import { DefaultDbMock } from '../../testing.utils/dbMock';

const db = new DefaultDbMock<Section, SectionData & { restaurantId: number }, SectionDataOptional>();
export const __setDbData = db.__setDbData;

export const getSectionByName = async (name: string, restaurantId: number): Promise<Section> => {
  return await db.selectOne((section) =>
    section.name === name && section.restaurantId === restaurantId
  );
};

export const getSectionById = async (id: number): Promise<Section> => {
  return await db.selectOne((section) =>
    section.id === id
  );
}

export const getSectionByRestaurant = async (restaurantId: number): Promise<Section[]> => {
  return await db.selectMany((section) =>
    section.restaurantId === restaurantId
  );
}

export const insertSection = db.insert;

export const updateSection = db.update;

export const deleteSection = db.delete;