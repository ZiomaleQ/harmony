import type { Gateway, GatewayEventHandler } from '../mod.ts'

export const reconnect: GatewayEventHandler = async (
  gateway: Gateway,
  d: any
) => {
  gateway.client.emit('reconnect', gateway.shards?.[0] ?? 0)
  gateway.reconnect()
}
