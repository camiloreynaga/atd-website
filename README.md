# 🏗️ ATD PERU - Sitio Web Corporativo

Sitio web moderno y responsive para ATD PERU, empresa líder en servicios de construcción, consultoría e ingeniería en Perú.

## ✨ Características Principales

### 🎨 **Diseño y UX**

- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Interfaz Moderna**: Utiliza Bootstrap 5 y CSS moderno
- **Animaciones Suaves**: Implementa AOS (Animate On Scroll)
- **Paleta de Colores**: Esquema profesional y atractivo
- **Tipografía**: Fuente Montserrat para mejor legibilidad

### 🚀 **Tecnologías Implementadas**

- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Flexbox, Grid, Animaciones
- **Bootstrap 5**: Framework CSS responsive
- **JavaScript ES6+**: Funcionalidades interactivas
- **AOS**: Animaciones al hacer scroll
- **Bootstrap Icons**: Iconografía moderna

### 📱 **Funcionalidades**

- **Navegación Responsive**: Menú móvil optimizado
- **Formularios Interactivos**: Contacto y aplicaciones laborales
- **Galería de Proyectos**: Filtros y lightbox
- **Mapas Integrados**: Google Maps embebido
- **SEO Optimizado**: Meta tags y estructura semántica
- **Loading Spinner**: Experiencia de usuario mejorada

## 📁 Estructura del Proyecto

```
atd-website/
├── index.html                 # Página principal
├── nosotros.html             # Página "Nosotros"
├── servicios.html            # Página de servicios
├── proyectos.html            # Portafolio de proyectos
├── contacto.html             # Página de contacto
├── trabaja-con-nosotros.html # Oportunidades laborales
├── css/
│   └── style.css            # Estilos principales
├── js/
│   └── main.js              # JavaScript principal
├── images/                   # Imágenes del sitio
├── fonts/                    # Fuentes personalizadas
└── README.md                 # Este archivo
```

## 🛠️ Instalación y Configuración

### **Requisitos Previos**

- Servidor web (Apache, Nginx, o hosting compartido)
- Navegador web moderno
- Conexión a internet (para CDNs)

### **Pasos de Instalación**

1. **Descargar el Proyecto**

   ```bash
   # Clonar desde Git (si está en repositorio)
   git clone [URL_DEL_REPOSITORIO]

   # O descargar y extraer el ZIP
   ```

2. **Subir al Servidor**

   - Subir todos los archivos a tu directorio web
   - Asegurar que la estructura de carpetas se mantenga

3. **Configurar el Dominio**

   - Apuntar tu dominio al directorio donde subiste los archivos
   - Verificar que `index.html` esté en la raíz

4. **Verificar Permisos**
   - Archivos: 644
   - Carpetas: 755

### **Configuración del Hosting**

#### **Hosting Compartido (WebHostingWorld)**

- Subir archivos vía FTP o File Manager
- Verificar que PHP esté habilitado (para formularios)
- Configurar redirecciones si es necesario

#### **Configuración de Formularios**

Los formularios están configurados para funcionar con:

- **PHP**: Enviar emails directamente
- **Servicios de Formularios**: Formspree, Netlify Forms
- **APIs de Email**: SendGrid, Mailgun

## 🎯 Páginas y Secciones

### **🏠 Página Principal (index.html)**

- Hero section con carrusel
- Información de la empresa
- Servicios destacados
- Contadores animados
- Carrusel de clientes
- Sección de contacto rápida

### **👥 Nosotros (nosotros.html)**

- Historia de la empresa
- Misión, visión y valores
- Equipo directivo
- Certificaciones ISO
- Línea de tiempo

### **🔧 Servicios (servicios.html)**

- Catálogo completo de servicios
- Descripción detallada
- Ventajas competitivas
- Llamadas a la acción

### **📋 Proyectos (proyectos.html)**

- Portafolio de obras
- Filtros por categoría
- Galería de imágenes
- Información detallada
- Mapa de ubicaciones

### **📞 Contacto (contacto.html)**

- Formulario de contacto
- Información de contacto
- Mapa de ubicación
- Preguntas frecuentes

