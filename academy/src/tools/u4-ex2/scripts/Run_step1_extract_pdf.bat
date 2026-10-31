@echo off
rem One step on its own (Run_Tool.bat one folder up runs every step in order).
cd /d "%~dp0.."
where python >nul 2>nul
if %errorlevel%==0 (python "%~dp0extract_pdf.py") else (py -3 "%~dp0extract_pdf.py")
pause
