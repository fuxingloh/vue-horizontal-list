module.exports = {
    overrides: [
        {
            files: ['examples/*.vue', 'examples/*.js'],
            rules: {
                'vue/multi-word-component-names': 0,
            },
        },
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@babel/eslint-parser",
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            modules: true
        }
    },
}