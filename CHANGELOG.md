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

#### Feature

- Migrar rutas dinamicas para usar params y searchParams async en App Router.
- Agregar manejo de notFound en rutas dinamicas para evitar errores de prerender.
- Definir estrategia explicita de cache para consultas de Sanity con revalidacion por defecto.

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

#### Style

- Actualizar referencia visual de version de Next.js en el footer de 14 a 16.

#### Commits de referencia

- [f418303](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/f418303) - chore: actualizar stack del proyecto a Next 16
- [860bcd6](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/860bcd6) - feat: migrar rutas dinamicas a APIs async
- [233b1cd](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/233b1cd) - feat: agregar revalidacion en consultas de Sanity
- [04b5b6c](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/04b5b6c) - fix: reforzar estabilidad en componentes de contenido y navegacion
- [d9f8bfb](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/d9f8bfb) - fix: corregir mismatch de hidratacion por tema oscuro
- [ad7d43f](https://github.com/UlisesSnz/portafolio-nextjs-v2/commit/ad7d43f) - style: actualizar referencia de version en footer

### Q1 (Ene-Mar) - Sin actividad

- Proyecto en pausa durante el trimestre.
- Sin releases ni cambios funcionales registrados.
