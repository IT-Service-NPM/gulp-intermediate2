// https://github.com/unifiedjs/unified-engine#config-files

import remarkGfm from 'remark-gfm';
import remarkPresetLintConsistent from 'remark-preset-lint-consistent';
import remarkPresetLintRecommended from 'remark-preset-lint-recommended';
// import remarkUsage from 'remark-usage';
import remarkLicense from 'remark-license';
import remarkTypography from 'remark-typography';
import remarkValidateLinks from 'remark-validate-links';
import { remarkAlert } from 'remark-github-blockquote-alert';

export default {
	plugins: [
		remarkGfm,
		remarkAlert,
		remarkPresetLintConsistent,
		remarkPresetLintRecommended,
		remarkLicense,
		remarkValidateLinks,
		remarkTypography,
		// [remarkUsage, {
		// 	example: 'test/examples/index.ts'
		// }]
	],
	settings: {
		bullet: '*'
	}
}
