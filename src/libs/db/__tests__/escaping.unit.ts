import { escapeArray, escapeIdentifier } from '../escaping';

describe('escapeIdentifier tests', () => {
  test('should escape quotes', () => {
    const res = escapeIdentifier('Ivan\'; DROP TABLE USER');
    expect(res).toBe('Ivan\\\'; DROP TABLE USER')
    const res2 = escapeIdentifier('Ivan"; DROP TABLE USER');
    expect(res2).toBe('Ivan\\"; DROP TABLE USER')
  });

  test('should escape backslash', () => {
    const res = escapeIdentifier('abc\\de');
    expect(res).toBe('abc\\\\de')
  })

  test('should escape all occurrences of dangerous symbols', () => {
    const res = escapeIdentifier('abc\\d\'\'ef"g"\\');
    expect(res).toBe('abc\\\\d\\\'\\\'ef\\"g\\"\\\\');
  });
})

describe('escapeArray tests', () => {
  test('should escape all occurrences of dangerous symbols in array', () => {
    const res = escapeArray([
      'Ivan\'; DROP TABLE USER',
      'abc\\de',
      'abc\\d\'\'ef"g"\\',
    ])

    expect(res).toEqual([
      'Ivan\\\'; DROP TABLE USER',
      'abc\\\\de',
      'abc\\\\d\\\'\\\'ef\\"g\\"\\\\',
    ])
  });
});