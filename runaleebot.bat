@echo off
:1
echo [INFO] Getting the latest info...
git pull
echo [SUCCESS] Finished getting the latest info
echo [INFO] Starting AleeBot
node aleebot.js
goto 1
