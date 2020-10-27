const OFFSET = ' ';

export interface PropInfo<T> {
  json?: boolean;
  source?: string;
  dbAlias?: string;
  serialize?: (value: T) => unknown;
}

export type PropsProcessors<T, K extends keyof T = keyof T> = {
  [k in K]: PropInfo<T[k]>;
};

export function getSelectClause<T, K extends keyof T = keyof T>(
  propInfo: PropsProcessors<T>,
): string {
  return (Object.entries(propInfo) as [K, PropInfo<T[K]>][])
    .map(([property, { json, source, dbAlias = property }]) => {
      if (!json && !source) {
        return `${OFFSET}${dbAlias} as "${property}"`;

      }
      const path = source ? `${source}.${dbAlias}` : dbAlias;
      const dbProp = json ? `to_json(${path})` : path;
      return `${OFFSET}${dbProp} as "${property}"`;
    })
    .join(',\n');
}

export function getInsertClauses<T>(
  entry: T,
  propInfo: PropsProcessors<T>,
): [string, unknown[], string] {
  const keys = Object
    .keys(propInfo)
    .filter((prop) => Object.prototype.hasOwnProperty.call(entry, prop)) as Array<keyof T>;
  const props = keys
    .map((prop: keyof T) => (propInfo[prop].dbAlias ?? prop))
    .join(', ');
  const values = keys.map((key) => {
    const { json } = propInfo[key];
    const serialize = propInfo[key].serialize ?? (json ? JSON.stringify : undefined);

    return serialize?.(entry[key]) ?? entry[key];
  });
  const valueIdxs = keys.map((_, idx) => `$${idx + 1}`).join(', ');
  return [props, values, valueIdxs];
}

export function getUpdateClauses<T>(
  entry: T,
  propInfo: PropsProcessors<T>,
): [string, unknown[], number] {
  const keys = Object
    .keys(propInfo)
    .filter((prop) => Object.prototype.hasOwnProperty.call(entry, prop)) as Array<keyof T>;
  const props = keys
    .map((prop: keyof T) => (propInfo[prop].dbAlias ?? prop));
    const values = keys.map((key) => {
    const { json } = propInfo[key];
    const serialize = propInfo[key].serialize ?? (json ? JSON.stringify : undefined);

    return serialize?.(entry[key]) ?? entry[key];
  });
  const valueIdxs = keys.map((_, idx) => `$${idx + 1}`);
  const updateClause = props.map((prop, indx) => (
    `${prop} = ${valueIdxs[indx]}`
  )).join(',\n');
  const nextIndx = valueIdxs.length + 1;
  return [updateClause, values, nextIndx];
}