© 2026 – Documento Académico Confidencial | Corporación Universitaria Minuto de Dios Pág. 1
Corporación Universitaria Minuto de Dios
LEVANTAMIENTO INICIAL DE REQUERIMIENTOS
Informe Checklist de Módulos Funcionales
Sistema de Gestión Digital – Consultoría de Mejora de Procesos Empresariales
Asignatura: Gestión y Desarrollo de Proyectos de Software
Actividad: Taller – Levantamiento de Requerimientos
Cliente analizado: Consultoría de Mejora de Procesos Empresariales
Estudiantes: Freddy Stiven Castro Pardo | Juan David Acuña Ballen | Felipe Alejandro Patiño Hernandez
Docente: BRAYAN CAMILO CLAVIJO GOMEZ
Presupuesto máximo: $ 10.000.000 COP
Fecha de entrega: Mayo 2026
Electiva Cp I
© 2026 – Documento Académico Confidencial | Corporación Universitaria Minuto de Dios Pág. 2
1. INTRODUCCIÓN
El presente informe es el resultado del levantamiento inicial de requerimientos para el desarrollo de un sistema de
software para una empresa de consultoría especializada en mejora de procesos, optimización del rendimiento
organizacional y transformación empresarial. Se elabora en el marco de la asignatura de Gestión y Desarrollo de
Proyectos de Software de la Corporación Universitaria Minuto de Dios.
El objetivo no es definir detalles técnicos, sino presentar al cliente un conjunto de módulos funcionales claros y
comprensibles que reflejen sus necesidades reales, verificando que el alcance sea viable dentro del presupuesto máximo
de $10.000.000 COP.
2. CONTEXTO DEL CLIENTE
Aspecto Descripción
Tipo de empresa Consultoría en mejora de procesos, rendimiento organizacional y transformación empresarial
Servicios ofrecidos Consultorías personalizadas, suscripciones de acompañamiento continuo y charlas/eventos
empresariales
Gestión actual 100% manual: hojas de cálculo, correo electrónico, WhatsApp y agenda física
Problemas principales Sin trazabilidad de clientes, sin control de ventas, dificultad para escalar, sin visibilidad del negocio
Interés en IA El cliente reconoce el potencial de la IA para automatizar tareas y mejorar la toma de decisiones
Expectativa tecnológica Sistema moderno, fácil de usar, que permita crecer, con versión beta entregable en el corto plazo
Presupuesto disponible $ 10.000.000 COP (inversión única)
2.1 Problemas Identificados en el Proceso Actual
• Información dispersa en Excel y correo sin un sistema centralizado.
• Sin trazabilidad de oportunidades comerciales ni registro de propuestas enviadas.
• Vencimientos y renovaciones de suscripciones gestionados de memoria, sin alertas automáticas.
• Gestión de eventos sin estructura: inscripciones, cobros y materiales sin herramienta dedicada.
• El propietario no tiene visibilidad consolidada del estado del negocio en tiempo real.
• Modelo operativo dependiente de la memoria del dueño, lo que limita el crecimiento y la delegación.
3. PROCESOS PRINCIPALES DEL NEGOCIO
N° Proceso Descripción
1 Gestión de clientes y prospectos Registro y consulta del historial de relación comercial con cada cliente y prospecto.
2 Gestión de consultorías Seguimiento del ciclo completo: propuesta, contrato, sesiones ejecutadas y cierre.
3 Control de suscripciones Administración de contratos recurrentes, fechas de renovación y cobros periódicos.
4 Organización de eventos y charlas Planeación, inscripciones, asistentes, materiales y seguimiento post-evento.
5 Gestión del pipeline de ventas Seguimiento de oportunidades por etapas: contacto, propuesta, negociación, cierre.
6 Supervisión gerencial Monitoreo de desempeño operativo, ingresos y toma de decisiones estratégicas.
7 Automatización con IA Generación de propuestas personalizadas y resúmenes de clientes asistidos por IA.
4. CHECKLIST DE MÓDULOS FUNCIONALES
© 2026 – Documento Académico Confidencial | Corporación Universitaria Minuto de Dios Pág. 3
A continuación se presenta el listado de módulos funcionales propuestos con descripción en lenguaje no técnico para
facilitar la validación con el cliente. El símbolo ✓ indica módulos incluidos en el presupuesto base.
Cód. Módulo Descripción General Prior. Incl. Costo Est.
M-01 Gestión de Clientes y Prospectos (CRM) Centraliza la información de clientes y prospectos: datos de contacto, historial de interacciones y servicios contratados. Reemplaza el Excel como fuente de verdad del negocio. Alta ✓ $ 1.500.000
M-02 Gestión de Consultorías y Contratos Administra el ciclo completo de cada consultoría: propuesta, contrato, sesiones y cierre. Permite saber en tiempo real qué está activo, pendiente o cerrado. Alta ✓ $ 1.400.000
M-03 Control de Suscripciones Gestiona contratos recurrentes con fechas de vencimiento, valores y estado de pago. Genera alertas automáticas de renovación para evitar pérdida de clientes. Alta ✓ $ 1.200.000
M-04 Gestión de Eventos y Charlas Cubre el ciclo completo de cada evento: cupos, lista de inscritos, cobros y materiales. Facilita el seguimiento post-evento y métricas de asistencia. Alta ✓ $ 1.100.000
M-05 Pipeline de Ventas Visualiza oportunidades comerciales por etapas: contacto, propuesta, negociación y cierre. Permite identificar cuánto valor tiene en proceso el negocio. Alta ✓ $ 900.000
M-06 Agenda y Programación Calendario digital unificado para sesiones, visitas, charlas y vencimientos, con recordatorios automáticos y asignación de responsables. Media ✓ $ 700.000
M-07 Panel Gerencial (Dashboard) Vista consolidada del negocio: ingresos del mes, clientes activos, suscripciones por vencer y oportunidades en el pipeline. Sin reportes manuales. Alta ✓ $ 800.000
M-08 Asistente de IA para Propuestas Genera borradores de propuestas comerciales personalizadas a partir del perfil del cliente. Reduce el tiempo de elaboración de horas a minutos. Media ✓ $ 700.000
M-09 Gestión de Usuarios y Roles Administra perfiles de acceso con niveles diferenciados según el rol de cada persona, garantizando seguridad y privacidad de la información. Alta ✓ $ 700.000
SUBTOTAL $ 9.000.000
5. MÓDULOS FUERA DEL ALCANCE INICIAL (FASE 2)
Cód. Módulo Justificación de Exclusión
M-10 Portal del Cliente Requiere que el sistema central esté maduro. No es crítico para la operación inicial.
M-11 Facturación Electrónica Requiere integración contable compleja. Se recomienda herramienta externa (Alegra/Siigo) en la fase inicial.
M-12 Informes PDF Automáticos Alta complejidad en personalización de plantillas. Se planea en fase 2 una vez definidos los formatos.
M-13 App Nativa iOS/Android El diseño PWA cubre la necesidad móvil inicial. App nativa implica costo adicional no justificado aún.
M-14 Integración WhatsApp Business Depende de APIs con costos variables. Se evalúa en versión posterior una vez consolidado el flujo.
6. DISTRIBUCIÓN DEL PRESUPUESTO
© 2026 – Documento Académico Confidencial | Corporación Universitaria Minuto de Dios Pág. 4
N° Rubro Valor (COP)
1 Análisis, diseño UX/UI y arquitectura del sistema $ 1.000.000
2 Desarrollo de 9 módulos funcionales (M-01 a M-09) $ 9.000.000
3 Capacitación al equipo (2 sesiones) + manual de usuario Incluido
4 Pruebas de calidad (QA) y ajustes finales Incluido
TOTAL DEL PROYECTO $ 10.000.000 COP
Conclusión: El presupuesto de $10.000.000 COP cubre en su totalidad los 9 módulos funcionales propuestos, incluyendo análisis, diseño y pruebas. El proyecto es viable dentro del límite establecido.
7. OBSERVACIONES GENERALES SOBRE VIABILIDAD PRESUPUESTAL
7.1 Viabilidad del Alcance
Los 9 módulos propuestos cubren todos los procesos críticos del negocio: digitalización de las tres líneas de servicio (consultorías, suscripciones y eventos), incorporación práctica de inteligencia artificial y acceso multiplataforma mediante tecnología PWA.
7.2 Coherencia Presupuestal
El proyecto se ajusta exactamente a $10.000.000 COP distribuyendo el 100% en desarrollo de módulos con capacitación y pruebas incluidas. Los costos de infraestructura se gestionarán en un modelo de mantenimiento mensual posterior a la entrega.
7.3 Consideraciones Especiales
• Solución PWA: acceso desde computador, tablet y celular sin instalar aplicaciones separadas.
• Interfaz simplificada: flujos de máximo 3 pasos, íconos intuitivos y lenguaje claro para el usuario.
• Versión beta disponible en las primeras 4–6 semanas (M-01, M-02, M-03 y M-07) para validación temprana.
• El módulo de IA (M-08) aumenta su valor con el uso, nutriéndose del historial del propio sistema.
• Sistema escalable: crece en funcionalidades sin necesidad de reemplazarlo, protegiendo la inversión.
7.4 Riesgos y Medidas de Mitigación
Riesgo Probabilidad Mitigación
Cambios en el alcance durante el desarrollo Media Control de cambios formal con cláusula de alcance fijo en el contrato.
Baja adopción por falta de hábito digital Media Capacitación, manual ilustrado y diseño de interfaz simplificada.
Subestimación del módulo de IA Baja Alcance acotado: generación de borradores, no decisiones autónomas.
Requerimientos ambiguos que retrasen el proyecto Media Validación de prototipos con el cliente en cada fase antes de continuar.
8. CRONOGRAMA GENERAL ESTIMADO
El proyecto se estructura en 5 fases con duración total de 12 semanas. La entrega de la versión beta al final de la Fase 2 permite al cliente validar la dirección del proyecto de forma temprana.
Fase Semanas Actividades Principales Entregable
1 1 – 2 Análisis detallado de requerimientos, diseño de base de datos y prototipos de interfaz (mockups) Prototipo aprobado
© 2026 – Documento Académico Confidencial | Corporación Universitaria Minuto de Dios Pág. 5
Fase Semanas Actividades Principales Entregable
2 3 – 6 Desarrollo módulos core: M-01, M-02, M-03, M-07 Beta funcional – validación del cliente
3 7 – 9 Desarrollo módulos complementarios: M-04, M-05, M-06, M-08, M-09 y versión PWA multiplataforma Sistema completo en pruebas
4 10 – 11 Pruebas funcionales, corrección de errores y ajustes de usabilidad Sistema validado
5 12 Capacitación, manual de usuario y puesta en producción Sistema en operación
TOTAL 12 sem. Entrega integral del proyecto Sistema listo
9. VALIDACIÓN Y FIRMAS
El presente informe ha sido elaborado con base en la información recolectada en la entrevista inicial. Se solicita revisión y firma como constancia de que los módulos propuestos reflejan las necesidades del cliente y que el alcance se ajusta al presupuesto establecido.
Firma del Equipo Analista Visto Bueno – Docente
Freddy Stiven Castro Pardo
Juan David Acuña Ballen
Felipe Alejandro Patiño Hernandez
Firma: _______________________________
Fecha: Mayo 2026
BRAYAN CAMILO CLAVIJO GOMEZ
Firma: _______________________________
Fecha: _______________

