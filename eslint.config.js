import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';

export default [
	{
		files: ['**/*.ts'],
		ignores: ['node_modules', 'build', 'dist'],
		languageOptions: {
			parser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': plugin,
		},
		rules: {
			'no-console': 'warn',
			'@/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@/semi': ['error', 'always'],
		},
	},
];