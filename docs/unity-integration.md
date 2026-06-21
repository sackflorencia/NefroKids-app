# Unity + React Native Integration (NefroKids)

Este documento describe la integración entre Unity y React Native dentro del proyecto NefroKids, incluyendo configuración del entorno Android, exportación de Unity, puente de comunicación y estructura de scripts.

---

## 0. Requisitos

- Unity 2022.3.42f1
- Android Studio
- Android SDK
- Android NDK
- Java 17 (Temurin / Adoptium recomendado)
- Node.js
- Expo

---

## 0.1 Conceptos clave: ¿qué es todo esto?

Antes de entrar en los pasos técnicos, conviene entender **qué es cada pieza** y para qué sirve. Esto evita copiar líneas de Gradle sin saber qué función cumplen.

### ¿Qué estamos construyendo realmente?

En NefroKids escribimos código en **React Native (Expo)** y en **Unity**, pero Android no entiende ninguna de esas dos cosas directamente. Android solamente entiende **APK** o **AAB** (aplicaciones Android compiladas). Alguien tiene que transformar todo el proyecto en una app Android: ese "alguien" es **Gradle**.

### ¿Qué es Gradle?

Gradle es el sistema de build de Android. Es el equivalente a `npm` para `package.json`, pero para Android: recibe instrucciones (compilar React Native, compilar Unity, bajar dependencias, generar el APK) y las ejecuta en orden.

Por eso, cuando corremos:

```bash
npx expo run:android
```

Expo termina llamando, en el fondo, algo equivalente a:

```bash
gradlew assembleDebug
```

Es decir: *"Gradle, construime una versión debug de la app"*.

### ¿Qué es `gradlew.bat`?

```text
android/gradlew.bat
```

Es simplemente un lanzador de Gradle para Windows. Cuando ejecutamos:

```text
gradlew.bat app:assembleDebug
```

el flujo es:

```text
Nosotros
   ↓
Expo
   ↓
gradlew.bat
   ↓
Gradle
   ↓
APK
```

### ¿Qué es `build.gradle`?

Es un archivo de configuración de Gradle. Por ejemplo:

```gradle
dependencies {
    implementation "androidx.appcompat:appcompat:1.7.0"
}
```

significa *"para compilar esta app necesito AppCompat"*. Otro ejemplo:

```gradle
minSdkVersion 24
targetSdkVersion 36
```

significa *"la app corre desde Android 7 para arriba"*.

### ¿Por qué hay varios `build.gradle`?

Porque Android está dividido en módulos. En NefroKids tenemos:

```text
android/
│
├── app/
│   └── build.gradle
│
├── unityLibrary/
│   └── build.gradle
│
└── build.gradle
```

Cada uno cumple una función distinta:

| Archivo | Rol | Ejemplo de contenido |
|---|---|---|
| `android/build.gradle` | Configuración global ("el jefe") | Versión de Kotlin, versión de Gradle, repositorios |
| `android/app/build.gradle` | Configuración de la app final (React Native) | `applicationId`, `versionCode`, Firebase |
| `android/unityLibrary/build.gradle` | Configuración exclusiva del módulo Unity | OpenGL, C++, bibliotecas nativas |

### ¿Qué es `settings.gradle`?

Le dice a Gradle **qué módulos existen** en el proyecto. Por ejemplo:

```gradle
include ':app'
include ':unityLibrary'
```

significa que la aplicación tiene los módulos `app` y `unityLibrary`. Si `unityLibrary` no aparece ahí, Gradle ni siquiera sabe que Unity existe — por eso es un paso obligatorio de la integración (ver sección 8.3).

### ¿Qué es `unityLibrary`? (la pieza más importante)

Cuando Unity exporta para Android genera dos carpetas:

```text
launcher/
unityLibrary/
```

**`unityLibrary`** contiene el juego completo: assets, escenas, código C#, código C++ y el motor de Unity. Es el juego empaquetado como una *biblioteca reutilizable*.

