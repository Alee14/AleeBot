#!/bin/bash
echo 'Welcome to the AleeBot Console.'
echo 'If you want to self-host this bot, please continue by executing the following steps:'
echo '1. Create a tokens.json file and include the token of your bot user so that the bot does not error out when connecting to Discord Servers.'
echo '2. You will need to edit this file that you ran, and remove the "git pull" line. This causes errors as it will try to pull from the AleeBot git.'
echo '3. Finally, you must credit the developers (Alee Productions Developers will work fine).'
echo '--------------------------------------------------------------------------------'
echo "To start the bot when you are ready, type in 'Yes/yes/y' or type in 'debug' to enter debug mode or type in 'beta' to enter beta mode."
while true
do
read -r -p "> " input

case $input in
    [yY] | [yY][eE][sS])
    for (( ; ; ))
    do
    git pull
    node bot_discord.js
    sleep 2
    done
    ;;
    [dD][eE][bB][uU][gG])
    for (( ; ; ))
    do
    node bot_discord.js --debug
    sleep 2
    done
    ;;
    [bB][eE][tT][aA])
    for (( ; ; ))
    do
    node bot_discord.js --beta
    sleep 2
    done
    ;;
    [nN] | [nN][oO])
    exit 1
    ;;
     *)
echo "Bad command"
    ;;
esac
    done