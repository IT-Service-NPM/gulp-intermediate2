// @ts-check

import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsdoc from "eslint-plugin-tsdoc";

export default [
	eslint.configs.recommended,
	// tsEslint.configs.recommendedTypeChecked,
	...tsEslint.configs.strictTypeChecked,
	...tsEslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		ignores: [
			'**/*.js',
			'**/*.mjs',
			'node_modules',
			'dist',
			'coverage'
		]
	},
	{
		files: [
			"src/**/*.ts",
			"src/**/*.tsx"
		],
		plugins: {
			// tsdoc,
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ['error', {
				'argsIgnorePattern': '^(resolve|reject|err)$'
			}]
		},
	}
];