**`launcher`** es una aplicación Android mínima que Unity genera solo para probar el juego de forma independiente. En la integración con React Native, **`launcher` normalmente no se usa** — usamos únicamente `unityLibrary`, porque React Native es la aplicación principal.

### ¿Qué es `gradle.properties`?

Son variables globales del build, sin lógica — solo parámetros. Por ejemplo:

```properties
org.gradle.jvmargs=-Xmx4096m
```

significa que Gradle puede usar 4 GB de RAM durante el build. Otro ejemplo:

```properties
android.useAndroidX=true
```

significa que el proyecto usa AndroidX.

### ¿Qué hace `npx expo prebuild`?

Cuando corremos:

```bash
npx expo prebuild
```

Expo genera automáticamente las carpetas `android/` e `ios/` a partir de `app.json`, `package.json` y los plugins configurados:

```text
React Native
     ↓
Expo Prebuild
     ↓
android/
     ↓
Gradle
     ↓
APK
```

### ¿Por qué Unity complica este flujo?

Porque Unity genera su propio módulo (`unityLibrary`) que Expo no conoce. Cada vez que Expo recrea `android/` mediante `prebuild`, **borra `unityLibrary`**, porque desde la perspectiva de Expo eso no forma parte de su proyecto. Esto explica por qué actualmente hay que repetir manualmente los pasos de la sección 8 (settings.gradle, build.gradle, intent-filter) después de cada `prebuild`.

### Arquitectura ideal a futuro (Config Plugin)

La arquitectura manual actual funciona, pero implica editar archivos de Gradle a mano cada vez que se regenera `android/`. La forma correcta de resolver esto a futuro es con un **Expo Config Plugin**, que automatice la conexión entre Unity y Android durante el `prebuild`:

```text
Proyecto Unity
        ↓
Export Android Project
        ↓
unityLibrary
        ↓
Expo Config Plugin
        ↓
android/
        ↓
Gradle
        ↓
APK
```

En esta arquitectura:

- Unity sigue siendo dueño del juego.
- Expo sigue siendo dueño de Android.
- Gradle compila todo.
- Un Config Plugin conecta ambas cosas automáticamente.

Con un Config Plugin, dejaríamos de tener que tocar `settings.gradle`, `app/build.gradle` y el `AndroidManifest.xml` de `unityLibrary` manualmente cada vez que se hace `prebuild`.

---

## 1. Arquitectura general

La integración se basa en:

- React Native (app principal)
- Unity (módulo embebido como `unityLibrary`)
- Android Gradle (orquestador de build)
- Bridge de comunicación JSON entre Unity → React Native

**Flujo general:**

```
Unity (Game Logic)
        ↓
React_Connection (Bridge Unity)
        ↓
Android Plugin (ReactNativeUnityViewManager)
        ↓
React Native App
```

---

## 2. Preparación del entorno Android

### 2.1 Java

Se utiliza:

- **Java 17 (LTS)**

Motivo:

- Compatibilidad con Gradle moderno
- Compatibilidad con React Native + Expo + Unity

Verificar versión instalada:

```bash
java -version
```

Resultado esperado:

```text
openjdk version "17.x.x"
```

Verificar variable de entorno:

```powershell
echo $env:JAVA_HOME
```

Debe apuntar al directorio del JDK 17, por ejemplo:

```text
C:\Program Files\Eclipse Adoptium\jdk-17.x.x
```

### 2.2 Android SDK

El SDK debe estar instalado en:

```
C:\Users\<USER>\AppData\Local\Android\Sdk
```

Y referenciado en:

```
android/local.properties
```

Ejemplo:

```properties
sdk.dir=C:\\Users\\BANGHO\\AppData\\Local\\Android\\Sdk
```

> Este archivo es local y no debe subirse al repositorio.

### 2.3 NDK

Se utiliza:

- **NDK 27.1.12297006**

**Problemas iniciales:**

- Instalación corrupta
- Falta de `source.properties`

**Solución:**

