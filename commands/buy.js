/********************************
 * 
 * Buy: Command for AleeBot
 * 
 * Copyright (c) 2018 AleeCorp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ********************************/
module.exports.run = async (client, message, args) => {
    const economy = require('discord-eco')
    const Discord = require('discord.js');
    const fs = require('fs')
    const items = JSON.parse(fs.readFileSync('./items.json', 'utf8'));
        
        let categories = []; 

        if (!args.join(" ")) { 

           
            for (var i in items) { 

                
                if (!categories.includes(items[i].type)) {
                    categories.push(items[i].type)
                }

            }

            
            const embed = new Discord.RichEmbed()
                .setDescription(`Available Items`)
                .setColor('#1fd619')

            for (var i = 0; i < categories.length; i++) { 

                var tempDesc = '';

                for (var c in items) {
                    if (categories[i] === items[c].type) {

                        tempDesc += `${items[c].name} - ${items[c].price}$ - ${items[c].desc}\n`;

                    }

                }

                embed.addField(categories[i], tempDesc);

            }

            
            return message.channel.send({
                embed
            });
  

        }

        let itemName = '';
        let itemPrice = 0;
        let itemDesc = '';

        for (var i in items) { 
            if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) { 
                itemName = items[i].name;
                itemPrice = items[i].price;
                itemDesc = items[i].desc;
            }
        }

        
        if (itemName === '') {
            return message.channel.send(`Item ${args.join(" ").trim()} not found.`)
        }

        
        economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
            if (i.money <= itemPrice) {

                return message.channel.send(`You don't have enough money for this item.`);
            }

            economy.updateBalance(message.author.id + message.guild.id, parseInt(`-${itemPrice}`)).then((i) => {

                message.channel.send('You bought ' + itemName + '!');

                
                if (itemName === 'Programmer Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Programmers"));
                }

            })

        })
    
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'buy',
    description: 'Buy things.',
    usage: 'buy [item]',
    category: '- Economy Commands',
  };
  