/* eslint-disable @typescript-eslint/no-unused-vars */
import { getSelectClause, getInsertClauses, getUpdateClauses } from '../typeMapping';

const propInfo = {
  email: {},
  firstName: { dbAlias: 'first_name' },
  abc: { source: 'Table2' },
  json: { json: true, serialize: (obj: Record<string, unknown>) => JSON.stringify(obj)}
};

describe('getSelectClause tests', () => {
  test('should return SELECT clause', async() => {
    const res = getSelectClause(propInfo);
    expect(res).toBe(
      ' email as "email",\n'
      + ' first_name as "firstName",\n'
      + ' Table2.abc as "abc",\n'
      + ' to_json(json) as "json"'
    );
  });
})

describe('getInsertClauses tests', () => {
  test('should return INSERT clauses', () => {
    const entry = {
      email: 'hello@gmail.com',
      firstName: 'Ivan',
      json: {
        a: '12',
        b: '22',
      }
    }
    const [props, values, valueIdxs] = getInsertClauses(entry, propInfo);
    expect(props).toBe('email, first_name, json');
    expect(values).toEqual([
      entry.email,
      entry.firstName,
      JSON.stringify(entry.json),
    ]);
    expect(valueIdxs).toBe('$1, $2, $3');
  });
});

describe('getUpdateClauses tests', () => {
  test('should return UPDATE clauses', () => {
    const entry = {
      email: 'hello@gmail.com',
      firstName: 'Ivan',
      json: {
        a: '12',
        b: '22',
      }
    }
    const [updateClause, values, nextIndx] = getUpdateClauses(entry, propInfo);
    expect(updateClause).toBe('email = $1,\nfirst_name = $2,\njson = $3');
    expect(values).toEqual([
      entry.email,
      entry.firstName,
      JSON.stringify(entry.json),
    ]);
    expect(nextIndx).toBe(4);
  });
})