- Reinstalación automática desde Gradle / Android Studio

---

## 3. Exportación de Unity

### 3.1 Player Settings

**Platform**

```text
Android
```

**Scripting Backend**

```text
IL2CPP
```

**Target Architectures**

Para dispositivos físicos:

```text
ARMv7
ARM64
```

Para emuladores:

```text
ARMv7
ARM64
x86_64
```

> Si no se incluye `x86_64`, Unity no funcionará en emuladores x86_64.

**Export Project**

Activar la opción:

```text
Export Project
```

### 3.2 Build

Unity sólo permite:

```text
Build
```

o

```text
Build And Run
```

Seleccionar `Build` y exportar a una carpeta temporal, por ejemplo:

```text
unity/NEW EXPORT
```

### 3.3 Resultado de la exportación

El proyecto de Unity fue exportado para Android como módulo embebido:

```
unity/builds/android/unityLibrary
```

Este módulo se integra dentro del proyecto Android en:

```
android/unityLibrary
```

Unity genera dos carpetas:

```text
unityLibrary/
launcher/
```

Sólo se utiliza `unityLibrary`.

---

## 4. Scripts de Unity (Bridge Layer)

Se creó una carpeta en Unity:

```
Scripts/React Native/
```

Esta carpeta contiene la lógica de comunicación entre Unity y React Native.

> **Importante:** la librería `@azesmway/react-native-unity` **no** usa `UnityMessageManagerNS`. Por lo tanto **no** hay que usar:
> ```csharp
> using UnityMessageManagerNS;
> UnityMessageManager.Instance.SendMessageToRN(json);
> ```
> En su lugar se usa el bridge Android incluido por la librería (`AndroidJavaClass`), como se muestra a continuación.

### 4.1 `React_Connection.cs`

Script principal del bridge:

```csharp
using UnityEngine;

public class React_Connection : MonoBehaviour
{
    public Nivel_1 nivel1;

    void Start()
    {
        Debug.Log("React_Connection arrancó");

        if (nivel1 == null)
        {
            Debug.LogError("Nivel_1 no asignado en React_Connection");
            return;
        }

        nivel1.OnLevelCompleted += SendResultToReact;
    }

    void OnDestroy()
    {
        if (nivel1 != null)
        {
            nivel1.OnLevelCompleted -= SendResultToReact;
        }
    }

    public void SendResultToReact()
    {
        ResultData result = new ResultData
        {
            levelId = 1,
            completed = true,

            phase1Time = nivel1.Phase1Time,
            phase2Time = nivel1.Phase2Time,
            averageTime = nivel1.AverageTime,

            phase1Stars = nivel1.Phase1Stars,
            phase2Stars = nivel1.Phase2Stars
        };

        string json = JsonUtility.ToJson(result);

        Debug.Log("Enviando a React Native:");
        Debug.Log(json);

#if UNITY_ANDROID
        using (AndroidJavaClass jc =
            new AndroidJavaClass("com.azesmwayreactnativeunity.ReactNativeUnityViewManager"))
        {
            jc.CallStatic("sendMessageToMobileApp", json);
        }
#endif
    }
}
```

### 4.2 `ResultData.cs`

Modelo de datos enviado a React Native:

```csharp
[System.Serializable]
public class ResultData
{
    public int levelId;
    public bool completed;

    public float phase1Time;
    public float phase2Time;
    public float averageTime;

    public int phase1Stars;
    public int phase2Stars;
}
```

### 4.3 Exponer métricas del nivel

En `Nivel_1.cs` agregar los campos privados:

```csharp
private float phase1Timer;
private float phase2Timer;
private float averageTime;

private int phase1Stars;
private int phase2Stars;
```

Y exponerlos mediante propiedades de solo lectura:

```csharp
public float Phase1Time => phase1Timer;
public float Phase2Time => phase2Timer;
public float AverageTime => averageTime;

public int Phase1Stars => phase1Stars;
public int Phase2Stars => phase2Stars;
```

