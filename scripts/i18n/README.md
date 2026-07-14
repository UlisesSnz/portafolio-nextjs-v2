# Migración de contenido bilingüe

Esta carpeta contiene una migración idempotente y por etapas. El modo predeterminado es un **dry run offline**; no se conecta a Sanity ni escribe datos.

## 1. Crear un respaldo

Antes de cualquier escritura:

```powershell
npx sanity datasets export production C:\backups\website-before-i18n.tar.gz --raw --no-drafts --overwrite
```

Conserva el archivo fuera del repositorio y verifica que no esté vacío.

## 2. Dry run con una exportación

```powershell
npm run i18n:migrate -- --source C:\backups\production-export\data.ndjson
```

El proceso comprueba los 24 hashes fuente, que las 1,772 cadenas traducibles estén completas, slugs únicos, 31 pares `es/en` y referencias de categorías remapeadas. Si el contenido fuente cambió, aborta antes de preparar mutaciones.

## 3. Aplicar por etapas

Define `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` y un `SANITY_API_WRITE_TOKEN`. Después ejecuta:

```powershell
npm run i18n:migrate -- --apply --backup C:\backups\website-before-i18n.tar.gz --confirm-project <project-id> --confirm-dataset production
```

Las etapas son:

1. marcar los 24 originales como español y fijar `category.key`;
2. crear categorías inglesas y su metadata;
3. crear el resto del contenido inglés con referencias remapeadas;
4. crear los 14 singletons SEO y sus pares;
5. eliminar metadata legacy privada, si existe de una ejecución anterior.

Se usan IDs deterministas sin puntos, formato v6 con `language`, `createIfNotExists` y patches idempotentes, por lo que una ejecución interrumpida puede reanudarse sin duplicar documentos y una revisión editorial posterior puede actualizar las versiones inglesas. Los IDs sin puntos permiten consultar los pares publicados sin un token desde un dataset público.

## 4. Auditoría remota

```powershell
npm run i18n:audit
```

La auditoría es de sólo lectura y valida conteos, pares, formato v6, visibilidad pública, slugs y referencias. Usa `SANITY_API_READ_TOKEN` o, durante la migración, reutiliza `SANITY_API_WRITE_TOKEN` para detectar también metadata privada legacy. No actives `ENGLISH_ENABLED=true` hasta que termine correctamente.
