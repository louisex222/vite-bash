/**
 * ESLint 配置模組。
 * @module .eslintrc.js
 */

module.exports = {
    /**
     * 指定 ESLint 使用的解析器。
     * 'vue-eslint-parser' 是一種將 Vue 文件轉換為 ESLint 可理解的 AST 的解析器。
     */
    parser: 'vue-eslint-parser',

    /**
     * 指定解析器的選項。
     */
    parserOptions: {
        /**
         * 指定 TypeScript 文件的解析器。
         */
        parser: '@typescript-eslint/parser',

        /**
         * 指定要使用的 ECMAScript 版本。
         */
        ecmaVersion: 2020,

        /**
         * 指定源類型。'module' 用於 ECMAScript 模塊。
         */
        sourceType: 'module',

        /**
         * 指定要使用的額外語言功能。
         */
        ecmaFeatures: {
            jsx: true, // 啟用 JSX 語法
            tsx: true, // 啟用 TSX 語法
        },
    },

    /**
     * 指定要擴展的配置文件。
     */
    extends: ["eslint:recommended", "plugin:vue/vue3-essential","./.eslintrc-auto-import.json",],

    /**
     * 指定 ESLint 使用的插件。
     */
    plugins: ["vue", "@typescript-eslint"],

    /**
     * 指定要使用的環境。
     */
    env: {
        node: true, // 啟用 Node.js 全局變量和 Node.js 範疇
    },

    /**
     * 指定 ESLint 使用的規則。
     */
    rules:{
        "vue/no-unused-components": "off", // 禁用防止未使用的組件的規則
        "no-undef": "off", // 禁用防止使用未定義的變量的規則
        "no-unused-vars": "off", // 禁用防止未使用的變量的規則
        "vue/multi-word-component-names": "off", // 禁用強制多字組件名稱的規則
        "no-declare": "off", // 禁用防止使用 'declare' 的規則
    },

    /**
     * 指定特定文件的覆蓋。
     */
    overrides:[
        {
            files: ["*.ts", "*.tsx"], // 指定要覆蓋的文件
        }
    ]
};