---

## 5. Sistema de eventos en Unity

El nivel 1 expone un evento:

```
OnLevelCompleted
```

**Flujo:**

```
GameManager (Nivel 1)
        ↓
dispara OnLevelCompleted
        ↓
React_Connection.SendResultToReact()
        ↓
serialización JSON
        ↓
envío a React Native
```

---

## 6. Objeto UnityBridge

Se creó un GameObject en Unity:

```
ReactBridge
```

**Configuración:**

- Contiene el script `React_Connection`
- Referencia directa a `Nivel_1`
- `Nivel_1` apunta al `GameManager` del nivel

Este objeto actúa como punto central de comunicación.

**Pasos para conectarlo:**

1. Crear el GameObject `ReactBridge`.
2. Agregar el componente `React_Connection`.
3. En el campo `Nivel1` del Inspector, arrastrar el GameObject que contiene el script `Nivel_1`.

**Verificación en consola:**

Si la referencia quedó bien asignada:

```text
nivel1 = Nivel_1
```

Si aparece vacío, la referencia no fue asignada:

```text
nivel1 =
```

---

## 7. Comunicación Unity → React Native

El envío se realiza mediante:

```csharp
AndroidJavaClass("com.azesmwayreactnativeunity.ReactNativeUnityViewManager")
```

Método:

```csharp
sendMessageToMobileApp(json)
```

**Formato de datos:**

```json
{
  "levelId": 1,
  "completed": true,
  "phase1Time": 12.5,
  "phase2Time": 18.2,
  "averageTime": 15.3,
  "phase1Stars": 3,
  "phase2Stars": 2
}
```

---

## 8. Configuración Android (integración Unity)

### 8.1 UnityLibrary

El módulo Unity se integra como:

```
android/unityLibrary
```

Estructura esperada tras la exportación:

```text
unity/
└── builds/
    └── android/
        ├── unityLibrary/
        ├── launcher/
        ├── build.gradle
        ├── settings.gradle
        └── ...
```

Y dentro del proyecto React Native:

```text
NefroKids-app/
├── android/
├── unity/
│   └── builds/
│       └── android/
│           ├── unityLibrary/
│           └── launcher/
```

### 8.2 Eliminar intent-filter de Unity

Abrir:

```text
unityLibrary/src/main/AndroidManifest.xml
```

Eliminar:

```xml
<intent-filter>
    <category android:name="android.intent.category.LAUNCHER" />
    <action android:name="android.intent.action.MAIN" />
</intent-filter>
```

Esto es necesario porque React Native será la app principal (el launcher), no Unity.

### 8.3 Modificar `android/settings.gradle`

Agregar al final del archivo:

```gradle
def unityPath = new File(rootProject.projectDir, '../unity/builds/android/unityLibrary')

include ':unityLibrary'
project(':unityLibrary').projectDir = unityPath
```

### 8.4 Modificar `android/app/build.gradle`

**Agregar assets de Unity** dentro de `android { }`:

```gradle
sourceSets {
    main {
        assets.srcDirs += [
            '../../unity/builds/android/unityLibrary/src/main/assets'
        ]
    }
}
```

**Agregar la dependencia** dentro de `dependencies { }`:

```gradle
implementation project(':unityLibrary')
```

### 8.5 Problema conocido: `unityStreamingAssets`

Error encontrado:

```text
Could not get unknown property 'unityStreamingAssets'
```

En `unityLibrary/build.gradle`.

**Solución:** modificar

```gradle
aaptOptions {
    noCompress = ['.unity3d', '.ress', '.resource', '.obb', '.bundle', '.unityexp'] + unityStreamingAssets.tokenize(', ')
}
```

por:

```gradle
aaptOptions {
    noCompress = ['.unity3d', '.ress', '.resource', '.obb', '.bundle', '.unityexp']
}
```

### 8.6 Problema conocido: conflictos de librerías nativas (`packagingOptions`)

