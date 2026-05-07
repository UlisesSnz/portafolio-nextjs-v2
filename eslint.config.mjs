import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
    ...nextCoreWebVitals,
    {
        settings: {
            next: {
                rootDir: ".",
            },
        },
    },
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
]);