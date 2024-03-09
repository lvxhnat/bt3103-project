module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential', // or 'plugin:vue/essential' for Vue 2
        'eslint:recommended',
        'plugin:prettier/recommended', // Make sure to put it last
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        // Custom rules here
    },
};
