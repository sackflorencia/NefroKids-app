# Decisiones de proyecto

## 1. Introducción

Este documento describe las decisiones organizacionales y de desarrollo tomadas durante la construcción de NefroKids. Estas decisiones no corresponden a arquitectura técnica (database, decisiones de tecnología, game design o Unity integration), sino a cómo se estructuró el trabajo, el repositorio, el equipo y el flujo de desarrollo.

---

## 2. Estructura de repositorios

### Decisión 1: Separación en dos repositorios (App / Game)

#### Decisión
El proyecto se dividió en dos repositorios independientes:

- **NefroKids App (este repositorio)**
- [**NefroKids Game**](https://github.com/Julieta-8/NefroKids_Niv1)

#### Motivos
- Reducir la complejidad del entorno de desarrollo.
- Evitar la carga innecesaria de clonar un proyecto completo con módulos no utilizados.
- Mejorar tiempos de build y desarrollo.
- Permitir trabajo en paralelo entre los integrantes del equipo que se dedican a app y los integrantes de game development.
- Facilitar la independencia entre tecnologías (React Native vs Unity).

#### Alternativas consideradas
- Un único repositorio monolítico con todo el proyecto.
- Separación por niveles del juego en repositorios independientes (descartado por duplicación de assets y complejidad de mantenimiento).

---

### Decisión 2: Consolidación en un único repositorio de app

#### Decisión
El repositorio de la aplicación se armo en una estructura unificada donde:
- React Native
- Node.js
- SQLite
- Firebase services

conviven dentro del mismo proyecto.

#### Motivos
- Centralizar lógica de aplicación.
- Mantener coherencia entre capas de datos y UI.
- Evitar fragmentación excesiva del sistema.

#### Alternativas consideradas
- Separar backend y frontend en repositorios distintos (descartado por complejidad innecesaria para el alcance del proyecto).

---

## 3. Flujo de desarrollo

### Decisión 3: Uso progresivo de ramas (feature branches)

#### Decisión
El desarrollo se realiza principalmente en la rama `main`, pero las nuevas funcionalidades se implementan progresivamente en ramas feature.

#### Motivos
- El desarrollo inicial requería integración constante para avanzar funcionalmente.
- El proyecto evolucionó de una etapa secuencial a una etapa de estabilización (pre-demo).
- Se introdujo el uso de feature branches para evitar romper estabilidad en `main`.

#### Alternativas consideradas
- Flujo GitFlow completo con `develop` y `release` (descartado por sobrecomplejidad).
- Desarrollo exclusivo en `main` sin ramas (descartado por riesgo de inestabilidad en etapas finales).

---

### Decisión 4: Integración frecuente entre cambios

#### Decisión
Las funcionalidades se integran de forma frecuente en `main` una vez completadas.

#### Motivos
- El desarrollo está dividido en módulos independientes.
- Se requiere validación continua del sistema completo.
- Reduce riesgos de integración tardía.

#### Alternativas consideradas
- Integración al final del desarrollo (descartado por alto riesgo de incompatibilidades).

---

## 4. Organización del equipo

### Decisión 5: Especialización por módulos del sistema

#### Decisión
El equipo se divide en roles especializados:

- **Fullstack developer**
  - React Native
  - Node.js
  - SQLite
  - Firebase

- **Backend developer**
  - Lógica de datos
  - Modelos y estructuras
  - Soporte parcial en frontend si es necesario
  - Tecnologías: Node.js, SQLite y Firebase

- **Game developer**
  - Unity
  - Diseño de gameplay y lógica de niveles
  - Experiencia interactiva

#### Motivos
- Permitir desarrollo en paralelo de subsistemas independientes.
- Reducir dependencias entre app y juego.
- Optimizar productividad según fortalezas del equipo.

#### Alternativas consideradas
- Equipos totalmente cross-functional (descartado por complejidad de coordinación constante).
- Un solo flujo de desarrollo compartido (descartado por alta dependencia entre tecnologías distintas).

---

## 5. Integración App – Game

### Decisión 6: Juego embebido dentro de la aplicación

#### Decisión
El juego desarrollado en Unity se ejecuta dentro de la aplicación principal (React Native), no como una app independiente.

#### Motivos
- Mantener una experiencia de usuario unificada.
- Evitar fragmentación del producto.
- Facilitar el acceso al contenido educativo desde la app principal.

#### Alternativas consideradas
- Aplicación Unity separada (descartado por mala integración UX).
- Comunicación en tiempo real compleja entre apps independientes (descartado por sobreingeniería).

---

### Decisión 7: Comunicación App → Unity mediante JSON

#### Decisión
La aplicación envía datos al juego mediante estructuras JSON simples.

#### Motivos
- Mantener desacoplamiento entre tecnologías.
- Evitar dependencias directas con SQLite o backend.
- Facilitar extensibilidad futura (nuevos niveles o parámetros).

#### Alternativas consideradas
- Acceso directo de Unity a SQLite (descartado por acoplamiento fuerte).
- Comunicación vía backend en tiempo real (descartado por complejidad innecesaria).

---

## 6. Decisiones de diseño del sistema

### Decisión 8: Evitar API REST externa

#### Decisión
No se implementó una API REST tradicional en Node.js.

#### Motivos
- El sistema no requiere comunicación externa con clientes múltiples.
- La aplicación es self-contained.
- Firebase cubre necesidades de sincronización y cloud services.
- Node.js se utiliza como capa de lógica local estructurada.

#### Alternativas consideradas
- Arquitectura basada en API REST completa (descartada por sobreingeniería para el alcance del proyecto).
- Microservicios (descartado por complejidad innecesaria).

---

## 7. Estrategia de desacople del sistema

### Decisión 9: Separación funcional entre App y Game

#### Decisión
El sistema se divide en dos dominios independientes:

- **App domain:** gestión del paciente, datos médicos, tracking
- **Game domain:** experiencia educativa interactiva

#### Motivos
- Permitir desarrollo en paralelo.
- Reducir dependencia entre subsistemas.
- Facilitar escalabilidad independiente de cada módulo.

#### Alternativas consideradas
- Arquitectura monolítica unificada (descartada por complejidad y acoplamiento alto).

---

## 8. Conclusión

Las decisiones del proyecto están orientadas a:

- Mantener simplicidad en la arquitectura
- Priorizar desarrollo paralelo
- Evitar sobreingeniería
- Garantizar estabilidad en etapas críticas del proyecto
- Permitir escalabilidad futura sin reestructuración completa