@echo off
:1
echo [INFO] Getting the latest info...
git pull
echo [SUCCESS] Finished getting the latest info
echo [INFO] Starting AleeMod
node aleemod.js
goto 1
