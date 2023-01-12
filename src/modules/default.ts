import { applicationCommand, Extension, listener } from "@pikokr/command.ts"
import { ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js"

class DefaultExtension extends Extension {
  @listener({ event: "ready" })
  async ready() {
    this.logger.info(`Logged in as ${ this.client.user!.tag }`)
    await this.commandClient.fetchOwners()
  }

  @applicationCommand({
    name: "핑",
    type: ApplicationCommandType.ChatInput,
    description: "봇의 핑을 출력합니다"
  })
  async ping(i: ChatInputCommandInteraction) {
    await i.reply(`current ping: ${ i.client.ws.ping }ms`)
  }

  @applicationCommand({
    name: "정보",
    type: ApplicationCommandType.ChatInput,
    description: "봇의 정보를 출력합니다"
  })
  async info(i: ChatInputCommandInteraction) {
    const infoEmbed = new EmbedBuilder()
      .setThumbnail(i.client.user!.displayAvatarURL())
      .addFields(
        { name: "봇 이름", value: i.client.user!.tag, inline: true },
        { name: "봇 ID", value: i.client.user!.id, inline: true },
        { name: "개발자", value: "스타샤#6724", inline: true },
        { name: "버전", value: `v${ process.env.npm_package_version }`, inline: true }
      )
      .setFooter({ text: "Made by Command.TS" })
    await i.reply({ embeds: [infoEmbed] })
  }
}

export const setup = async () => {
  return new DefaultExtension()
}
