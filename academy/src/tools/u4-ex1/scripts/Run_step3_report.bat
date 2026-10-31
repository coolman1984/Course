@echo off
rem One step on its own (Run_Tool.bat one folder up runs every step in order).
cd /d "%~dp0.."
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0step3_report.ps1"
pause
