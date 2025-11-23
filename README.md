# 🚀 Mi Portafolio Web - Full Stack

Portafolio personal profesional desarrollado con **Next.js 16**, **TypeScript**, **Tailwind CSS** y **Firebase**. Incluye un sistema completo de administración (CRUD) para gestionar contenido de forma dinámica.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=for-the-badge&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración de Firebase](#-configuración-de-firebase)
- [Variables de Entorno](#-variables-de-entorno)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Despliegue](#-despliegue)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)

---

## ✨ Características

### Portafolio Público
- ✅ **Diseño Responsive** - Adaptado a todos los dispositivos
- ✅ **Sección Hero** - Presentación personal con enlaces a redes sociales
- ✅ **Experiencia Profesional** - Timeline de tu historial laboral
- ✅ **Proyectos Destacados** - Showcase de tus mejores trabajos con imágenes
- ✅ **Habilidades Técnicas** - Grid de tecnologías con iconos personalizados
- ✅ **Navegación Suave** - Scroll animado entre secciones
- ✅ **Tema Personalizado** - Paleta de colores en azul cálido, blanco y gris

### Panel de Administración
- 🔐 **Autenticación Segura** - Login con Firebase Authentication
- 📝 **CRUD Completo** - Gestión de contenido en tiempo real
- 👤 **Editar Perfil** - Actualiza tu información personal
- 💼 **Gestión de Experiencias** - Agregar, editar y eliminar trabajos
- 🚀 **Gestión de Proyectos** - CRUD completo con soporte de imágenes externas
- 💻 **Gestión de Habilidades** - Administra tus skills con iconos emoji
- 🔄 **Sincronización Automática** - Los cambios se reflejan instantáneamente
- 🔒 **Rutas Protegidas** - Solo usuarios autenticados pueden editar

---

## 🛠️ Tecnologías

### Frontend
- **[Next.js 16](https://nextjs.org/)** - Framework de React con App Router
- **[React 19](https://react.dev/)** - Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript con tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utility-first
- **[React Icons](https://react-icons.github.io/react-icons/)** - Biblioteca de iconos

### Backend & Database
- **[Firebase Authentication](https://firebase.google.com/docs/auth)** - Autenticación de usuarios
- **[Cloud Firestore](https://firebase.google.com/docs/firestore)** - Base de datos NoSQL en tiempo real

### Herramientas de Desarrollo
- **[ESLint](https://eslint.org/)** - Linter de JavaScript/TypeScript
- **[Turbopack](https://turbo.build/pack)** - Empaquetador ultra-rápido

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.x o superior
- **npm** o **yarn**
- Una cuenta de **[Firebase](https://console.firebase.google.com/)**

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/mi-portafolio.git
cd mi-portafolio
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔥 Configuración de Firebase

### 1. Crear un Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en **"Crear proyecto"**
3. Sigue los pasos del asistente
4. Desactiva Google Analytics (opcional)

### 2. Configurar Authentication

1. En el menú lateral → **Authentication**
2. Click en **"Comenzar"**
3. Habilita el método **"Correo electrónico/Contraseña"**
4. En la pestaña **Users**, agrega tu usuario administrador

### 3. Configurar Firestore Database

1. En el menú lateral → **Firestore Database**
2. Click en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de prueba"**
4. Elige tu ubicación preferida

### 4. Crear la Estructura de Datos

En Firestore, crea esta estructura:

```
portfolio (collection)
  └── data (document)
      ├── hero (map)
      │   ├── name: "Tu Nombre"
      │   ├── title: "Tu Título Profesional"
      │   ├── bio: "Tu biografía"
      │   ├── email: "tu@email.com"
      │   ├── github: "https://github.com/tu-usuario"
      │   └── linkedin: "https://linkedin.com/in/tu-usuario"
      ├── experiences: []
      ├── projects: []
      └── skills: []
```

### 5. Configurar Reglas de Seguridad

En Firestore Database → **Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 6. Obtener las Credenciales

1. En Firebase Console → **Configuración del proyecto** (⚙️)
2. En **Tus aplicaciones** → Agrega una aplicación web (</> ícono)
3. Copia las credenciales al archivo `.env.local`

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` en la raíz con las siguientes variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

> ⚠️ **Importante:** Nunca subas el archivo `.env.local` a tu repositorio. Ya está incluido en `.gitignore`.

---

## 💻 Uso

### Acceso Público (Portafolio)

- **URL:** `http://localhost:3000`
- Muestra tu información profesional
- No requiere autenticación
- Responsive en todos los dispositivos

### Panel de Administración

- **URL:** `http://localhost:3000/login`
- Inicia sesión con el usuario que creaste en Firebase
- Gestiona todo el contenido de tu portafolio
- Los cambios se reflejan instantáneamente

### Gestionar Proyectos con Imágenes

Para agregar imágenes a tus proyectos:

1. Sube tu captura de pantalla a un servicio gratuito:
   - [Imgur](https://imgur.com)
   - [ImgBB](https://imgbb.com)
   - [PostImages](https://postimages.org)

2. Copia el enlace directo de la imagen (debe terminar en .jpg, .png, etc.)

3. En el dashboard, pega el enlace en el campo "URL de la Imagen"

4. La imagen aparecerá automáticamente en tu portafolio

---

## 📁 Estructura del Proyecto

```
mi-portafolio/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── dashboard/      # Componentes del admin
│   │   │   ├── ExperienceManager.tsx
│   │   │   ├── HeroEditor.tsx
│   │   │   ├── ProjectManager.tsx
│   │   │   └── SkillManager.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Skills.tsx
│   ├── context/            # React Context
│   │   └── AuthContext.tsx
│   ├── dashboard/          # Panel de administración
│   │   └── page.tsx
│   ├── login/              # Página de login
│   │   └── page.tsx
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio
├── lib/
│   ├── firebase.ts         # Configuración de Firebase
│   └── firestore.ts        # Funciones CRUD
├── public/                 # Archivos estáticos
├── .env.local              # Variables de entorno (no subir a git)
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🌐 Despliegue

### Desplegar en Vercel (Recomendado)

1. Sube tu código a GitHub

2. Ve a [Vercel](https://vercel.com)

3. Click en **"Import Project"**

4. Selecciona tu repositorio

5. Agrega las variables de entorno:
   - Copia todas las variables de `.env.local`
   - En Vercel → Settings → Environment Variables
   - Agrega cada una

6. Click en **"Deploy"**

7. ¡Tu portafolio estará en línea en menos de 2 minutos! 🎉

### Actualizar las Reglas de Firestore para Producción

Cuando despliegues, actualiza las reglas en Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.token.email == "tu-email@admin.com";
    }
  }
}
```

Reemplaza `tu-email@admin.com` con tu email de administrador.

---

## 📸 Capturas de Pantalla

### Portafolio Público
![Portafolio](docs/screenshot-portfolio.png)

### Panel de Administración
![Dashboard](docs/screenshot-dashboard.png)

### Gestión de Proyectos
![Proyectos](docs/screenshot-projects.png)

---

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6',  // Cambia este color
        600: '#2563eb',
      },
    },
  },
}
```

### Modificar Secciones

Los componentes están en `app/components/`. Edita cualquier archivo para personalizar tu portafolio.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún bug o tienes sugerencias:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Funcionalidades Futuras

- [ ] Modo oscuro
- [ ] Blog integrado
- [ ] Formulario de contacto
- [ ] Animaciones avanzadas con Framer Motion
- [ ] Sección de testimonios
- [ ] Sistema de comentarios
- [ ] Analytics integrado
- [ ] Múltiples idiomas (i18n)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**

- 🌐 Portfolio: [tu-portfolio.com](https://tu-portfolio.com)
- 💼 LinkedIn: [linkedin.com/in/tu-usuario](https://linkedin.com/in/tu-usuario)
- 🐙 GitHub: [github.com/tu-usuario](https://github.com/tu-usuario)
- 📧 Email: tu-email@ejemplo.com

---

## 🙏 Agradecimientos

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, puedes:

- 📧 Enviar un email a: soporte@tu-email.com
- 🐛 Reportar un bug en [GitHub Issues](https://github.com/tu-usuario/mi-portafolio/issues)
- 💬 Iniciar una discusión en [GitHub Discussions](https://github.com/tu-usuario/mi-portafolio/discussions)

---

<div align="center">

### ⭐ Si este proyecto te fue útil, dale una estrella en GitHub

**Hecho con ❤️ usando Next.js y Firebase**

</div>