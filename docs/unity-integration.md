# NefroKids Unity

## Arquitectura actual

### Decisión tecnológica

Luego de evaluar la integración nativa con Android (documentada en la sección de arquitecturas descartadas), se optó por **Unity WebGL** como mecanismo principal de integración de los juegos dentro de NefroKids.

Esta decisión permite desacoplar completamente el desarrollo de los juegos de la aplicación móvil, aprovechar la infraestructura web ya existente (Firebase Hosting) y simplificar el mantenimiento y la distribución de contenido. Dado que la aplicación principal está desarrollada con React Native (Expo) y los servicios backend se apoyan en Firebase, Unity WebGL se integra de forma natural dentro de esa arquitectura.

### Ventajas respecto a la integración nativa

- Separación clara entre la app móvil y los juegos
- Independencia de versiones de Android e iOS
- Posibilidad de actualizar juegos sin generar una nueva versión de la app
- Menor complejidad de integración y de mantenimiento a largo plazo
- Compatibilidad directa con Firebase Hosting
- Reutilización de la infraestructura web existente

### Estructura de repositorios

El proyecto está dividido en tres repositorios con responsabilidades separadas:

**Repositorio Unity (`NefroKids-game`)**

Contiene exclusivamente el código fuente de los juegos: assets, escenas, scripts y configuración de Unity. No contiene builds exportados ni código específico de Android para la app móvil.

**Repositorio de la app (`NefroKids-app`)**

Contiene la aplicación React Native (Expo). Consume los juegos a través de una WebView apuntando a Firebase Hosting.

**Repositorio web (`NefroKids-web`)**

Centraliza los builds WebGL exportados desde Unity, gestiona el hosting y administra el despliegue. Actúa como capa de integración entre Firebase Hosting y la aplicación móvil.

La separación entre estos repositorios mantiene una responsabilidad clara para cada uno y evita almacenar código generado automáticamente en el repositorio del juego.

---

### Exportación desde Unity (WebGL)

#### Player Settings

**Platform**

```text
WebGL
```

**Compression Format**

```text
Disabled o Gzip (según hosting)
```

**WebGL Template**

```text
Default (o custom si ya existe uno configurado)
```

#### Build

1. Ir a **File → Build Settings**
2. Seleccionar **WebGL** → **Switch Platform**
3. Click en **Build** y seleccionar la carpeta de salida

Unity genera la siguiente estructura:

```text
Build/
TemplateData/
index.html
```

---

### Publicación en Firebase Hosting

Una vez generado el build WebGL:

1. Copiar los archivos generados al directorio `public/` del repositorio web:

```text
NefroKids-web/
  public/
    index.html
    Build/
    TemplateData/
  firebase.json
  .firebaserc
```

> Asegurarse de que `index.html` es el generado por Unity, no el del template de Firebase.

2. Ejecutar el deploy:

```bash
firebase deploy --only hosting
```

Firebase devuelve una URL del tipo:

```text
https://<project-id>.web.app
```

Esta URL es la que consume la app React Native para cargar el juego.

Para el flujo detallado de configuración de Firebase CLI, autenticación, inicialización del hosting y troubleshooting de builds, consultar el README del repositorio web:

[NefroKids-web](https://github.com/sackflorencia/NefroKids-web)

---

### Integración con React Native

La app incorpora los juegos mediante **Expo WebView**:

1. El usuario accede a una sección lúdica dentro de NefroKids.
2. React Native abre una WebView.
3. La WebView carga la URL del juego alojado en Firebase Hosting.
4. Unity WebGL se ejecuta dentro de la WebView.

Esto permite que los juegos se comporten como un módulo integrado dentro de la experiencia de la app, manteniendo al mismo tiempo una arquitectura desacoplada.

---

### Comunicación React Native ↔ Unity

La integración actual se encuentra en una primera etapa donde React Native consume los juegos WebGL. La siguiente etapa consiste en implementar comunicación bidireccional.

**React Native → Unity**

React Native inyectará mensajes JavaScript dentro de la WebView. Unity recibirá dichos mensajes mediante scripts específicos para WebGL.

Casos de uso previstos:

- Identificador del paciente
- Configuración del nivel
- Datos de progreso
- Parámetros de personalización
- Información clínica relevante para la experiencia

**Unity → React Native**

Unity ejecutará funciones JavaScript definidas en la página WebGL. Estas funciones utilizarán el canal de mensajería de la WebView para enviar eventos a React Native.

Casos de uso previstos:

- Finalización de un nivel
- Puntajes obtenidos
- Tiempo empleado
- Métricas de uso
- Resultados de actividades

Esta comunicación bidireccional no requiere desarrollar módulos nativos para Android o iOS.

---

### Arquitectura final

```text
React Native (Expo)
        │
        ▼
Expo WebView
        │
        ▼
Firebase Hosting
        │
        ▼
Unity WebGL
        │
 ┌──────┴──────┐
 ▼             ▼
Datos a Unity  Datos a React Native
```

---

## Arquitecturas descartadas

### Integración nativa Android (obsoleta)

> **Esta sección se conserva únicamente con fines históricos.**
>
> Durante el desarrollo se evaluó una integración nativa entre Unity y React Native mediante Android Library, Gradle y exportación Android. Finalmente esta estrategia fue descartada en favor de Unity WebGL debido a su menor complejidad de mantenimiento y mejor alineación con la arquitectura basada en Expo y Firebase.
>
> La documentación completa puede encontrarse en:
> `docs/archive/android-native-integration.md`