# Changelog

Este changelog usa una organizacion trimestral para dar un panorama rapido del estado del proyecto.

## [Unreleased]

- Sin cambios pendientes.

## Vista rapida (cierre Q2 2026)

- Estado general: actualizacion mayor completada.
- Stack actual: Next.js 16, React 19, Sanity 5, ESLint 9.
- Calidad tecnica: lint y build validados en cierre de actualizacion.
- Riesgos abiertos: no se registran bloqueantes al cierre.

## 2026

### Q2 (Abr-Jun) - Modernizacion y estabilidad

#### Resumen

- Se completo la migracion de la plataforma a un stack moderno.
- Se adapto App Router al modelo async de rutas dinamicas.
- Se establecio una estrategia explicita de cache para datos de Sanity.
- Se reforzo estabilidad en UI y se corrigio un problema de SSR en Studio.

#### Chore

- Actualizar stack del proyecto a Next.js 16, React 19, Sanity 5 y ESLint 9.
- Migrar configuracion de lint a ESLint CLI con flat config.
- Ajustar configuracion de Turbopack para definir la raiz del workspace.
- Reemplazar @dotlottie/react-player por @lottiefiles/dotlottie-react para compatibilidad con React 19.
- Integrar skills locales del proyecto (.agents y skills-lock.json) para soporte de Sanity, Portable Text y UX sin depender del scope global.
- Agregar assets de la mascota virtual estilo pixel art.

#### Feature

- Migrar rutas dinamicas para usar params y searchParams async en App Router.
- Agregar manejo de notFound en rutas dinamicas para evitar errores de prerender.
- Definir estrategia explicita de cache para consultas de Sanity con revalidacion por defecto.
- Integrar soporte de tablas en Studio con @sanity/table y unificar el formato de tabla en Portable Text.
- Agregar bloque Table con configuracion de encabezado opcional y alineacion por columna.
- Implementar renderer responsivo para tablas con scroll horizontal y estilos de lectura mejorados.
- Aplicar renderer compartido en contenido de About para mantener consistencia visual.
- Agregar soporte de pie de imagen (caption) en Portable Text desde schema, query y frontend.
- Mejorar el espaciado de listas con viñetas para corregir alineacion en lineas multilinea.
- Habilitar bloques de codigo en Portable Text usando @sanity/code-input en Studio.
- Implementar renderer de snippets con boton de copiado, etiqueta de lenguaje y soporte de filename.
- Agregar resaltado de sintaxis por lenguaje en bloques de code de Portable Text con Shiki para frontend.
- Separar el boton de copiado en un componente cliente dedicado para mantener interaccion sin perder SSR en el renderer de codigo.
- Implementar sección de compartir contenido en posts y proyectos asi como el asignar sus elementos Open Graph.

#### Fix

- Corregir manejo de estado en ShowComments para evitar warning de setState dentro de effect.
- Corregir dependencia de handleClick en Navbar usando useCallback.
- Corregir fallback de imagen en Post para evitar referencias indefinidas.
- Sustituir img por next/image en PortableTextComponents para optimizacion de imagenes.
- Corregir error de SSR en /studio que causaba "window is not defined" y respuesta 500 en produccion.
- Mover el render de NextStudio a un componente cliente dedicado para evitar evaluacion de codigo del navegador en el servidor.
- Cargar el componente del Studio con import dinamico sin SSR.
- Corregir warning de hidratacion en la raiz de la app por desajuste de atributos en html al aplicar tema oscuro antes de hidratar.
- Agregar suppressHydrationWarning en la etiqueta html del layout principal para alinear SSR y cliente en Next.js 16.
- Corregir defaults de bloques code en schemas de Sanity para persistir `language: text` al crear snippets nuevos y evitar estados `description-null/script` hasta re-seleccionar lenguaje.
- Alinear selector de lenguaje de code-input agregando opcion `Text` y usando modo `sh` en comandos de shell para coherencia visual en Studio.

#### Style

- Actualizar referencia visual de version de Next.js en el footer de 14 a 16.
- Unificar ritmo vertical y espaciado en bloques de Portable Text (titulos, parrafos, listas, tablas, imagenes y codigo).

#### Commits de referencia

- [f418303](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/f418303) - chore: actualizar stack del proyecto a Next 16
- [860bcd6](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/860bcd6) - feat: migrar rutas dinamicas a APIs async
- [233b1cd](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/233b1cd) - feat: agregar revalidacion en consultas de Sanity
- [04b5b6c](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/04b5b6c) - fix: reforzar estabilidad en componentes de contenido y navegacion
- [d9f8bfb](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/d9f8bfb) - fix: corregir mismatch de hidratacion por tema oscuro
- [ad7d43f](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/ad7d43f) - style: actualizar referencia de version en footer
- [1bb8e4c](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/1bb8e4c) - feat: integrar tablas avanzadas y unificar formato de tabla en Portable Text
- [b2a1fa5](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/b2a1fa5) - feat: aplicar renderer compartido y cargar captions desde Sanity
- [004510e](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/004510e) - feat: mejorar bloques de codigo en Portable Text
- [db167a1](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/db167a1) - style: unificar espaciado en bloques Portable Text
- [f6550f4](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/f6550f4) - chore: agregar skills locales del proyecto para Sanity y UX
- [8a32628](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/8a32628) - fix: persistir lenguaje default text en bloques code
- [b604247](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/b604247) - feat: agregar resaltado de sintaxis en bloques de codigo de portable text
- [019c348](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/019c348) - agregar assets de canario virtual estilo pixel art
- [041dcba](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/041dcba) - agregar funcionalidad de compartir contenido y Open Graph en posts y proyectos

### Q1 (Ene-Mar) - Sin actividad

- Proyecto en pausa durante el trimestre.
- Sin releases ni cambios funcionales registrados.