En la integración Unity + React Native, a veces es necesario ajustar `packagingOptions` dentro de `unityLibrary/build.gradle` para evitar conflictos entre librerías nativas generadas por Unity y dependencias del proyecto Android.

El bloque, tal como queda en `unityLibrary/build.gradle`, es el siguiente:

```gradle
packagingOptions {
    pickFirst '**/libc++_shared.so'

    doNotStrip '*/armeabi-v7a/*.so'
    doNotStrip '*/arm64-v8a/*.so'

    jniLibs {
        useLegacyPackaging true
    }
}
```

> **Importante:** de este bloque, la **única línea agregada manualmente** es `pickFirst '**/libc++_shared.so'`. El resto (`doNotStrip` y `jniLibs.useLegacyPackaging`) ya viene incluido por defecto en el `build.gradle` que genera el export de Unity.

**Descripción de cada ajuste:**

- **`pickFirst '**/libc++_shared.so'`** — Evita conflictos cuando múltiples dependencias incluyen la misma librería C++ compartida.
- **`doNotStrip '*/armeabi-v7a/*.so'` y `doNotStrip '*/arm64-v8a/*.so'`** — Previene la eliminación de símbolos nativos en librerías `.so` utilizadas por Unity o plugins nativos.
- **`jniLibs { useLegacyPackaging true }`** — Fuerza el empaquetado clásico de librerías nativas, mejorando la compatibilidad con Unity 2022+ y plugins Android antiguos.

> **Nota:** este bloque solo debe modificarse cuando existan errores de build relacionados con duplicación de `.so`, conflictos de `libc++_shared.so`, o crashes en runtime relacionados con librerías nativas. No es recomendable ajustar estas opciones sin un error previo reproducible.

### 8.7 Problema conocido: NDK inconsistente entre Android (Expo/RN) y unityLibrary

En la integración Unity + React Native + Expo, uno de los problemas más frecuentes es la inconsistencia en la versión del NDK (Native Development Kit) entre:

- El sistema Android del proyecto (Expo / React Native / Firebase)
- El módulo `unityLibrary` exportado por Unity

**Problema detectado**

Durante el build puede aparecer el siguiente error:

```text
NDK is not installed
```

o errores relacionados con IL2CPP como:

- Mismatch entre `ndkVersion`
- Incompatibilidad entre `ndkPath` y el NDK del sistema
- Fallos en `BuildIl2CppTask`

**Causa raíz**

El proyecto puede estar usando simultáneamente:

- NDK provisto por Android SDK (ej: `27.1.12297006`)
- NDK embebido por Unity en el export:

```text
Unity/Editor/Data/PlaybackEngines/AndroidPlayer/NDK
```

Esto genera un conflicto porque:

- React Native / Expo espera un NDK gestionado por Android SDK
- Unity export puede forzar o referenciar otro NDK distinto
- Gradle no puede resolver un único toolchain consistente

**Configuraciones problemáticas**

1. `unityLibrary` forzando un NDK propio:

```gradle
ndkPath "C:/Program Files/Unity/Hub/Editor/.../NDK"
```

Esto genera conflictos con el NDK del Android SDK.

2. Falta de definición explícita del NDK en el root project. Si no existe una versión centralizada, el valor puede ser inyectado por Expo o plugins, generando inconsistencias.

**Solución recomendada (configuración estable)**

1. Definir el NDK de forma centralizada en `android/build.gradle`:

```gradle
ext {
    ndkVersion = "27.1.12297006"
}
```

2. Usar la referencia centralizada en `android/app/build.gradle`:

```gradle
android {
    ndkVersion rootProject.ext.ndkVersion
}
```

3. Alinear `unityLibrary` con el mismo NDK, en `unityLibrary/build.gradle`:

- Eliminar cualquier referencia a:

```gradle
ndkPath "..."
```

- Asegurar compatibilidad con el mismo NDK usado por Android:

```gradle
android {
    ndkVersion "27.1.12297006"
}
```

**Regla de arquitectura**

