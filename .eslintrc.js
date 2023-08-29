module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'unused-imports', 
    'filenames', 
    'folders',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'max-len': [
      'error',
      {
        code: 110,
        ignorePattern: '^import|^export\\s.+\\sfrom\\s.+;$',
        ignoreUrls: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // 'filenames/match-exported': [2, 'kebab'],
    'filenames/match-regex': [2, '^([a-z][a-z0-9]*)(-[a-z0-9]+)?.*$'],
    'folders/match-regex': [2, '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$', 'src/'],
  },
};
