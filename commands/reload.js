exports.run = (client, message, args) => {
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send(`I cannot find the command: ${args[0]}`);
  } else {
    message.channel.send(`Recargando: ${command} ⏳`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`Recargado exitosamente: ${command} 👌`);
          })
          .catch(e => {
            m.edit(`La recarga del comando falló: ${command}\n\`\`\`${e.stack}\`\`\` 🙊`);
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: 'Recarga comandos cuando fueron modificados.',
  usage: 'reload <comando>'
};