En proyectos híbridos Unity + React Native, el NDK debe ser único y definido por el proyecto Android (root), nunca por Unity. Unity debe adaptarse al toolchain del proyecto host, no al revés.

**Resultado esperado**

Con esta configuración:

- Unity IL2CPP compila correctamente
- React Native / Expo mantiene compatibilidad
- Firebase y dependencias nativas funcionan sin conflictos
- Se elimina el error `NDK is not installed`

> **Importante:** no depender de la autodetección de NDK por Expo o por el export de Unity, ya que puede cambiar entre builds y generar errores no determinísticos.

#### NDK no detectado por variable de entorno (`ANDROID_NDK_ROOT`)

Una variante del mismo problema puede aparecer incluso con el NDK ya alineado según lo descrito arriba. El error es similar:

```text
Execution failed for task ':unityLibrary:BuildIl2CppTask'.
> NDK is not installed
```

**Causa real**

Aunque el NDK esté instalado correctamente en el sistema, Unity IL2CPP no lo detecta porque:

- Gradle y Expo sí conocen el NDK (a través de `ndkVersion`, ver arriba)
- Unity IL2CPP no usa automáticamente la resolución de Gradle
- El script de build de Unity depende de una variable de entorno del sistema operativo

En particular, esta línea (usada internamente por el build de Unity):

```text
System.getenv("ANDROID_NDK_ROOT")
```

devuelve `null` si la variable no existe en el sistema operativo, y Unity interpreta eso como que el NDK no está instalado.

**Solución: configurar la variable de entorno (Windows)**

1. Buscar en Windows: *"Editar variables de entorno del sistema"*.
2. Abrir **Variables de entorno** → ir a *Variables de usuario* (o del sistema).
3. Crear una nueva variable:

   - Nombre: `ANDROID_NDK_ROOT`
   - Valor (ejemplo típico):

```text
C:\Users\BANGHO\AppData\Local\Android\Sdk\ndk\27.1.12297006
```

4. Aceptar todo y reiniciar la terminal / Android Studio / VSCode para que tome la variable.

**Verificación**

En una terminal nueva:

```bash
echo %ANDROID_NDK_ROOT%
```

Debe devolver la ruta del NDK.

**Uso en Gradle (Unity IL2CPP)**

En `unityLibrary/build.gradle`, el build de IL2CPP referencia esta variable así:

```gradle
commandLineArgs.add("--tool-chain-path=" + System.getenv("ANDROID_NDK_ROOT"))
```

> **Importante:** no se crea ninguna carpeta nueva. `ANDROID_NDK_ROOT` es solo una referencia al NDK ya existente dentro del Android SDK. Si la variable no existe, Unity interpreta que el NDK no está instalado, aunque sí lo esté.

**Resultado**

Una vez configurada la variable:

- Unity IL2CPP encuentra el toolchain correctamente
- El task `BuildIl2CppTask` deja de fallar
- El build de Expo + Unity se completa normalmente

---

## 9. Componente React Native

Usando `@azesmway/react-native-unity`:

```tsx
import React, { useRef } from "react";
import { View } from "react-native";
import UnityView from "@azesmway/react-native-unity";

export default function GameScreen() {
  const unityRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <UnityView
        ref={unityRef}
        style={{ flex: 1 }}
        onUnityMessage={(event) => {
          console.log(
            "Unity:",
            event.nativeEvent.message
          );
        }}
      />
    </View>
  );
}
```

### 9.1 Comunicación React Native → Unity

Desde React Native también es posible invocar métodos dentro de Unity:

```javascript
unityRef.current.postMessage(
  gameObject,
  methodName,
  message
);
```

### 9.2 Integración con React Navigation

Desde la pantalla de niveles:

```javascript
navigation.navigate("Game", {
  level: selectedLevel
});
```

**Recepción en `GameScreen`:**

```javascript
export default function GameScreen({ route }) {
  const { level } = route.params;
}
```

Esto permite conocer qué nivel fue seleccionado antes de iniciar Unity.

