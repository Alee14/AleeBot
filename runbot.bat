@echo off
:1
echo [INFO] Getting the latest info...
git pull
echo [SUCCESS] Finished getting the latest info
echo [INFO] Starting AleeBot & AleeMod
node aleebot.js && node aleemod.js
goto 1
