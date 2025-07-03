# HYBE Latin America Microsite

Una aplicación web moderna para el equipo de HYBE Latin America, construida con React, TypeScript, Tailwind CSS y Supabase.

## 🚀 Despliegue en Vercel

### Configuración Rápida

1. **Fork o clona este repositorio**

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa este repositorio

3. **Despliega automáticamente:**
   - Vercel detectará automáticamente que es un proyecto Vite
   - El despliegue se iniciará automáticamente
   - **No necesitas configurar variables de entorno** (las credenciales están embebidas en el código)

### Configuración Manual

Si prefieres configurar manualmente:

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión:**
   ```bash
   vercel login
   ```

3. **Despliega:**
   ```bash
   vercel --prod
   ```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la construcción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── sections/       # Secciones de la página
│   ├── ui/            # Componentes UI reutilizables
│   └── Sidebar.tsx    # Navegación lateral
├── hooks/              # Custom React hooks
├── lib/               # Configuración de librerías
└── styles/            # Estilos globales
```

## 🗄️ Base de Datos

La aplicación utiliza Supabase como backend. Las tablas principales incluyen:

- `vacation_requests` - Solicitudes de vacaciones
- `travel_notifications` - Notificaciones de viaje
- `it_equipment_requests` - Solicitudes de equipo IT

## 🎨 Tecnologías

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Framer Motion** - Animaciones
- **Supabase** - Backend y base de datos
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Vite** - Build tool y dev server

## 📱 Características

- ✅ Diseño responsive
- ✅ Navegación suave
- ✅ Formularios interactivos
- ✅ Integración con Supabase
- ✅ Animaciones fluidas
- ✅ Accesibilidad (a11y)
- ✅ SEO optimizado

## 🔧 Configuración de Vercel

El archivo `vercel.json` incluye:

- Configuración de build automática
- Rewrites para SPA routing
- Headers de cache optimizados

## 🔒 Seguridad

Las credenciales de Supabase están embebidas directamente en el código para simplificar el despliegue. Esto es seguro para claves anónimas (anon key) ya que están diseñadas para ser públicas y están protegidas por Row Level Security (RLS) en Supabase.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de desarrollo.