CONTRATO DE DESARROLLO DE SOFTWARE
Sistema de Gestión Digital para Consultoría - BETA 1
CONTRATO CELEBRADO ENTRE PARTES
1. PARTES CONTRATANTES
1.1 CLIENTE (Primera Parte)
Concepto Descripción
Nombre Brayan Camilo Clavijo Gómez
Rol/Cargo Gerente/Propietario - Consultoría de Servicios
Cédula ________
Teléfono ________
Email ________
Domicilio ________
Ciudad/País ________
1.2 DESARROLLADOR (Segunda Parte)
Concepto Descripción
Nombre Legal Trucha Team
Integrantes Freddy Stiven Castro Pardo / Juan David Acuña Ballen / Felipe Alejandro Patiño Hernández
Especialidad Desarrollo de Software Web
Contacto ________
Email ________
Domicilio ________
1.3 TERCERO INTERVENTOR (Opcional)
Concepto Descripción
Nombre ________
Rol Revisor / Auditor Técnico (Opcional)
Contacto ________
Email ________
2. ANTECEDENTES
Considerando que:
2.1 El Cliente
- Es una empresa de consultoría especializada en [HSE/Mejora de Procesos Empresariales]
- Atiende actualmente 150+ clientes con procesos manuales (Excel, agenda física, email)
- Requiere digitalizar sus operaciones para mejorar eficiencia y trazabilidad
- Ha expresado su interés en un sistema tecnológico escalable y viable
2.2 El Desarrollador
- Trucha Team es un equipo especializado en desarrollo de software web
- Cuenta con experiencia en sistemas similares
- Ha presentado una propuesta técnica y presupuestaria viable
- Se compromete a ejecutar el proyecto bajo estándares de calidad profesionales
2.3 La Necesidad del Proyecto
- Se ha realizado levantamiento de requerimientos documentado
- Se han identificado módulos prioritarios para fase inicial (Beta 1)
- Se ha validado viabilidad técnica, presupuestaria y temporal
- Se requiere formalizar compromisos antes de inicio de desarrollo
3. OBJETO DEL CONTRATO
3.1 Desarrollo de Sistema de Gestión Digital
El DESARROLLADOR se compromete a diseñar, desarrollar, implementar, documentar y capacitar un sistema de gestión digital integrado que permita al CLIENTE gestionar de forma centralizada:
Clientes y prospectos
Servicios y contratos
•
•
Calendario de actividades y tareas
Panel gerencial con indicadores clave
Usuarios y roles de acceso
3.2 Caracterización del Producto
Aspecto Descripción
Nombre del Sistema Sistema de Gestión Digital Integrado (SGDI) - BETA 1
Tipo de Aplicación Aplicación Web Progresiva (PWA)
Plataformas Soportadas PC, Tablet, Smartphone (navegadores modernos)
Usuarios Simultáneos Máximo 5-10 usuarios internos
Registros Iniciales 150+ clientes (migración desde Excel)
Vigencia 12 semanas de desarrollo
3.3 Exclusiones Explícitas
El presente contrato NO incluye:
- Portal de acceso para clientes externos (Beta 2)
- Generación automática de reportes PDF (Beta 2)
- Módulo de facturación integrada (herramienta externa recomendada)
- Inteligencia artificial para generación de propuestas (Beta 3)
- App nativa para iOS/Android (PWA es suficiente)
- Integración con WhatsApp Business (Beta 2+)
- Mantenimiento posterior a 30 días post-entrega (contratación separada)
4. ALCANCE DEL PROYECTO
4.1 Módulos Incluidos en Beta 1
Módulo Funcionalidades Core Prioridad
M-01: Gestión de Clientes Crear, editar, eliminar, buscar clientes; asociar documentos CRÍTICA
M-02: Gestión de Servicios Crear contratos, cambiar estado, registrar hitos, alertas vencimiento CRÍTICA
M-03: Calendario y Tareas Programar actividades, asignar responsables, recordatorios CRÍTICA
M-04: Panel Gerencial ALTA
•
•
•
Módulo Funcionalidades Core Prioridad
Dashboard con KPIs, métricas en tiempo real, últimas actividades
M-05: Gestión de Usuarios Crear usuarios, login seguro, roles y permisos diferenciados CRÍTICA
4.2 Requerimientos No Funcionales Incluidos
Categoría Requerimientos
Seguridad HTTPS, autenticación segura, RBAC, validación de entrada, auditoría, backup automático
Rendimiento Carga < 2 seg, concurrencia 5+ usuarios, escalabilidad 150+ registros
Usabilidad Interfaz simplificada, responsiva (PC/Tablet/Móvil), mensajes claros, manual incluido
Disponibilidad 99% uptime horario operacional, soporte 30 días post-entrega
Compatibilidad Chrome, Firefox, Safari, Edge (últimas versiones); iOS 12+, Android 8+
Documentación Código comentado, especificación técnica, manual de usuario, README
4.3 Cronograma General
Fase Semanas Descripción Entregable
1. Análisis y Diseño 1-2 Diseño BD, prototipos UI, arquitectura técnica Mockups + Spec técnico
2. Desarrollo Core 3-5 Backend APIs, Base de datos, módulos críticos Backend funcional
3. Interfaz y PWA 6-8 Frontend, adaptación mobile, Service Workers App web funcional
4. Testing y QA 9-10 Testing funcional, bugs, optimizaciones Sistema probado
5. Entrega Final 11-12 Documentación, capacitación, go-live Sistema en producción
TOTAL 12 semanas Proyecto completo Sistema operacional
5. OBLIGACIONES DEL DESARROLLADOR
5.1 Obligaciones Generales
El DESARROLLADOR se compromete a:
5.1.1 Ejecutar el Proyecto
 Desarrollar sistema conforme a requerimientos documentados
 Respetar cronograma establecido (12 semanas)
 Entregar módulos de forma incremental según fases
 Realizar todas las actividades descritas en el documento de requerimientos
 Mantener comunicación regular con el CLIENTE
