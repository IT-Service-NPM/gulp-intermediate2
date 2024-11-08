// https://vitest.dev/guide/coverage

import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'json-summary', 'json', 'lcov'],
			reportOnFailure: true,
			include: ['src/**']
		},
	},
})
