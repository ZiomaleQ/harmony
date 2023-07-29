import { Mixin } from "../../../deps.ts";
import type { Client } from "../../client/mod.ts";
import { TextChannel } from "./textChannel.ts";
import { GuildChannel } from "./guildChannel.ts";
import type { GuildTextBasedChannelPayload } from "../../../../types/mod.ts";

export class GuildTextBasedChannel<T extends GuildTextBasedChannelPayload>
  extends Mixin(GuildChannel, TextChannel) {
  constructor(client: Client, payload: T) {
    super(client, payload);
  }

  // async bulkDelete(
  //   messages: Array<Message | string> | number
  // ): Promise<void> {
  // }
}