5.1.2 Calidad del Producto
 Código limpio, comentado y siguiendo estándares de buenas prácticas
 Testing exhaustivo: unitario, integración y funcional
 Cero bugs críticos; máximo 3 bugs moderados en entrega
 Desempeño según especificación (< 2 seg carga, etc.)
 Seguridad conforme estándares OWASP y ISO 27001
5.1.3 Documentación Completa
 Manual de usuario en español (mínimo 30 páginas con pantallazos)
 Especificación técnica (diagramas ER, API endpoints, deployment)
 README con instrucciones setup y variables de entorno
 Guía de troubleshooting y FAQ
 Video tutorial 10-15 minutos de uso básico
5.1.4 Capacitación Incluida
 3 sesiones de capacitación (2 horas cada una)
 Contenido: navegación, tareas diarias, casos de uso, FAQ
 Formato: Presencial o remoto según disponibilidad del CLIENTE
 Materiales: Presentación + manual + video
 Soporte post-capacitación: disponibilidad 30 días
5.1.5 Migración de Datos
 Revisar y limpiar datos de cliente desde Excel
 Diseñar proceso de importación seguro
 Ejecutar migración con validación del CLIENTE
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
 Verificar integridad de datos post-importación
 Backup previo a migración
5.1.6 Entrega y Deployment
 Configurar hosting/servidor (infraestructura del CLIENTE o recomendada)
 Instalar certificado SSL/HTTPS válido
 Configurar base de datos en entorno de producción
 Realizar testing en producción
 Proveer acceso seguro al CLIENTE
