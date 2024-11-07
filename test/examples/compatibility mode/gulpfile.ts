import * as gulp from "gulp";
import * as plugin from "../../../src/index";
import path from "node:path";
import fs from "node:fs";

function build(cb: gulp.TaskFunctionCallback): void {
	gulp.src('**/*', { cwd: path.resolve(__dirname, '../../test-files-2') })
		.pipe(plugin.intermediate(
			{ output: 'output' },
			function (tempDir: string, callback: plugin.ProcessCallback): void {
				// Files processing...
				// For example, copy sources files to output directory
				fs.cp(
					tempDir,
					path.join(tempDir, '../output'),
					{ recursive: true },
					callback
				);
			}))
		.pipe(gulp.dest('../../output'))
	cb();
};
build.description = 'Test gulp task which uses old gulp-intermediate interface';
build.flags = {
	'--test': 'Test task option'
};
gulp.task(build);
