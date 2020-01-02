#!/bin/bash
echo 'Welcome to AleeBot!'
for (( ; ; ))
do
    git pull
    node bot_discord.js
done