5.1.7 Soporte Post-Entrega (30 días)
 Corrección de bugs encontrados sin costo adicional
 Respuesta en máximo 24 horas a reportes críticos
 Asesoramiento en uso del sistema
 Ajustes menores por solicitud del CLIENTE
Después de 30 días: Plan de mantenimiento separado ($500K/mes)
5.2 Responsabilidades Técnicas
5.2.1 Infraestructura y Seguridad
 Implementar HTTPS con certificado válido
 Configurar autenticación segura (hash bcrypt, salt >= 10 rounds)
 Implementar RBAC (Control de Acceso Basado en Roles)
 Validación de entrada en cliente y servidor
 Protección contra inyección SQL, XSS, CSRF
 Logs de auditoría de cambios críticos (90 días mínimo)
 Política de respaldo y recuperación testeada
5.2.2 Rendimiento y Escalabilidad
 Optimizar tiempos de respuesta (< 2 seg promedio)
 Índices de base de datos en campos de búsqueda frecuente
 Caché en cliente para datos no críticos
 Paginación en listados (máximo 50 registros por página)
 Testing de carga con 5+ usuarios simultáneos
5.2.3 Compatibilidad y Accesibilidad
 Testing en navegadores Chrome, Firefox, Safari, Edge (últimas versiones)
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
 Diseño responsive: PC (1024+px), Tablet (768-1023px), Móvil (<768px)
 Interfaz accesible para usuarios no técnicos (WCAG AA mínimo)
 Botones >= 44px, texto >= 14px, alto contraste
 Funcionamiento sin scroll horizontal
