/**
 * @type {import('semantic-release').GlobalConfig}
 */
// https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration

export default {
	preset: "angular",
	// branches: ["main"],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		"@semantic-release/changelog",
		"@semantic-release/git",
		"@semantic-release/npm",
		"@semantic-release/github"
	]
};
