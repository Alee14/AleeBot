:: This was made by Legit Ezra (https://github.com/LegitEzra)
@echo off
title Choose Color
echo Welcome Please Choose A Color.
echo.
echo Type the first letter for the color you want or D for Default.
echo This will only change the text color
echo.
echo Default/Color you are seeing now
echo Green
echo Red
echo Blue
echo White
echo.

:color
set /P c=Type Color Letter Then Press Enter.[G/R/B/W/D/] 
if /I "%c%" EQU "G" goto :G
if /I "%c%" EQU "R" goto :R
if /I "%c%" EQU "B" goto :B
if /I "%c%" EQU "W" goto :W
if /I "%c%" EQU "d" goto :D
echo "%c%" is not an option please try again!
goto :color

:G
title Aleebot Console
cls
color 02
cd %~dp0
node aleebot.js
pause

:R
title AleeBot Console
cls
color 04
cd %~dp0
node aleebot.js
pause

:B
title AleeBot Console
cls
color 01
cd %~dp0
node aleebot.js
pause

:W
title Aleebot Console
cls 
color 0f
cd %~dp0
node aleebot.js
pause

:D
title AleeBot Console
cls
cd %~dp0
node aleebot.js
pause