5.2.4 Control de Versiones
 Código en repositorio Git (GitHub, GitLab o similar)
 Ramas organizadas: main, develop, feature/*
 Commits descriptivos, cambios atómicos
 Historia completa y trazable del desarrollo
 Acceso concedido al CLIENTE (solo lectura)
5.3 Hitos de Revisión
El DESARROLLADOR se compromete a presentar al CLIENTE para revisión:
Semana Hito Entregable Criterio de Aceptación
2 Prototipo Aprobado Mockups UI, Especificación técnica Cliente firma "Conforme"
5 Backend Funcional APIs testeadas, BD creada Endpoints validados
8 Frontend Funcional Aplicación web accesible UI responsiva en 3 dispositivos
10 Sistema Completo Todos módulos integrados Testing suite pasa 100% 12
Sistema en Producción Capacitación + Deploy + Docs Go-live confirmado por cliente
6. OBLIGACIONES DEL CLIENTE
6.1 Obligaciones Generales
El CLIENTE se compromete a:
6.1.1 Participación y Disponibilidad
 Asignar contacto responsable (preferiblemente Gerente)
 Estar disponible para reuniones de validación en semanas 2, 5, 8, 10
 Responder consultas del equipo de desarrollo en máximo 48 horas
 Participar en capacitación (3 sesiones)
 Validar datos antes de importación a sistema
•
•
•
•
•
•
•
•
•
•
•
•
•
•
6.1.2 Información y Documentación
 Proporcionar datos de los 150+ clientes en formato Excel limpio
 Documentar procesos actuales (workflows de negocio)
 Explicar decisiones de negocio que impacten requerimientos
 Identificar personal clave para cada rol
 Definir políticas de acceso para cada usuario
6.1.3 Infraestructura
 Proveer servidor/hosting o autorizar uso de plataforma recomendada
 Configurar dominio web (si aplica)
 Permitir acceso a credenciales de hosting (seguro)
 Proporcionar capacidad de almacenamiento (mínimo 50 GB)
6.1.4 Pagos Puntales
 Realizar pagos según calendario establecido (ver sección 7)
 Pagos sin retenciones tributarias no aplicables
 Comunicar cualquier inconveniente de pago con antelación
6.1.5 Aceptación Formal
 Revisar entregables en plazo máximo de 3 días
 Indicar conformidad o requerir ajustes
 Firmar acta de conformidad al final de cada fase
 Validar completeness en semana 12
6.2 Restricciones del Cliente
El CLIENTE NO puede:
- Solicitar cambios de alcance sin proceso formal (ver sección 9)
- Compartir código fuente con terceros sin autorización
- Modificar sistema sin coordinación con DESARROLLADOR
- Exigir cambios retroactivos después de firma de fase
7. PRESUPUESTO Y FORMA DE PAGO
7.1 Inversión Total
VALOR TOTAL DEL PROYECTO: $10.000.000 COP (Diez Millones de Pesos Colombianos)
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
Nota: Este es presupuesto académico. En contexto empresarial real incluiría hosting, dominio y soporte extendido.
7.2 Distribución del Presupuesto
Concepto Horas Valor (COP) Porcentaje
Análisis y Diseño 60 $1.200.000 12%
Desarrollo Backend 200 $4.000.000 40%
Desarrollo Frontend y PWA 180 $3.600.000 36%
Migración de datos y QA 80 $1.200.000 12%
TOTAL 520 $10.000.000 100%
7.3 Calendario de Pagos
Hito Semana Evento Pago
1 0 Firma del Contrato e Inicio $5.000.000 (50%)
2 2 Prototipo Aprobado $0 (validación)
3 5 Backend Funcional $3.000.000 (30%)
4 10 Sistema Completo testeado $0 (validación)
5 12 Go-Live y Capacitación $2.000.000 (20%)
TOTAL $10.000.000
7.4 Condiciones de Pago
Forma de Pago: Transferencia bancaria o depósito en cuenta
Moneda: Pesos Colombianos (COP)
Plazo de Pago: Máximo 5 días hábiles después de cumplimiento de hito
Impuestos: El monto incluye IVA (si aplica según legislación local)
Retenciones: Según normativa tributaria vigente
7.5 Costos No Incluidos
El presupuesto NO incluye:
- Hosting/Servidor (puede usarse servidor existente del cliente)
- Dominio web (cliente responsable)
- Certificado SSL (puede usarse Let's Encrypt gratuito)
•
•
•
•
•
- Mantenimiento post-30 días (contratación separada)
- Cambios de alcance (sujeto a control de cambios)
8. ENTREGABLES Y CRITERIOS DE ACEPTACIÓN
8.1 Entregables por Fase
Fase 1: Análisis y Diseño (Semana 2)
Entregable Formato Criterios de Aceptación
Mockups de Interfaces PDF + Figma Cliente aprueba diseño visual
Especificación Técnica Documento + Diagrama ER Claridad de arquitectura, BD definida
Plan de Implementación Documento Cronograma aceptado
Estado: APROBADO O REQUIERE AJUSTES
Acta de Conformidad: Cliente firma "Conforme" o especifica cambios
Fase 2: Backend Funcional (Semana 5)
Entregable Formato Criterios de Aceptación
APIs REST Documentadas Swagger/OpenAPI + README Endpoints funcionan, datos retornados correctos
Base de Datos SQL scripts Tablas creadas, relaciones validadas
Módulos Core (M-01 a M-04) Código + Pruebas unitarias Testing suite con >= 80% cobertura
Documentación de BD Documento + Diagramas Normalización correcta
Estado: FUNCIONAL O BUGS PENDIENTES
Acta de Conformidad: Cliente valida funcionalidad de APIs
Fase 3: Frontend Funcional (Semana 8)
Entregable Formato Criterios de Aceptación
Interfaz Web Completa URL accesible Todos módulos visibles, navegables
PWA Funcional Cualquier navegador, PC/Tablet/Móvil Sin scroll horizontal, responsive
Módulo de Usuarios URL + Documentación Login funciona, roles aplicados
Testing Funcional Reporte de Testing 0 bugs críticos, máximo 3 moderados
Estado: USABLE O REQUIERE OPTIMIZACIONES
Acta de Conformidad: Cliente prueba en 3 dispositivos
Fase 4: Sistema Completo (Semana 10)
Entregable Formato Criterios de Aceptación
Sistema Integrado URL en producción staging Todos módulos funcionan, datos persisten
Suite de Testing Completa Reporte detallado 100% requirements funcionales validados
Manual de Usuario PDF + Videos Mínimo 30 páginas, casos de uso cubiertos
Especificación Técnica Final Documento + Diagramas Arquitectura, BD, APIs completamente documentados
Estado: APROBADO O CAMBIOS REQUERIDOS
Acta de Conformidad: Cliente firma aceptación técnica
Fase 5: Sistema en Producción (Semana 12)
Entregable Formato Criterios de Aceptación
Código Fuente Completo Repositorio Git Acceso concedido, historial completo
Sistema en Producción URL activa Funcionando 24/7, accesible por equipo cliente
Entregable Formato Criterios de Aceptación
Capacitación Completada Sesiones + Asistencia 3 sesiones realizadas, equipo capacitado
Documentación Entregada Todos documentos impresos/digital Recibido conforme por cliente
Plan de Mantenimiento Documento Opciones y costos post-30 días
Estado: PROYECTO COMPLETADO
Acta de Cierre: Cliente firma conformidad final, proyecto cerrado
8.2 Criterios de Aceptación General
Funcional:
- Todos RF CRÍTICA funcionan correctamente
- Todos RF ALTA funcionan (salvo cambios aprobados)
- 0 bugs que causen pérdida de datos
- 0 vulnerabilidades de seguridad críticas
Técnico:
- Tiempo de respuesta < 2 segundos
- 99% uptime en testing de carga (5 usuarios)
- Código comentado y legible
- Testing coverage >= 80%
Operacional:
- Manual de usuario completo y comprensible
- Capacitación completada, equipo operacional
- Datos migrados correctamente
- Sistema en producción, accesible por usuario final
Aceptación Final:
- Cliente firma acta de conformidad final
- No hay requerimientos pendientes del contrato
9. CONTROL DE CAMBIOS
9.1 Proceso de Solicitud de Cambios
Cualquier modificación al alcance, requerimientos o cronograma debe seguir este proceso:
Paso 1: Solicitud Formal
Cliente emite solicitud escrita (email, documento firmado)
Incluye: descripción, justificación, impacto estimado
Dirigida a: Líder Técnico del equipo desarrollo
Paso 2: Análisis de Impacto
Equipo dev valúa: esfuerzo requerido, costo, riesgo
Genera reporte: Si es viable, cuántos días agrega, qué módulos afecta
Plazo de respuesta: Máximo 3 días laborales
Paso 3: Aprobación o Rechazo
Si es menor (< 8 horas): Aprobado dentro de margen de contingencia
Si es mayor: Requiere:
Aprobación conjunta (Cliente + Supervisor Académico + Líder Dev)
Enmienda al contrato (cambio de presupuesto/cronograma)
Firma de todas las partes
Si es mayor y excede presupuesto: Se rechaza o se propone versión reducida
Paso 4: Implementación
Cambio aprobado se documenta en "Registro de Cambios"
Se actualiza cronograma/presupuesto si aplica
Se continúa con desarrollo
9.2 Cambios No Permitidos
Los siguientes cambios NO son permitidos sin modificación del contrato:
- Agregar módulos completos (M-06, M-07, etc.)
- Cambiar tecnología de desarrollo (ej: de React a Vue)
- Aumentar número de usuarios simultáneos a > 10
- Reducir plazo de 12 semanas
- Agregar integraciones complejas (WhatsApp, Stripe, etc.)
9.3 Registro de Cambios
Cambio Fecha Solicitado por Aprobado Impacto
(Ninguno registrado al momento)
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
10. GARANTÍAS Y RESPONSABILIDADES
10.1 Garantías del Desarrollador
El DESARROLLADOR garantiza que:
10.1.1 Sobre el Producto
 El sistema funcionará conforme especificación técnica
 No habrá pérdida de datos por defecto del sistema (backup incluido)
 Todas las funcionalidades requeridas estarán implementadas
 El sistema será seguro contra vulnerabilidades OWASP Top 10
 El código será original, sin librerías con licencias restrictivas
10.1.2 Período de Garantía
30 días post-entrega: Corrección de bugs sin costo
6 meses: Garantía contra defectos funcionales graves
90 días: Disponibilidad para consultas y soporte
10.1.3 Límites de Garantía
 NO cubre cambios solicitados fuera del alcance
 NO cubre problemas causados por infraestructura del cliente (servidor, internet)
 NO cubre mal uso del sistema
 NO cubre incompatibilidad con navegadores obsoletos
10.2 Responsabilidades del Desarrollador
El DESARROLLADOR es responsable por:
- Defectos en el código desarrollado
- Pérdida de datos por falla de seguridad del sistema
- Incumplimiento de cronograma (penalización de 1% presupuesto por semana retrasada, máximo 4 semanas)
- Violación de confidencialidad
- Uso indebido de datos del cliente
10.3 Exoneración de Responsabilidad
El DESARROLLADOR NO es responsable por:
- Daños causados por falla de infraestructura (servidor del cliente caído)
- Problemas de conectividad/internet del cliente
- Mal uso del sistema por parte del usuario
•
•
•
•
•
•
•
•
•
•
•
•
- Cambios en tecnología (navegadores descontinuados)
- Pérdida de datos del cliente si no cumple protocolo de backup
10.4 Limitación de Responsabilidad
La responsabilidad total del DESARROLLADOR no excederá el 100% del presupuesto del proyecto ($10.000.000 COP). El CLIENTE renuncia a reclamar daños y perjuicios adicionales.
11. CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS
11.1 Confidencialidad
11.1.1 Información Confidencial
Se considera información confidencial:
- Datos de clientes del CLIENTE (nombre empresa, contactos, servicios)
- Procesos de negocio y estrategia del CLIENTE
- Información financiera del CLIENTE
- Especificaciones técnicas del sistema
- Credenciales de acceso
11.1.2 Obligaciones del Desarrollador
 No divulgar información confidencial del CLIENTE a terceros
 Acceso limitado a personal de desarrollo del proyecto
 Destruir datos del CLIENTE después de 6 meses post-entrega
 Usar datos únicamente para desarrollo/testing del sistema
 Confidencialidad se mantiene por 5 años después del contrato
11.1.3 Obligaciones del Cliente
 No divulgar código fuente a competidores
 No publicar screenshots sin autorización
 No usar código para otros proyectos sin acuerdo
11.1.4 Excepciones a Confidencialidad
Se puede divulgar información sin consentimiento si:
- Requerido por ley o autoridad competente (con notificación previa)
- Necesario para defensa legal de las partes
- Aprobado explícitamente por la otra parte por escrito
•
•
•
•
•
•
•
•
11.2 Protección de Datos Personales
11.2.1 Cumplimiento Normativo
El sistema cumple con:
- Regulaciones de protección de datos aplicables (GDPR/HABEAS si aplica)
- Principios de confidencialidad, integridad y disponibilidad
- Derecho del sujeto a acceso, rectificación, eliminación
11.2.2 Datos del Cliente en el Sistema
Almacenados en base de datos encriptada en reposo
Transmitidos por HTTPS (encriptación en tránsito)
Accesibles solo por usuario autenticado con rol apropiado
Respaldo automático, almacenado de forma segura
11.2.3 Derecho a la Privacidad
Cliente puede solicitar reporte de sus datos en el sistema
Cliente puede solicitar eliminación de datos (soft delete o hard delete)
DESARROLLADOR responde en plazo máximo de 10 días laborales
11.3 Seguridad de la Información
11.3.1 Medidas de Seguridad Implementadas
 Autenticación con contraseña encriptada (bcrypt)
 Sesiones seguras con timeout
 HTTPS con certificado SSL/TLS válido
 Validación de entrada (prevención XSS, SQL injection)
 RBAC (solo usuarios autorizados ven datos)
 Logs de auditoría de acciones críticas
 Backup automático diario, almacenado seguro
11.3.2 Responsabilidades del Cliente
 Usar contraseña fuerte (>= 8 caracteres)
 No compartir credenciales
 Reportar acceso sospechoso inmediatamente
 Mantener software de navegador actualizado
 No usar WiFi público para acceder a datos sensibles
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
11.3.3 Respuesta ante Brechas de Seguridad
Si se detecta violación de seguridad:
1. DESARROLLADOR investigará en máximo 24 horas
2. Notificará al CLIENTE con detalle del incidente
3. Implementará parches/correcciones
4. Documentará en log de incidentes
5. Si datos personales comprometidos: notificación a autoridades (si aplica)
12. PROPIEDAD INTELECTUAL
12.1 Propiedad del Código
Componente Propietario Derechos
Código Fuente del Sistema CLIENTE Propiedad total, posibilidad de modificar
Documentación Técnica CLIENTE Propiedad total, uso interno
Librerías Externas Autores originales Sujeto a licencia respectiva
Diseño de Interfaz CLIENTE Propiedad total
Manual de Usuario CLIENTE Propiedad total, posibilidad de adaptar
12.2 Entrega de Código Fuente
El CLIENTE recibirá acceso completo al repositorio Git
Incluye: Historia de commits, ramas, documentación
Formato: Acceso a repositorio o backup en USB/nube
Plazo: Al completar fase 12
12.3 Licencias de Dependencias
El sistema puede usar librerías Open Source con licencias como:
- MIT (permisiva, recomendada)
- Apache 2.0 (permisiva)
- GPL (copyleft, requiere que derivados sean open source)
Restricción: DESARROLLADOR no usará librerías con licencias restrictivas sin consentimiento del CLIENTE.
•
•
•
•
12.4 Reutilización de Código del Desarrollador
DESARROLLADOR puede reutilizar:
- Patrones de código genérico (no específico de cliente)
- Librerías propias sin identificación del CLIENTE
- Conocimiento y experiencia aplicada
DESARROLLADOR NO puede reutilizar:
- Código específico del CLIENTE
- Lógica de negocio personalizada
- Datos del CLIENTE
13. TERMINACIÓN DEL CONTRATO
13.1 Terminación por Cumplimiento
El contrato se da por terminado automáticamente al cumplir fase 12 (semana 12) con:
- Sistema entregado en producción
- Capacitación completada
- Documentación entregada
- Acta de conformidad firmada por ambas partes
13.2 Terminación Anticipada por Causa del Cliente
El CLIENTE puede terminar el contrato si:
- DESARROLLADOR incumple hito crítico por > 2 semanas
- Hay defectos graves no solucionables en plazo razonable
- DESARROLLADOR viola confidencialidad
Consecuencias:
- Reembolso: Se calcula prorrateado según trabajo realizado
- Entregables: Se entregan documentos y código parcialmente desarrollado
- Plazo:** Máximo 10 días para resolución
13.3 Terminación Anticipada por Causa del Desarrollador
El DESARROLLADOR puede terminar si:
- CLIENTE no realiza pago en 15 días después del plazo acordado
- CLIENTE solicita cambios permanentemente fuera de alcance
- Evento de fuerza mayor (calamidad pública, cierre de institución)
Consecuencias:
- CLIENTE retiene código solo si pagos están al día
- DESARROLLADOR puede publicar proyecto en portafolio (sin datos cliente)
- Resolución en máximo 10 días
13.4 Suspensión del Contrato
El contrato puede suspenderse temporalmente si:
- Evento de fuerza mayor (ej: pandemia, crisis política)
- Acuerdo mutuo en escrito
Duración: Máximo 30 días; después se considera terminación
13.5 Efecto de la Terminación
Después de terminación:
- Código accesible al CLIENTE (si pagos están al día)
- Datos del CLIENTE removidos de servidores del DESARROLLADOR
- Confidencialidad se mantiene por 5 años
- Terceros (supervisor académico) actúan como árbitro si hay conflicto
14. RESOLUCIÓN DE CONFLICTOS
14.1 Procedimiento de Resolución
En caso de disputa sobre ejecución del contrato:
Nivel 1: Negociación Directa (Semana 1)
Partes se reúnen para discutir el conflicto
Intenta alcanzarse acuerdo mutuo
Se documenta la reunión (acta)
Nivel 2: Intervención Supervisor (Semana 2)
Si no se resuelve, supervisor académico actúa como mediador
Evalúa situación desde perspectiva técnica y contractual
Propone solución que sea justa y viable
Nivel 3: Resolución Formal (Semana 3+)
Si persiste conflicto:
Proyecto académico: Supervisor y director de programa toman decisión
Proyecto comercial: Arbitraje o mediación según legislación aplicable
•
•
•
•
•
•
•
•
•
14.2 Resolución de Disputas de Calidad
Disputa Criterio de Resolución
"Sistema no funciona" Testing independent, validación con especificación
"Incumplimiento de cronograma" Revisión de commits, evidencia de avance
"Interfaz no cumple diseño" Comparación con mockups aprobados
"Datos perdidos" Revisión de logs de auditoría, backup
"Cambio fue agregatado sin pago" Revisión de control de cambios
15. DISPOSICIONES GENERALES
15.1 Vigencia del Contrato
Inicio: Fecha de firma del presente contrato
Vigencia: 12 semanas (84 días calendario)
Fin: Firma de acta de conformidad final (semana 12)
Soporte post: 30 días adicionales sin costo
Garantía: 6 meses desde go-live
15.2 Jurisdicción y Legislación
Este contrato se rige conforme a:
- Legislación de [País/Departamento] donde se ejecuta proyecto
- Leyes de protección de datos aplicables
- Principios de buena fe y equidad
- Normas universitarias (contexto académico)
15.3 Comunicaciones Oficiales
Todas las comunicaciones oficiales deben hacerse por:
- Email (con acuse de recibo)
- Documento firmado en físico
- Reunión presencial documentada en acta
NO son válidas: Mensajes WhatsApp, Slack, llamadas telefónicas (solo confirmación posterior).
•
•
•
•
•
15.4 Enmiendas al Contrato
Cualquier cambio a este contrato debe:
- Ser por escrito
- Firmado por ambas partes
- Numerado y fechado
- Adjunto al presente contrato
15.5 Severabilidad
Si una cláusula de este contrato es inválida o inaplicable:
- Dicha cláusula se considera nula
- Las demás cláusulas siguen siendo válidas
- Partes acuerdan remplazar cláusula nula por alternativa legal equivalente
15.6 No Tercerización
El DESARROLLADOR NO puede subcontratar trabajo sin consentimiento escrito del CLIENTE.
El DESARROLLADOR es responsable ante el CLIENTE por cualquier subcontratista.
15.7 Cesión de Derechos
Ninguna de las partes puede ceder derechos/obligaciones del contrato sin consentimiento por escrito de la otra parte.
16. FIRMAS Y VALIDACIÓN
16.1 Aceptación de Términos
Al firmar este contrato, ambas partes aceptan y entienden:
- Todos los términos y condiciones descritos
- El alcance y cronograma del proyecto
- Presupuesto fijo de $10.000.000 COP
- Obligaciones y responsabilidades mutuas
- Políticas de confidencialidad y seguridad
- Procedimiento de resolución de conflictos
16.2 Firmas Autorizadas
Rol Nombre Cargo Firma Cédula Fecha
Cliente Brayan Camilo Clavijo Gómez Propietario/Gerente
Rol Nombre Cargo Firma Cédula Fecha
Líder Técnico - Trucha Team Freddy Stiven Castro Pardo Líder Técnico
Desarrollador - Trucha Team Juan David Acuña Ballen Desarrollador
Desarrollador - Trucha Team Felipe Alejandro Patiño Hernández Desarrollador
16.3 Vigencia de Firmas
Las firmas en este documento acreditan:
- Conocimiento pleno del contenido del contrato
- Consentimiento informado de las partes
- Autoridad para firmar en nombre de la entidad representada
- Compromiso de cumplimiento conforme a términos
17. ANEXOS
Anexo A: Especificación Técnica (Referencia)
Documento separado: "Levantamiento_Requerimientos_Sistema.md"
Detalla:
- Requerimientos funcionales completos (RF-M01-001 a RF-M05-006)
- Requerimientos no funcionales (RNF-SEC-001 a RNF-MANT-003)
- Criterios de aceptación
- Priorización MoSCoW
Anexo B: Cronograma Detallado (Referencia)
Documento separado: "RESUMEN_BETA1_Proyecto.md"
Detalla:
- Fases 1-5
- Hitos por semana
- Responsables
- Validaciones cliente
Anexo C: Matriz de Riesgos (Referencia)
Riesgos identificados y mitigaciones:
- Scope creep → Control de cambios formal
- Retrasos → Buffer de 1 semana, standup daily
- Baja adopción → Capacitación presencial + manual ilustrado
- Pérdida datos → Backup diario + testing migración
Anexo D: Políticas de Acceso y Seguridad
Gestión de credenciales
Protocolos de backup
Respuesta ante incidentes
Auditoría y compliance
18. APROBACIONES Y VALIDACIONES
18.1 Aprobación Técnica
Especificación Técnica Aprobada: __ Fecha: ____
Cronograma Aceptado: __ Fecha: ____
Recursos Confirmados: __ Fecha: ____
18.2 Aprobación Legal/Administrativa
Revisión Legal (si aplica): __ Fecha: ____
Autorización Presupuestaria: __ Fecha: ____
CLAUSULA FINAL
El presente contrato entra en vigor a partir de la fecha de su firma por las partes autorizadas y permanece vigente por el plazo de 12 semanas (84 días calendario) contados desde el inicio del proyecto, prorrogables por las partes si ambas están de acuerdo.
Se firma en dos (2) ejemplares, cada uno con el mismo valor legal.
FIRMA DEL CLIENTE
Firma: ____
Nombre: Brayan Camilo Clavijo Gómez
Cargo: Propietario/Gerente
Cédula: ____
•
•
•
•
•
•
•
•
Fecha: ____
FIRMA DEL DESARROLLADOR (Trucha Team)
Firma: ____
Nombre: Freddy Stiven Castro Pardo
Cargo: Líder Técnico
Cédula: ____
Fecha: ____
Firma: ____
Nombre: Juan David Acuña Ballen
Cargo: Desarrollador
Cédula: ____
Fecha: ____
Firma: ____
Nombre: Felipe Alejandro Patiño Hernández
Cargo: Desarrollador
Cédula: ____
Fecha: ____
VISTO BUENO DEL TERCERO INTERVENTOR (Opcional)
Firma: ____
Nombre: ____
Cargo: Revisor/Auditor
Cédula: ____
Fecha: ____
© 2026 – Documento Confidencial | Trucha Team
Contrato de Desarrollo de Software | Proyecto BETA 1 | Mayo 2026