---

## 10. Regenerar y limpiar el proyecto Android

### 10.1 Regenerar Android desde Expo

Si la carpeta `android/` todavía no existe:

```bash
npx expo prebuild
```

o directamente:

```bash
npx expo run:android
```

### 10.2 Limpiar Gradle

Cada vez que se exporta una nueva versión de Unity conviene limpiar el build:

```bash
cd android
gradlew clean
```

Luego:

```bash
cd ..
npx expo run:android
```

Si persisten errores, detener los daemons de Gradle:

```bash
./gradlew --stop
```

Y si aún así persisten, eliminar manualmente las carpetas de build:

```text
android/build
android/app/build
android/unityLibrary/build
```

---

## 11. Otros problemas resueltos

| Problema | Causa | Solución |
|---|---|---|
| `Unsupported class file major version 69` | Java 25 instalado | Instalar Java 17 y actualizar `JAVA_HOME` |
| `NDK did not have a source.properties file` | Instalación corrupta del NDK | Eliminar `Android/Sdk/ndk/27.1.12297006` y ejecutar `./gradlew clean` (Gradle lo reinstala automáticamente) |
| `SDK location not found` | Falta `local.properties` | Crear `android/local.properties` con `sdk.dir=...` |
| `Failed to load libmain.so` / `UnsatisfiedLinkError` | Emulador x86_64 pero Unity sólo exportó `armeabi-v7a` | Usar dispositivo físico, o exportar Unity con `ARM64`, `ARMv7` y `x86_64` |
| `AccessDeniedException` durante `mergeDebugNativeLibs` | Repositorio ubicado dentro de OneDrive (bloqueo de archivos) | Mover el repositorio fuera de OneDrive, ej. `C:\dev\NefroKids-app` o `D:\projects\NefroKids-app` |

---

## 12. Git

### 12.1 Archivos que NO deben subirse

```gitignore
android/local.properties

unity/NEW EXPORT/

android/.gradle/
android/build/
```

### 12.2 Archivos que SÍ deben subirse

- `unityLibrary`
- Modificaciones de Gradle
- Integración React Native
- Scripts React Native
- Scripts Unity dentro del proyecto Unity

---

## 13. Checklist antes de probar

- [ ] `ResultData` existe.
- [ ] `React_Connection` compila.
- [ ] `Nivel_1` asignado en el Inspector.
- [ ] `Export Project` activado.
- [ ] `intent-filter` eliminado del `AndroidManifest.xml` de `unityLibrary`.
- [ ] `unityLibrary` agregado a `settings.gradle`.
- [ ] `implementation project(':unityLibrary')` agregado.
- [ ] `assets.srcDirs` agregado.
- [ ] `gradlew clean` ejecutado.

---

## 14. Flujo de trabajo recomendado

Cada vez que Unity cambie:

1. Desarrollar el juego en Unity.
2. Configurar Build Settings (Platform, Scripting Backend, Target Architectures, Export Project).
3. Exportar como Android Project / Android Library.
4. Sobrescribir la carpeta:

```text
unity/builds/android/
```

5. Verificar que el `AndroidManifest.xml` siga sin `intent-filter`.
6. Revisar si Unity regeneró `build.gradle` (puede reintroducir el problema de `unityStreamingAssets`).
7. Ejecutar:

```bash
cd android
gradlew clean
```

8. Ejecutar:

```bash
cd ..
npx expo run:android
```

9. Probar la comunicación en ambos sentidos:
   - React Native → Unity
   - Unity → React Native
10. Persistir los resultados del nivel en SQLite/Firebase.

> No hace falta volver a tocar `settings.gradle` ni `app/build.gradle` si la estructura de carpetas no cambia.

> **Nota:** este flujo manual se repite porque `npx expo prebuild` borra `unityLibrary` cada vez que regenera `android/` (ver sección 0.1). La solución definitiva a futuro es migrar esta integración a un **Expo Config Plugin** que automatice estos pasos.