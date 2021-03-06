import type { Gateway, GatewayEventHandler } from '../mod.ts'
import { Guild } from '../../structures/guild.ts'
import { InviteCreatePayload } from '../../types/gateway.ts'
import { GuildPayload } from '../../types/guild.ts'
import { InvitePayload } from '../../types/invite.ts'

export const inviteCreate: GatewayEventHandler = async (
  gateway: Gateway,
  d: InviteCreatePayload
) => {
  const guild: Guild | undefined = await gateway.client.guilds.get(d.guild_id ?? "")

  // Hack around <GuildManager>.get that value can be null
  if (guild === undefined) return

  /**
   * TODO(DjDeveloperr): Add _get method in BaseChildManager
   */
  const cachedChannel = await gateway.client.channels._get(d.channel_id)

  // Hack around <ChannelManager>.get that value can be null
  if (cachedChannel === undefined) return

  const cachedGuild: GuildPayload | undefined = d.guild_id === undefined
    ? undefined
    : await guild.client.guilds._get(d.guild_id)

  const dataConverted: InvitePayload = {
    code: d.code,
    guild: cachedGuild,
    channel: cachedChannel,
    inviter: d.inviter,
    target_user: d.target_user,
    target_user_type: d.target_user_type
  }

  await guild.invites.set(d.code, dataConverted)
  const invite = await guild.invites.get(d.code)
  gateway.client.emit('inviteCreate', invite)
}
