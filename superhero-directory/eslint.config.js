import { includeIgnoreFile } from '@eslint/compat';
import jsPlugin from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import storybookPlugin from 'eslint-plugin-storybook';
// import tailwindPlugin from 'eslint-plugin-tailwindcss'; # Waiting for TailwindCSS v4 support
import globals from 'globals';
import fs from 'node:fs';
import path from 'node:path';
import tsPlugin from 'typescript-eslint';

/* eslint-disable-next-line no-undef */
const __dirname = process.cwd();
const gitignorePath = path.resolve(__dirname, '.gitignore');

/**
 * @type {import('eslint').Linter.Config}
 */
export default [
  fs.existsSync(gitignorePath) ? includeIgnoreFile(gitignorePath) : {},
  jsPlugin.configs.recommended,
  ...tsPlugin.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  ...storybookPlugin.configs['flat/recommended'],
  ...storybookPlugin.configs['flat/csf-strict'],
  // ...tailwindPlugin.configs['flat/recommended'],
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    settings: { react: { version: 'detect' } },
    plugins: { 'react-hooks': reactHooksPlugin },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            'React.FC': {
              message:
                'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177, https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components',
            },
            FC: {
              message:
                'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177, https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components',
            },
            'React.FunctionComponent': {
              message:
                'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177, https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components',
            },
            FunctionComponent: {
              message:
                'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177, https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components',
            },
          },
        },
      ],
    },
  },
];
