module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    extends: ["eslint:recommended", "plugin:vue/vue3-essential","./.eslintrc-auto-import.json",],
    plugins: ["vue"],
    env: {
        node: true,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'off',
        'vue/no-unused-vars': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/valid-template-root': 'off',
        'vue/no-mutating-props': 'off'
    }
}
