# NefroKids App

NefroKids App es una aplicación móvil desarrollada para acompañar a niños que realizan diálisis peritoneal y a sus familias durante el seguimiento diario de su tratamiento.

La aplicación busca facilitar el registro de síntomas, el monitoreo del estado general del paciente y la generación de información útil para compartir con el equipo médico tratante.

La diálisis peritoneal es un tratamiento que se realiza de forma ambulatoria, generalmente en el hogar, por lo que resulta fundamental contar con herramientas que permitan realizar un seguimiento continuo de la evolución del paciente fuera del ámbito hospitalario.

---

## Repositorios del proyecto

El proyecto está dividido en tres repositorios con responsabilidades separadas:

| Repositorio | Descripción | Link |
|---|---|---|
| **NefroKids App** | Aplicación principal desarrollada en React Native | [sackflorencia/NefroKids-app](https://github.com/sackflorencia/NefroKids-app) |
| **NefroKids Game** | Juegos y niveles desarrollados en Unity | [Julieta-8/NefroKids_Niv1](https://github.com/Julieta-8/NefroKids_Niv1) |
| **NefroKids Web** | Builds WebGL de Unity y deploy en Firebase Hosting | [sackflorencia/NefroKids-web](https://github.com/sackflorencia/NefroKids-web) |

La app consume los juegos a través de una WebView que carga las URLs publicadas en NefroKids Web. NefroKids Game y NefroKids Web son repositorios independientes: el primero contiene el código fuente de Unity, el segundo centraliza los builds exportados y el despliegue.

---

## Documentación

La documentación técnica del proyecto se encuentra en la carpeta `docs/`:

- `architecture-decisions` — decisiones de arquitectura del proyecto
- `database` — modelo de datos y esquemas
- `game-design` — diseño y lógica de los juegos
- `project-decisions` — decisiones generales del proyecto
- `unity-integration` — integración Unity + React Native (WebGL y nativa)
- `archive` — enfoques que fueron planteados y descartados durante el desarrollo. Por ejemplo, `android-native-integration` documenta la integración nativa de Unity con Android mediante exportación como Android Library, que finalmente fue reemplazada por Unity WebGL.

---

## Funcionalidades

- Registro de check-ins diarios
- Registro y seguimiento de síntomas
- Registro del estado de ánimo
- Registro del color de la orina
- Registro de dolor, ubicación e intensidad
- Seguimiento de la evolución del paciente
- Sistema de progreso y gamificación
- Generación de reportes para el equipo médico
- Almacenamiento local de información
- Funcionamiento sin conexión a internet

---

## Tecnologías utilizadas

- React Native
- Expo
- SQLite
- Firebase

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/sackflorencia/NefroKids-app.git
```

Entrar a la carpeta del proyecto:

```bash
cd NefroKids-app
```

Instalar dependencias:

```bash
npm install
```

---

## Requisitos previos

Antes de ejecutar el proyecto, asegurarse de tener instalado:

- Node.js
- npm
- Expo Go en el dispositivo Android
- Android SDK Platform Tools (`adb`) instalado y disponible en el PATH (solo para el Método 2)

Para verificar que `adb` se encuentra correctamente instalado, ejecutar:

```bash
adb devices
```

Si la instalación es correcta, debería mostrarse una lista de dispositivos conectados mediante USB.

---

## Ejecución

La aplicación puede ejecutarse utilizando cualquiera de los siguientes métodos.

### Método 1: Expo Go mediante código QR

Este método tiene dos variantes según la conectividad disponible: **LAN** (red local) y **Tunnel** (sin requisito de red compartida).

#### Variante A: LAN (misma red Wi-Fi)

Requiere que la computadora y el dispositivo móvil estén conectados a la misma red local.

1. Iniciar Expo:

```bash
npx expo start
```

Si es necesario limpiar la caché:

```bash
npx expo start -c
```

2. Presionar `s` en la terminal para utilizar Expo Go.
3. Escanear el código QR mostrado por Expo:
   - **iPhone (iOS):** utilizar la aplicación Cámara del sistema.
   - **Android:** abrir Expo Go y utilizar la opción **Scan QR Code**.
4. Esperar a que la aplicación termine de cargar.

#### Variante B: Tunnel (sin requisito de red compartida)

Si la computadora y el dispositivo se encuentran en redes distintas, o si la red local bloquea la detección, puede usarse el modo Tunnel:

```bash
npx expo start --tunnel
```

El modo Tunnel utiliza un servidor intermediario de Expo para conectar el dispositivo con la computadora, por lo que no requiere que ambos estén en la misma red. Puede presentar tiempos de carga mayores que el modo LAN.

1. Presionar `s` en la terminal para utilizar Expo Go.
2. Escanear el código QR de la misma forma que en la Variante A.

---

Durante el desarrollo:

- Presionar `r` para reiniciar la aplicación luego de realizar cambios.
- Presionar `Ctrl + C` para detener el servidor.

---

### Método 2: Android mediante USB (ADB)

Este método también requiere tener instalada la aplicación Expo Go en el dispositivo.

#### Habilitar USB Debugging

1. Ir a Settings > About Phone.
2. Presionar siete veces sobre Build Number (Número de compilación) para habilitar las Developer Options.
3. Ingresar a Developer Options.
4. Activar USB Debugging.

Algunos dispositivos ya incluyen las opciones de desarrollador habilitadas o visibles por defecto.

#### Conectar el dispositivo

1. Conectar el teléfono mediante USB.
2. Seleccionar File Transfer si el dispositivo lo solicita.
3. Aceptar la autorización de depuración USB cuando aparezca en el teléfono.

#### Redireccionar el puerto

```bash
adb reverse tcp:8081 tcp:8081
```

Al ejecutar el comando puede aparecer una solicitud de autorización en el dispositivo que deberá ser aceptada.

#### Iniciar Expo

```bash
npx expo start --localhost
```

#### Abrir la aplicación

1. Presionar `s` para utilizar Expo Go.
2. Presionar `a` en la terminal.
3. La aplicación se abrirá automáticamente en el dispositivo Android conectado.

Durante el desarrollo:

- Presionar `r` para reiniciar la aplicación luego de realizar cambios.
- Presionar `Ctrl + C` para detener el servidor.

---

### Método 3: Emulador Android Studio

Este método permite ejecutar la aplicación directamente en la computadora utilizando un dispositivo virtual Android.

#### Requisitos

- Android Studio instalado.
- Android SDK y Android Emulator instalados.
- Un dispositivo virtual (AVD) configurado.

#### Configuración recomendada del emulador

Se recomienda utilizar un dispositivo virtual de la línea Pixel. Durante el desarrollo de este proyecto se utilizó:

```text
Device: Pixel 7
System Image: Android 17 (API 37)
Services: Google Play Store
ABI: x86_64
```

La lista completa de dispositivos y configuraciones compatibles puede consultarse en la [Documentación oficial de Expo](https://docs.expo.dev/workflow/android-studio-emulator/).

#### Iniciar el emulador

1. Abrir Android Studio.
2. Ir a More Actions > Device Manager.
3. Iniciar el dispositivo virtual configurado.
4. Esperar a que Android termine de cargar completamente.

#### Iniciar Expo

```bash
npx expo start
```

Si es necesario limpiar la caché:

```bash
npx expo start -c
```

#### Abrir la aplicación

1. Presionar `s` para utilizar Expo Go.
2. Presionar `a` en la terminal.
3. Expo chequea si la aplicación Expo Go está instalada en el emulador. En caso contrario, la instala automáticamente.
4. Expo abre automáticamente la aplicación en el emulador Android.

Durante el desarrollo:

- Presionar `r` para reiniciar la aplicación luego de realizar cambios.
- Presionar `Ctrl + C` para detener el servidor.

---

## Arquitectura

### Frontend

```text
app/
├── components
├── helpers
├── navigation
├── screens
└── styles
```

### Backend local

```text
back/
├── controllers
├── models
├── repositories
├── schemas
├── seeds
├── database.js
└── index.js
```