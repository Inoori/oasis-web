import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/build/**",
      "**/.vite/**",
      "**/*.config.{js,mjs,cjs,ts,mts}",
      "**/*.d.ts",
    ],
  },

  eslint.configs.recommended,
  tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      // React Hooks 官方推荐规则（必须开启）
      ...reactHooks.configs.recommended.rules,
      // React Refresh（Vite / Create React App fast refresh 推荐）
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // TypeScript 相关规则
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",

      // 关闭一些和 JS 冲突或太严格的规则
      "no-unused-vars": "off", // 用 TS 版本代替
      "@typescript-eslint/no-unsafe-assignment": "off", // 视项目严格度开启
      "@typescript-eslint/no-unsafe-member-access": "off",

      // 其他通用好规则
      eqeqeq: ["error", "always"],
      curly: "off",
      "prefer-const": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  }
);