### **💼 Trabaja con Nosotros (trabaja-con-nosotros.html)**

- Vacantes disponibles
- Beneficios laborales
- Proceso de aplicación
- Formulario de aplicación

## 🎨 Personalización

### **Colores y Estilos**

Los colores principales están definidos en variables CSS:

```css
:root {
  --primary-color: #fd2626; /* Rojo principal */
  --secondary-color: #1e2022; /* Negro secundario */
  --accent-color: #f05a5a; /* Rojo claro */
  --text-dark: #333; /* Texto oscuro */
  --text-light: #666; /* Texto claro */
}
```

### **Fuentes**

- **Principal**: Montserrat (Google Fonts)
- **Fallback**: Arial, sans-serif

### **Imágenes**

- **Logo**: `images/logo.png` y `images/logo_b.png`
- **Fondo Hero**: `images/cover_img_1.jpg`
- **Proyectos**: Carpeta `images/` con imágenes de obras

## 📱 Responsive Design

### **Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: > 992px

### **Características Mobile**

- Menú hamburguesa
- Navegación táctil optimizada
- Imágenes responsivas
- Formularios adaptados

## 🚀 Optimización y Rendimiento

### **CDNs Utilizados**

- **Bootstrap 5**: `cdn.jsdelivr.net`
- **Google Fonts**: `fonts.googleapis.com`
- **AOS**: `unpkg.com`

### **Optimizaciones Implementadas**

- Imágenes optimizadas
- CSS minificado
- JavaScript modular
- Lazy loading para imágenes
- Preload de recursos críticos

## 🔧 Mantenimiento

### **Actualización de Contenido**

1. **Proyectos**: Editar `proyectos.html`
2. **Servicios**: Modificar `servicios.html`
3. **Equipo**: Actualizar `nosotros.html`
4. **Vacantes**: Editar `trabaja-con-nosotros.html`

### **Backup Recomendado**

- Hacer backup antes de cambios
- Mantener versiones de archivos
- Documentar modificaciones

## 📊 SEO y Marketing

### **Meta Tags Implementados**

- Title optimizado para cada página
- Description descriptiva
- Keywords relevantes
- Open Graph para redes sociales
- Meta robots para indexación

### **Estructura Semántica**

- HTML5 semántico
- Headings jerárquicos
- Alt text en imágenes
- Schema markup (opcional)

## 🐛 Solución de Problemas

### **Problemas Comunes**

#### **Formularios no funcionan**

- Verificar configuración del servidor
- Revisar permisos de archivos
- Comprobar configuración de email

#### **Imágenes no se muestran**

- Verificar rutas de archivos
- Comprobar permisos de carpetas
- Revisar nombres de archivos

#### **Estilos no se cargan**

- Verificar rutas de CSS
- Comprobar CDNs
- Revisar consola del navegador

### **Debugging**

- Usar herramientas de desarrollador
- Verificar consola del navegador
- Comprobar Network tab
- Validar HTML/CSS

## 📈 Próximas Mejoras

### **Funcionalidades Planificadas**

- [ ] Panel de administración
- [ ] Blog integrado
- [ ] Chat en vivo
- [ ] Sistema de reservas
- [ ] Integración con CRM
- [ ] Analytics avanzado

### **Optimizaciones Técnicas**

- [ ] PWA (Progressive Web App)
- [ ] Service Workers
- [ ] Cache optimizado
- [ ] Lazy loading avanzado
- [ ] Compresión de imágenes

## 📞 Soporte

### **Contacto Técnico**

- **Desarrollador**: KIWI SYSTEMS
- **Email**: soporte@kiwisystems.com
- **Documentación**: Este README

### **Recursos Adicionales**

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [AOS Documentation](https://michalsnik.github.io/aos/)
- [Google Fonts](https://fonts.google.com/)

## 📄 Licencia

Este proyecto fue desarrollado para ATD PERU. Todos los derechos reservados.

---

**Desarrollado con ❤️ por KIWI SYSTEMS**

_Última actualización: Diciembre 2024_
