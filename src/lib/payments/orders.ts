import { randomUUID } from "node:crypto";
import type { Order, OrderStatus } from "./types";

/**
 * Development order store.
 *
 * Deliberately in-memory and process-local: it keeps the checkout flow
 * end-to-end runnable without provisioning a database. Swap the four functions
 * below for your persistence layer (Postgres, Prisma, Drizzle) before going
 * live — nothing else in the payment code touches storage directly.
 */

const globalForOrders = globalThis as unknown as { __beyondexOrders?: Map<string, Order> };
const store: Map<string, Order> = globalForOrders.__beyondexOrders ?? new Map();
globalForOrders.__beyondexOrders = store;

export function createOrderId() {
  return `BX-${randomUUID().split("-")[0].toUpperCase()}`;
}

export async function saveOrder(order: Order): Promise<Order> {
  store.set(order.id, order);
  return order;
}

export async function findOrder(id: string): Promise<Order | undefined> {
  return store.get(id);
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | undefined> {
  const existing = store.get(id);
  if (!existing) return undefined;
  const next = { ...existing, ...patch };
  store.set(id, next);
  return next;
}

export async function markOrderStatus(
  id: string,
  status: OrderStatus,
  extra: Partial<Order> = {},
): Promise<Order | undefined> {
  return updateOrder(id, {
    status,
    ...(status === "paid" ? { paidAt: new Date().toISOString() } : {}),
    ...extra,
  });
}
