@echo off
echo Actualizando versiones de archivos para cache busting...
echo.

REM Ejecutar el generador de versiones
node version-generator.js

echo.
echo Versiones actualizadas exitosamente!
echo.
echo Para aplicar los cambios:
echo 1. Sube todos los archivos modificados al servidor
echo 2. Los navegadores ahora cargarán las nuevas versiones automáticamente
echo.
pause
