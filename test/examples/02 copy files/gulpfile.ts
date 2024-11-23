import { intermediate2 } from "../../../src";
import type { ProcessCallback } from "../../../src";
// import { intermediate2 } from "gulp-intermediate2";
import * as gulp from "gulp";
import path from "node:path";
import fs from "node:fs";

function task1() {
	return gulp.src('**/*', { cwd: path.resolve(__dirname, 'test-files') })
		.pipe(intermediate2(
			function (srcDirPath: string, destDirPath: string, callback: ProcessCallback): void {
				// Files processing...
				// For example, copy sources files to output directory
				fs.cp(srcDirPath, destDirPath, { recursive: true }, callback);
			}
		))
		.pipe(gulp.dest('output', { cwd: __dirname }))
};
task1.description = 'Copy utf-8 files without options';
gulp.task(task1);
