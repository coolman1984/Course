@echo off
title Ready tool - one click
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Run_Tool.ps1"
echo.
if errorlevel 1 (
  echo The tool STOPPED with a clear reason: read the last lines above, or Output\Run_Log.txt.
) else (
  echo Done. The results are in the Output folder, next to Data.
)
echo.
pause
