@echo off
title AleeBot Console

echo Welcome to the AleeBot Console.
echo If you want to self-host this bot, please continue by executing the following steps:
echo 1. Create a absettings.json file and include the token of your bot user so that the bot does not error out when connecting to Discord Servers.
echo 2. You will need to edit this file that you ran, and remove the 'git pull" line. This causes errors as it will try to pull from the AleeBot git.
echo 3. Finally, you must credit the developers (AleeCorp Developers will work fine).
echo --------------------------------------------------------------------------------
echo To start the bot when you are ready, type in 'Yes'.
set /p start=

if %start% == Yes goto a
if %start% == yes goto a
if %start% == y goto a
if %start% == debug goto ad

echo Exiting...
pause>nul
exit
:a
git pull
node bot_discord.js
goto a
:ad
git pull
node bot_discord.js --debug
goto ad