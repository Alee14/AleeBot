/****************************************
 * 
 *   Ask: Command for AleeBot
 *   Copyright (C) 2017-2020 Alee Productions
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * *************************************/
module.exports.run = async (client, message, args) => {
    let abaskanswer = [
        "Yes.",
        "Nope. Just kidding :P",
        "Definitely!",
        "No.",
        "Yep. Just kidding :P",
        "I doubt it.",
        "Maybe?",
        "I don't know?",
        "Hmm let me think :thinking:"
      ];
      if (args[1]) {
         message.channel.sendMessage(abaskanswer[Math.floor(Math.random() * abaskanswer.length)]);
      } else {
        message.channel.sendMessage("Sorry, I don't know what your saying.")
      }
  };
  
  exports.conf = {
    aliases: ['8ball'],
    guildOnly: false,
  };
  exports.help = {
    name: 'ask',
    description: 'Give AleeBot a question!',
    usage: 'ask [args]',
    category: '- Fun Commands',
  };
  