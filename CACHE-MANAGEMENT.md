# Gestión de Caché - ATD PERU Website

## Problema Resuelto

Este documento explica cómo se resolvió el problema de caché en el servidor compartido donde los cambios no se reflejaban automáticamente en el navegador.

## Soluciones Implementadas

### 1. Configuración de .htaccess

- **HTML files**: Sin caché (0 segundos)
- **CSS/JS files**: Cache de 1 hora con `must-revalidate`
- **Images**: Cache de 1 semana
- **Fonts**: Cache de 1 mes

### 2. Meta Tags Anti-Caché

Se agregaron a todos los archivos HTML:

```html
<meta
  http-equiv="Cache-Control"
  content="no-cache, no-store, must-revalidate"
/>
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

### 3. Versionado de Archivos (Cache Busting)

- Se implementó versionado automático basado en hash MD5
- Los archivos CSS/JS ahora incluyen parámetros de versión: `style.css?v=465f9e4f`
- Script automático para generar nuevas versiones

## Cómo Usar

### Para Actualizar Versiones Automáticamente:

1. Ejecutar: `update-versions.bat` (Windows) o `node version-generator.js` (cualquier OS)
2. Subir todos los archivos modificados al servidor
3. Los navegadores cargarán automáticamente las nuevas versiones

### Para Desarrollo:

- Los archivos HTML no tienen caché
- Los archivos CSS/JS tienen caché corto (1 hora)
- Cada vez que cambies un archivo, ejecuta el script de versionado

### Para Producción:

- Considera aumentar los tiempos de caché en `.htaccess`
- Usa el versionado para forzar actualizaciones cuando sea necesario

## Archivos Modificados

### .htaccess

- Configuración de caché optimizada para desarrollo
- Headers de control de caché mejorados

### Archivos HTML

- `index.html`
- `experiencia.html`
- `servicios.html`
- `nosotros.html`
- `contacto.html`
- `trabaja-con-nosotros.html`

### Archivos Nuevos

- `version-generator.js` - Script para generar versiones
- `update-versions.bat` - Script de Windows para actualizar versiones
- `file-versions.json` - Archivo con las versiones actuales
- `file-versions.php` - Configuración PHP (opcional)

## Verificación

Para verificar que funciona:

1. Haz un cambio en `css/style.css`
2. Ejecuta `update-versions.bat`
3. Sube los archivos al servidor
4. Recarga la página - debería mostrar los cambios inmediatamente

## Notas Importantes

- **No elimines** los archivos `file-versions.json` y `file-versions.php`
- **Ejecuta siempre** el script de versionado después de modificar CSS/JS
- **Para producción**, considera ajustar los tiempos de caché en `.htaccess`
- **Los meta tags** anti-caché son solo para desarrollo - puedes removerlos en producción

## Troubleshooting

Si los cambios aún no se reflejan:

1. Verifica que el archivo `.htaccess` se subió correctamente
2. Confirma que las versiones se actualizaron en los HTML
3. Prueba en modo incógnito
4. Verifica que el servidor soporta mod_headers y mod_expires
