@echo off
for /f "tokens=1,2 delims==" %%a in (.env) do (
set %%a=%%b
)