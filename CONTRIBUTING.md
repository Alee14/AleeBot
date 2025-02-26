# Contributing to AleeBot
If you want to help me make AleeBot you must get NodeJS to make AleeBot work.
Include the GPL-3.0 license too and follow the following format when you create a new file:
```js
/****************************************
 * 
 *   [Command/Plugin]: (Command or Plugin) for AleeBot
 *   Copyright (C) 2017-2023 Andrew Lee & (your name here)
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

 module.exports.run = async (client, message) => {
  // Code here
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'name here',
  description: 'Description here.',
  usage: 'Usage [here]',
  category: '- [Category] Commands',
};
```

# Testing the bot

First get NodeJS then clone this repo then do `npm install` or `yarn install` in the AleeBot folder. Now add a file called `tokens.json` then copy and paste this follow code.
```json
{
  "abtoken": "token",
  "mongoPath": "mongodb://127.0.0.1:27017/aleebot",
  "port": 3000
}
```
Then get your token from discord and replace `token` with your token. After that, install MongoDB and run it. Finally, run this in linux `./run_linux.sh` or for windows `run_win.bat` or `npm/yarn start`.
