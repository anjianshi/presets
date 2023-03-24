module.exports = {
  root: true,
  plugins: ['import'],
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  rules: {
    // Possible Problems
    'array-callback-return': 'error',
    'no-await-in-loop': 'warn',
    'no-constant-binary-expression': 'warn',
    'no-constructor-return': 'error',
    'no-duplicate-imports': 'off', // Replaced by import/no-duplicates
    'no-new-native-nonconstructor': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-private-class-members': 'error',
    'no-unused-vars': ['error', { varsIgnorePattern: 'React' }],
    'no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: true, allowAsStatement: false },
    ],
    'no-use-before-define': 'off',
    'require-atomic-updates': 'error',

    // Suggestions
    'accessor-pairs': 'error',
    'block-scoped-var': 'error',
    curly: ['error', 'multi-line'],
    'default-case': 'error',
    'default-case-last': 'error',
    // 此规则有缺陷：后面有其他可选参数的情况下，有默认值的参数应可以不在最后
    // This rule has a flaw: if there are other optional parameters following it,
    // the parameter with a default value should not necessarily be placed at the end.
    'default-param-last': 'off',
    eqeqeq: 'error',
    'grouped-accessor-pairs': 'error',
    'guard-for-in': 'error',
    'no-alert': 'warn',
    'no-caller': 'error',
    'no-confusing-arrow': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-mixed-operators': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-restricted-imports': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': ['error', { allowAsStatement: true }],
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-object-has-own': 'error',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    // 自行选择要不要用 template string
    // Choose whether or not to use template strings at your own discretion
    'prefer-template': 'off',
    'quote-props': ['error', 'as-needed'],
    radix: 'error',
    'spaced-comment': ['error', 'always'],
    'symbol-description': 'error',
    yoda: 'error',

    // import
    // Node.js ES6 Module 里需要把 noUselessIndex 设为 false
    // 'noUselessIndex' needs to be set to false in Node.js ES6 Modules.
    'import/no-useless-path-segments': ['error', { noUselessIndex: false }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        alphabetize: { order: 'asc' },
      },
    ],
  },
}
