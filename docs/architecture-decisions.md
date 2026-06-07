# Decisiones de arquitectura

## Objetivo

Las decisiones tecnológicas de NefroKids fueron tomadas considerando los siguientes criterios:

* Garantizar el funcionamiento de la aplicación sin conexión a internet.
* Utilizar tecnologías ampliamente adoptadas en entornos profesionales.
* Aprovechar el conocimiento previo del equipo para reducir la curva de aprendizaje.
* Facilitar el mantenimiento y la continuidad del proyecto.
* Contar con docentes y mentores que pudieran brindar soporte durante el desarrollo.

---

## React Native

### Decisión

Utilizar React Native como framework principal para el desarrollo de la aplicación móvil.

### Alternativas consideradas

* Flutter

### Motivos

El equipo contaba con experiencia previa en React adquirida durante la formación académica. Si bien no existía experiencia previa específica en React Native, los conocimientos de React permitían reutilizar conceptos fundamentales como componentes, manejo de estados, navegación y organización general de la aplicación.

Además, React Native permitía desarrollar una única aplicación para Android e iOS utilizando una misma base de código.

Otro factor importante fue la disponibilidad de docentes y mentores con experiencia en React Native, lo que facilitó la resolución de problemas y el aprendizaje de la tecnología.

Flutter fue considerado como alternativa, pero fue descartado debido a la menor experiencia previa del equipo y a la ausencia de soporte técnico cercano durante el desarrollo.

---

## SQLite

### Decisión

Utilizar SQLite como base de datos principal de la aplicación.

### Alternativas consideradas

* Firebase Firestore como única base de datos.
* PostgreSQL.
* Supabase.

### Motivos

NefroKids fue diseñado siguiendo una estrategia offline-first. La aplicación debe poder continuar funcionando incluso cuando el dispositivo no dispone de conexión a internet. Por este motivo, SQLite fue seleccionada como fuente principal de verdad de los datos. Todos los registros clínicos y la información necesaria para el funcionamiento cotidiano de la aplicación se almacenan inicialmente de forma local.

SQLite presenta además las siguientes ventajas:

* Funciona de forma completamente local.
* No depende de servicios externos.
* No requiere conexión a internet.
* Forma parte del ecosistema móvil y es ampliamente utilizada en aplicaciones reales.
* Puede integrarse fácilmente mediante Expo SQLite.
* Simplifica la instalación y puesta en marcha del proyecto.

Los datos sincronizados con servicios externos son considerados una réplica o respaldo de la información almacenada localmente.

---

## Firebase

### Decisión

Utilizar Firebase para autenticación, sincronización, respaldo de información y generación/envío de reportes clínicos por correo electrónico.

### Alternativas consideradas

* Supabase.

### Motivos

La aplicación requiere mecanismos de autenticación, sincronización entre dispositivos y distribución de información clínica hacia profesionales médicos. Firebase ofrece una solución integrada para:

* Autenticación mediante correo electrónico y contraseña.
* Inicio de sesión utilizando proveedores externos.
* Sincronización de información entre dispositivos.
* Respaldo remoto de información almacenada localmente.
* Generación y envío de reportes clínicos por correo electrónico.

En particular, el sistema de reportes permite consolidar información registrada en la aplicación (como síntomas o eventos clínicos) y enviarla automáticamente a los tutores del paciente en intervalos definidos (por ejemplo, reportes semanales o previos a consultas). Este proceso se implementa como una funcionalidad cloud, separada del dispositivo del usuario, garantizando disponibilidad incluso cuando la aplicación no está activa.

Este mecanismo puede implementarse mediante servicios server-side de Firebase (por ejemplo, funciones en la nube), lo que permite ejecutar lógica programada y disparar el envío de correos sin intervención del usuario.

Además del aspecto funcional, Firebase fue seleccionado por su relevancia dentro de la industria y por representar una oportunidad de aprendizaje sobre arquitecturas NoSQL y servicios cloud.

La utilización conjunta de SQLite y Firebase permite combinar funcionamiento offline con sincronización remota cuando existe conectividad.

---
## Node.js

### Decisión

Utilizar Node.js como entorno de ejecución para la lógica de backend local de la aplicación.

### Alternativas consideradas

* No utilizar backend local (lógica embebida únicamente en la app móvil).

### Motivos

La arquitectura de NefroKids sigue un enfoque offline-first, por lo que gran parte de la lógica de negocio y persistencia de datos debía ejecutarse localmente en el dispositivo sin dependencia de servicios externos.

Node.js fue seleccionado por las siguientes razones:

* Integración natural con React Native al compartir el lenguaje JavaScript en todo el stack.
* Facilidad para manejar lógica de persistencia local junto con SQLite.
* Mayor simplicidad para mantener una arquitectura ligera en entorno móvil.
* Disponibilidad de docentes y mentores con experiencia en Node.js, lo que facilitó el soporte técnico durante el desarrollo.

### Implementación

A diferencia de una arquitectura backend tradicional basada en APIs REST o microservicios, en este proyecto Node.js se utiliza como capa de lógica local, no como servidor externo.

La estructura implementada es la siguiente:

back/
├── controllers
├── models
├── repositories
├── schemas
├── seeds
├── database.js
└── index.js

Alcance de uso

Node.js en este proyecto no implementa:

* APIs REST externas
* Microservicios
* Arquitecturas distribuidas

En cambio, su rol se limita a:

* Manejo de lógica de negocio local
* Interacción con SQLite
* Organización de modelos y repositorios
* Inicialización de datos (seeds)
* Validación de esquemas

### Integración con el sistema

La capa desarrollada en Node.js funciona como intermediario entre:

* La aplicación en React Native
* La base de datos local SQLite

y complementa la arquitectura general offline-first, donde:

* SQLite actúa como fuente principal de datos local
* Firebase se utiliza únicamente para sincronización, autenticación y servicios cloud
* Node.js organiza y centraliza la lógica local sin exponer un backend externo

---

## Unity

### Decisión

Utilizar Unity para el desarrollo de los componentes lúdicos y educativos del proyecto.

### Alternativas consideradas

* Phaser como framework de JavaScript.
* Implementación directa mediante vistas React Native.

### Motivos

La gamificación constituye un componente central de NefroKids.

Los juegos tienen como objetivo enseñar procedimientos vinculados a la diálisis peritoneal mediante simulaciones interactivas guiadas.

Unity fue seleccionado debido a:

* Su amplia adopción en la industria del desarrollo de videojuegos.
* La disponibilidad de docentes especializados dentro de la institución.
* La experiencia previa de algunos integrantes del equipo.
* Las capacidades específicas del motor para construir experiencias interactivas complejas.

Si bien la integración entre React Native y Unity representa un desafío técnico adicional, se consideró que los beneficios obtenidos justificaban dicha complejidad.

---

## Estrategia general

La arquitectura final combina tecnologías especializadas para cada responsabilidad:

* React Native para la interfaz móvil.
* SQLite para almacenamiento local.
* Firebase para autenticación y sincronización.
* Unity para la experiencia educativa interactiva.

Esta combinación permite mantener el funcionamiento offline de la aplicación, incorporar mecanismos de respaldo y sincronización, y ofrecer experiencias de aprendizaje basadas en simulaciones de procedimientos reales de diálisis peritoneal.
