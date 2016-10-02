:start
node index.js
echo WAITING 3 SECONDS BEFORE RESTARTING
ping -n 4 127.0.0.1 >nul
goto start