import { getInsertClauses, getSelectClause, getUpdateClauses } from '../libs/db/typeMapping';
import { query } from '../libs/db';
import { Token } from './tokens.types';

const tokenProps = {
  tokenId: { dbAlias: 'id' },
  updatedAt: { dbAlias: 'updated_at' }
};

const tokenIdProp = {
  userId: { dbAlias: 'user_id' },
};

const fullTokenProps = { ...tokenProps, ...tokenIdProp };

export async function getToken(userId: string): Promise<Token> {
  const selectClause = getSelectClause(fullTokenProps)
  return (await query(`
    SELECT 
      ${selectClause}
    FROM Token WHERE user_id=$1`,
    [userId])
  ).rows[0];
}

export async function updateToken({ userId, tokenId, updatedAt }: Token): Promise<void> {
  const [updateClause, values, nextIndx] = getUpdateClauses({ tokenId, updatedAt }, tokenProps);
  console.dir({ updateClause, values, nextIndx });
  console.dir({ text: `
  UPDATE Token
  SET 
    ${updateClause}
  WHERE user_id = $${nextIndx}`, arr: [...values, userId] })
  await query(`
    UPDATE Token
    SET 
      ${updateClause}
    WHERE user_id = $${nextIndx}`,
    [...values, userId]
  );
}

export async function insertToken(token: Token): Promise<void> {
  const [props, values, valueIdxs] = getInsertClauses(token, fullTokenProps)
  await query(`
    INSERT INTO Token(${props})
    VALUES (${valueIdxs})`,
    values
  );
}
