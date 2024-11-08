import path from "node:path";
import { execSync } from "node:child_process";

const rootPath: string = path.join(__dirname, '../..');

export function gulpSync(gulpfile: string, task: string): Buffer {
	return execSync(
		`node --import tsx node_modules/gulp/bin/gulp --gulpfile "${path.resolve(__dirname, gulpfile)}" ${task}`,
		{ cwd: rootPath }
	);
};
