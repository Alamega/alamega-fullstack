import {defineConfig} from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    {
        extends: [
            compat.extends("next/core-web-vitals"),
        ],

        languageOptions: {
            globals: {
                ...globals.browser,
            },
            ecmaVersion: 2025,
            sourceType: "module",
        },

        rules: {
            "react/react-in-jsx-scope": "off",
            "no-unused-vars": "warn",
            quotes: ["error", "double"],
            semi: ["error", "always"],
        },
    },
]);