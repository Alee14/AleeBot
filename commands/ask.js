/********************************
 * 
 * Ask / 8ball: Command for AleeBot
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
  