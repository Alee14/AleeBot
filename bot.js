client.on('message', message => {
    if(message.content === 'aleebot:profile'){
        message.reply(message.author.avatarURL);
    }

 });
 