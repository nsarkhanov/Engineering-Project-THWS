@echo off
REM Activate virtual environment
call venv\Scripts\activate.bat
REM Run main.py
python backend\main.py
timeout /t 52 /nobreak
REM Run node server.js in the background
start "" node mongodb\server.js
REM Wait for 2 seconds
timeout /t 2 /nobreak
