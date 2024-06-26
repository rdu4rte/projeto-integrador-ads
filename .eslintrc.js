module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sconfigRootDir: __dirname,
    sourceType: 'module',
    extraFileExtensions: ['.json'],
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import-helpers', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['coverage', 'package.json', '.eslintrc.js'],
  rules: {
    'prettier/prettier': ['error', { semi: false }],
    'max-len': 'off',
    'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'object-curly-spacing': ['warn', 'always'],
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [['module', 'absolute'], '/^@//', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}