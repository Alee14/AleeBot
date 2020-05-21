@echo off
title AleeBot Console
:main
echo Welcome to the AleeBot Console.
echo If you want to self-host this bot, please continue by executing the following steps:
echo 1. Create a tokens.json file and include the token of your bot user so that the bot does not error out when connecting to Discord Servers.
echo 2. You will need to edit this file that you ran, and remove the "git pull" line. This causes errors as it will try to pull from the AleeBot git.
echo 3. Finally, you must credit the developers (Alee Productions Developers will work fine).
echo --------------------------------------------------------------------------------
echo To start the bot when you are ready, type in 'Yes/yes/y' or type in 'debug' to enter debug mode or type in 'beta' to enter beta mode.
set /p start=user@AleeBot:~$ 
if %start% == Yes goto a
if %start% == yes goto a
if %start% == y goto a
if %start% == debug goto ad
if %start% == beta goto ab
if %start% == no goto cexit
if %start% == No goto cexit
if %start% == exit goto cexit
if %start% == easteregg goto easter
if %start% == other goto error
:error
echo Bad command
echo.
pause>nul
cls
goto main
:a
git pull
node bot_discord.js
goto a
:ad
echo.
git pull
node bot_discord.js --debug
goto ad
:ab
git pull
node bot_discord.js --beta
goto ab
:easter
echo Hey... there is no easter egg...
cls
goto main
:cexit
echo Exiting...
pause>nul
exit
