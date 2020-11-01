import * as queries from './sections.queries';
import { Section, SectionData, SectionDataOptional } from './sections.types';

export const createSection = async (section: SectionData, restaurantId: number): Promise<number> => {
  const currSection = await queries.getSectionByName(section.name, restaurantId);
  if (currSection) {
    throw('There is already section with this name')
  }
  return await queries.insertSection({ ...section, restaurantId })
}

export const getSection = async (id: number): Promise<Section> => {
  const section = await queries.getSectionById(id);
  if (!section) {
    throw('There is no section with this id');
  }
  return section;
}

export const getSectionByRestaurant = async (restaurantId: number): Promise<Section[]> => {
  return await queries.getSectionByRestaurant(restaurantId);
}

export const updateSection = async (
  section: SectionDataOptional,
  restaurantId: number,
  sectionId: number,
): Promise<void> => {
  const currSection = await queries.getSectionById(sectionId);
  if (!currSection) {
    throw('There is no section with this id');
  }
  if (currSection.restaurantId !== restaurantId) {
    throw('This section does not belong to your restaurant');
  }
  await queries.updateSection(section, sectionId);
};

export const deleteSection = async(restaurantId: number, sectionId: number): Promise<void> => {
  const currSection = await queries.getSectionById(sectionId);
  if (!currSection) {
    throw('There is no section with this id');
  }
  if (currSection.restaurantId !== restaurantId) {
    throw('This section does not belong to your restaurant');
  }
  await queries.deleteSection(sectionId);
}
