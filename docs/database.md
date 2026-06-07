# Arquitectura de la base de datos

## 1. Visión general

NefroKids utiliza una arquitectura de datos híbrida basada en:

- **SQLite (local-first)** como fuente principal de datos del dispositivo
- **Firebase (cloud layer)** como sistema de sincronización, autenticación y respaldo
- **Cloud Functions** para lógica server-side (reportes y envío de emails)

El sistema sigue un enfoque **offline-first**, donde la aplicación debe funcionar completamente sin conexión a internet, sincronizando datos cuando la conectividad está disponible.

---

## 2. Modelo de datos híbrido

### Fuente de verdad (Source of Truth)

- **SQLite → fuente principal de datos**
- **Firebase → réplica parcial + servicios cloud**

La lógica general es:

- Toda la interacción del usuario ocurre en SQLite
- Firebase recibe solo datos seleccionados para sincronización y cloud services
- Firebase nunca es requerido para el funcionamiento básico de la app

---

## 3. Modelo de identidad

### Usuarios del sistema

El sistema distingue dos entidades:

#### Tutor (Firebase Auth User)
- Usuario autenticado del sistema
- Accede mediante email y password
- Responsable legal del niño
- Único tipo de usuario con login

#### Child (SQLite User)
- Usuario principal dentro de la aplicación
- Representa al paciente pediátrico
- No tiene acceso directo al login
- Es gestionado por el tutor

### Relación

- Cada tutor está asociado a un único child
- Relación almacenada como `child_id` dentro de la entidad tutor (o viceversa según implementación final)

---

## 4. Clasificación de tablas

Las tablas se dividen en tres categorías:

---

### 4.1 Tablas sincronizadas con Firebase

Estas tablas contienen datos dinámicos relevantes para seguimiento médico y continuidad del tratamiento.

#### Alerts
- Registro de eventos urgentes del paciente
- Ejemplo: síntomas críticos como “orina con sangre”
- Se envían inmediatamente al tutor si hay conexión
- Si no hay conexión, se almacenan en cola local hasta sincronización

#### Symptoms Logs
- Registro de síntomas ingresados por el paciente
- Base para generación de reportes médicos

#### Report History
- Metadata de reportes generados
- Principalmente intervalo de tiempo del reporte

#### Appointment Rules
- Define frecuencia de visitas médicas del paciente
- Ej: cada 15 días, 3 veces por semana, todos los martes, etc

#### Appointment Week Days
- Configuración de días específicos de consulta médica para los niños que van semanalmente o varias veces dentro de una misma semana

#### Progress 
- Progreso del niño en actividades/juegos
- Se guarda localmente en tiempo real
- Se sincroniza con Firebase cuando hay conexión

---

### 4.2 Tablas locales (NO sincronizadas)

Estas tablas son estáticas o de uso interno de UI/UX.

#### Avatars
- Catálogo de avatares disponibles
- Solo referencia de UI
- No depende del usuario

#### Game Schema
- Definición de niveles del juego
- Estructura estática de gameplay

#### Rank Definitions
- Sistema de ranking por XP
- Ej: aprendiz → explorador → maestro
- No cambia dinámicamente

#### Review Questions
- Preguntas de repaso educativo
- Contenido fijo para entrenamiento

---

### 4.3 Tablas mixtas (local + sync parcial)

#### Users (Child)
- Representa al paciente
- Se mantiene en SQLite como entidad principal
- Se replica parcialmente en Firebase para sync

#### Tutors
- Datos del tutor asociados al child
- Almacenados en Firebase Auth + Firestore
- No existe versión completa en SQLite

---

## 5. Estrategia de sincronización

### Dirección de sincronización

El sistema utiliza sincronización híbrida:

#### Local → Cloud (principal flujo)
- Alerts
- Symptoms
- Progress data
- Reports metadata

#### Cloud → Local (restauración)
- Recuperación de datos al reinstalar la app
- Restauración de historial desde Firebase
- Manejo de datos en varios teléfonos (ej: los telefonos de dos padres separados)

---

### Reglas de sincronización

- SQLite siempre puede operar sin Firebase
- Firebase actúa como respaldo y sistema de distribución
- Sync ocurre solo cuando hay conectividad

---

### Conflictos de datos

- Regla general: **last write wins**
- En casos críticos:
  - Alerts y symptoms → prioridad local
  - Reports → prioridad cloud

---

## 6. Alerts vs Reports

### Alerts

- Eventos inmediatos generados por el usuario
- Ejemplo: síntomas críticos
- Se envían en tiempo real al tutor
- Si no hay internet:
  - se almacenan en cola local
  - se envían cuando vuelve la conexión

---

### Reports

- Generados automáticamente por Cloud Functions
- Intervalos configurados por Appointment Rules y Appointment Week Days
- Incluyen:
  - Symptoms Logs
  - Alerts del período
- Se envían por email al tutor
- Se almacenan en Firebase como historial

---

## 7. Sistema de autenticación

- Implementado exclusivamente con Firebase Auth
- Solo usuarios tipo tutor pueden autenticarse
- No existe login para children. Esto con el objetivo de tener consentimiento pleno de los tutotres por sobre el niño.

---

## 8. Email system (Cloud Functions)

- Los reportes son enviados mediante Firebase Cloud Functions
- Incluyen:
  - Síntomas del período
  - Alerts relevantes
- No incluyen progresos del juego
- Se ejecuta automáticamente según reglas de citas médicas

---

## 9. Offline-first behavior

- La aplicación funciona completamente sin internet
- Todas las acciones se registran en SQLite
- Firebase actúa como sincronización posterior
- Alerts quedan en cola local si no hay conectividad
- Reports dependen de Cloud Functions pero consumen datos locales sincronizados

---

## 10. Ciclo de vida de datos

### Eliminación de usuario

- No se elimina físicamente en Firebase
- Se recomienda soft delete:
  - campo `active = false`
- Permite mantener historial clínico

---

## 11. Resumen arquitectónico

- SQLite → core del sistema
- Firebase → sync + auth + cloud logic
- Cloud Functions → generación de reportes
- React Native → capa de interacción
- Node.js (local layer) → lógica intermedia del backend móvil
