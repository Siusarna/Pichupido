import { getInsertClauses, getUpdateClauses } from '../libs/db/typeMapping';
import { query } from '../libs/db';
import { Order, OrderOptional } from './orders.types';

const orderProps = {
  id: { source: 'Order' },
  kitchenNotes: { dbAlias: 'kitchen_notes', source: 'Order' },
  paymentMethod: { dbAlias: 'payment_method', source: 'Order' },
  paid: { dbAlias: 'paid', source: 'Order' },
  tableId: { dbAlias: 'table_id', source: 'Order' },
  cart: { source: 'Order', json: true },
  status: { source: 'Order' },
  stripePaymentIntentId: { dbAlias: 'stripe_payment_intent_id', source: 'Order' }
};

export const insertOrder = async (order: Order): Promise<Order & { id:number }> => {
  const [props, values, valueIdxs] = getInsertClauses(order, orderProps);
  return (await query(`
  INSERT INTO "Order"(${props})
  VALUES(${valueIdxs})
  RETURNING *
  `, values)).rows[0];
};

export const getOrderById = async (id: number): Promise<Order> => {
  return (await query(`
  SELECT *, stripe_payment_intent_id as "stripePaymentIntentId"
  FROM "Order"
  WHERE "Order"."id" = $1
  `, [id])).rows[0];
};

export const updateOrder = async (order: OrderOptional, id: number): Promise<void> => {
  const [updateClause, values, nextIndx] = getUpdateClauses(order, orderProps);
  await query(`
  UPDATE "Order"
  SET ${updateClause}
  WHERE id = $${nextIndx}
  `, [...values, id]);
}
