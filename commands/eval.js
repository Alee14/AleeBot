const Discord = require('discord.js');
exports.run = (client, message, args, config) => {
if(message.author.id !== config.ownerID) return;
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
const argseval = message.content.split(" ").slice(1);
  try {
    var code = argseval.join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
    message.delete();

    message.channel.send({
      embed: {
        color: 3191350,
        author: {
          name: "Eval is working!",
          icon_url: message.author.displayAvatarURL
        },
        fields: [{
            name: '**:inbox_tray: Input**',
            value: `\`\`\`js\n${code}\n\`\`\``
          },
          {
            name: '**:outbox_tray: Output**',
            value: `\`\`\`js\n${clean(evaled)}\n\`\`\``
          }
        ],
      }
    })
  } catch (err) {
    message.delete();

    message.channel.send({
      embed: {
        color: 3191350,
        author: {
          name: "Error",
          icon_url: message.author.displayAvatarURL
        },
        fields: [{
            name: '**Please check your code.**',
            value: `\`\`\`xl\n${clean(err)}\n\`\`\``
          },
          {
            name: '**Output**',
            value: `\`\`\`js\n${clean(evaled)}\n\`\`\``
          }
        ],
      }
    })
  }
}
