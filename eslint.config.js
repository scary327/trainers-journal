const js = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const eslintReact = require("eslint-plugin-react");
const eslintReactHooks = require("eslint-plugin-react-hooks");
const eslintReactRefresh = require("eslint-plugin-react-refresh");
const prettierPlugin = require("eslint-plugin-prettier");
const eslintConfigPrettier = require("eslint-config-prettier");

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = tseslint.config(
    {
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            react: eslintReact,
            "react-hooks": eslintReactHooks,
            "react-refresh": eslintReactRefresh,
            prettier: prettierPlugin
        }
    },
    {
        ignores: ["build", "node_modules", "coverage", "eslint.config.js"]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2020
            },
            parserOptions: {
                project: ["tsconfig.json", "tsconfig.node.json"]
            }
        }
    },
    {
        files: ["**/*.{ts,tsx}"],
        rules: {
            ...prettierPlugin.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "prefer-const": "error",
            "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
            "react/function-component-definition": ["warn", { namedComponents: "arrow-function" }],
            "react/self-closing-comp": ["error", { component: true, html: true }],
            "max-lines": ["warn", { max: 124 }],
            "max-params": ["error", 3]
        }
    }
);
