// https://vitest.dev/guide/coverage

import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'json', 'lcov'],
			reportsDirectory: './test/coverage'
		},
	},
})
