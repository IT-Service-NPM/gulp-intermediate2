// https://vitest.dev/guide/coverage

import { defineConfig } from 'vitest/config';
import { vitestTypescriptAssertPlugin } from 'vite-plugin-vitest-typescript-assert';
import GithubActionsReporter from 'vitest-github-actions-reporter';

export default defineConfig({
	plugins: [
		vitestTypescriptAssertPlugin()
	],
	test: {
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'json-summary', 'json', 'lcov'],
			reportOnFailure: true,
			include: ['src/**']
		},
		reporters: process.env.GITHUB_ACTIONS
			? ['default', new GithubActionsReporter()]
			: 'default'
	},
});
