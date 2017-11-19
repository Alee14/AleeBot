/*********************************************
 *
 *	AleeBot for Alee's Lounge telegram chat
 *	Copyright (C) 2017 AleeCorp
 *	License: MIT
 *
 **********************************************/
 const TelegramBot = require('node-telegram-bot-api');
 const abVersion = ('1.0 Beta');
 var token = "506287133:AAFUxedYBjhvjNSO6HFitJqk-tLjZ1gY864";
 var opt = {polling: true};
 var bot = new TelegramBot(token, opt);

 bot.on('message', function (msg) {
    console.log(msg);
    var id = msg.chat.id;
    var echo = msg.text;

    bot.sendMessage(id, echo);
 });