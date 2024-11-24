import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

// https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-angular/README.md
// https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit

const Configuration: UserConfig = {

	extends: ['@commitlint/config-angular'],
	rules: {
		'type-enum': [RuleConfigSeverity.Error, 'always', [
			'build',
			'ci',
			'docs',
			'feat',
			'fix',
			'perf',
			'refactor',
			'revert',
			'style',
			'test',
			// additional types
			'chore'
		]],
		'scope-enum': [RuleConfigSeverity.Error, 'always', [
			'plugin',
			'vscode',
			'git',
			'github',
			'github-actions',
			'deps',
			'devtools',
			'readme',
			'release'
		]],
		'scope-empty': [RuleConfigSeverity.Disabled]
	},
	// ...
};

export default Configuration;
