/* eslint-disable @typescript-eslint/no-unused-vars */

export class DefaultDbMock<T, TData, TOptional> {
  units: T[] = [];

  __setDbData = (data: T[]): void => {
    this.units = data;
  }

  selectOne = (predicate: (unit: T) => boolean): Promise<T> => {
    return new Promise((resolve) =>
      resolve(this.units.find(predicate))
    );
  }

  selectMany = (predicate: (unit: T) => boolean): Promise<T[]> => {
    return new Promise((resolve) =>
      resolve(this.units.filter(predicate))
    );
  }

  insert = (_unit: TData): Promise<number> => {
    return new Promise((resolve) => resolve(this.units.length + 1));
  }

  update = (_unit: TOptional, _id: number): Promise<void> => {
    return new Promise((resolve) => resolve());
  }

  delete = (_id: number): Promise<void> => {
    return new Promise((resolve) => resolve());
  }
}
