const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let sugerencia = args.slice(0).join(' ');
  let sugerencialog = client.channels.find('name', 'sugerencias');
  if (!sugerencialog) return message.reply('No puedo encontrar el canal de sugerencias');
  if (sugerencia.length < 1) return message.reply('Debes escribir la sugerencia.');
  const embed = new Discord.RichEmbed()
  .setAuthor(`Sugerido por: @${message.author.username}`,message.author.avatarURL)
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Sugerencia:** ${sugerencia}`);
  return client.channels.get(sugerencialog.id).send({embed})
  .then(msg => {
    msg.react('👍')
    msg.react('👎')});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sugerir',
  description: 'Publica una sugerencia.',
  usage: ' -sugerir [Mensaje]'
};
