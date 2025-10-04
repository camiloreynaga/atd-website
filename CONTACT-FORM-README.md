# Formulario de Contacto ATD PERU

## Descripción

Sistema completo de formulario de contacto para el sitio web de ATD PERU, compatible con hosting compartido WebHostingWorld.

## Archivos Incluidos

### Archivos Principales

- `contact-form-handler.php` - Script principal que procesa el formulario
- `config.php` - Configuración centralizada del sistema
- `contacto.html` - Página de contacto (ya modificada)
- `js/main.js` - JavaScript actualizado para manejo del formulario

### Archivos de Prueba

- `test-contact-form.html` - Página de prueba del formulario
- `CONTACT-FORM-README.md` - Este archivo de documentación

## Características

### ✅ Funcionalidades Implementadas

- **Envío de emails** a `proyectos@atdperu.pe`
- **Email de confirmación** automático al cliente
- **Validación completa** de datos del formulario
- **Rate limiting** (máximo 5 mensajes por IP por hora)
- **Logs de errores** y envíos
- **Interfaz responsive** con Bootstrap 5
- **Notificaciones** en tiempo real
- **Protección anti-spam** básica

### 📧 Configuración de Emails

- **Email principal**: `proyectos@atdperu.pe`
- **Email de envío**: `noreply@atdperu.pe`
- **Formato**: HTML con diseño profesional
- **Asunto**: `[ATD PERU] Nuevo mensaje de contacto - [Tipo de consulta]`

## Instalación

### 1. Subir Archivos

Sube los siguientes archivos a tu servidor WebHostingWorld:

```
contact-form-handler.php
config.php
contacto.html (ya modificado)
js/main.js (ya modificado)
```

### 2. Configurar Permisos

Asegúrate de que los archivos tengan permisos de lectura:

```bash
chmod 644 contact-form-handler.php
chmod 644 config.php
chmod 644 contacto.html
chmod 644 js/main.js
```

### 3. Configurar Email (Opcional)

Si necesitas cambiar el email de destino, edita `config.php`:

```php
define('CONTACT_EMAIL', 'tu-email@atdperu.pe');
```

## Pruebas

### 1. Prueba Básica

1. Abre `test-contact-form.html` en tu navegador
2. Completa el formulario con datos de prueba
3. Verifica que recibas el email en `proyectos@atdperu.pe`

### 2. Prueba en Producción

1. Visita `contacto.html` en tu sitio web
2. Completa el formulario real
3. Verifica la funcionalidad completa

## Configuración Avanzada

### Rate Limiting

Para cambiar el límite de mensajes por hora, edita `config.php`:

```php
'rate_limit' => 5, // Cambiar este número
```

### Longitud de Mensaje

Para cambiar la longitud máxima del mensaje:

```php
'max_message_length' => 2000, // Cambiar este número
```

### Logs

Los logs se guardan en:

- `contact_log.txt` - Log de envíos exitosos
- `error_log.json` - Log de errores detallados
- `rate_limit.json` - Control de rate limiting

## Solución de Problemas

### Email No Se Envía

1. **Verificar configuración del servidor**: Asegúrate de que PHP `mail()` esté habilitado
2. **Verificar logs**: Revisa `error_log.json` para errores específicos
3. **Contactar soporte**: WebHostingWorld puede tener restricciones de email

### Formulario No Responde

1. **Verificar JavaScript**: Asegúrate de que `js/main.js` se carga correctamente
2. **Verificar consola**: Revisa la consola del navegador para errores
3. **Verificar PHP**: Asegúrate de que `contact-form-handler.php` sea accesible

### Rate Limiting

Si necesitas resetear el rate limiting:

```bash
rm rate_limit.json
```

## Seguridad

### Medidas Implementadas

- ✅ Validación de datos de entrada
- ✅ Sanitización de HTML
- ✅ Rate limiting por IP
- ✅ Validación de email
- ✅ Verificación de política de privacidad
- ✅ Logs de seguridad

### Recomendaciones Adicionales

- Configurar HTTPS en el sitio
- Implementar CAPTCHA si hay mucho spam
- Monitorear logs regularmente
- Actualizar PHP regularmente

## Soporte

### Archivos de Log

- `contact_log.txt` - Registro de envíos exitosos
- `error_log.json` - Errores detallados con contexto
- `rate_limit.json` - Control de límites de envío

### Monitoreo

Revisa regularmente los logs para:

- Errores de envío de email
- Intentos de spam
- Problemas de configuración

## Contacto Técnico

Para soporte técnico del formulario, contacta al desarrollador o revisa la documentación de WebHostingWorld para configuración de PHP mail().

---

**ATD PERU** - Servicios de Construcción y Consultoría  
_Implementado para hosting compartido WebHostingWorld_

