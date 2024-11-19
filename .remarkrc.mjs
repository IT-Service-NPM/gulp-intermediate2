// https://github.com/unifiedjs/unified-engine#config-files

import remarkGfm from 'remark-gfm';
import remarkPresetLintConsistent from 'remark-preset-lint-consistent';
import remarkPresetLintRecommended from 'remark-preset-lint-recommended';
import remarkLicense from 'remark-license';
import remarkTypography from 'remark-typography';
import remarkValidateLinks from 'remark-validate-links';
import { remarkAlert } from 'remark-github-blockquote-alert';
import remarkLintCodeBlockStyle from 'remark-lint-code-block-style';
import codeImport from 'remark-code-import';
import remarkToc from 'remark-toc';

export default {
	plugins: [
		codeImport,
		remarkToc,
		remarkLicense,
		remarkGfm,
		remarkAlert,
		remarkValidateLinks,
		remarkTypography,
		remarkPresetLintConsistent,
		remarkPresetLintRecommended,
		remarkLintCodeBlockStyle,
	],
	settings: {
		bullet: '*'
	}
}
