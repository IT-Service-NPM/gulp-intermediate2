import * as intermediate2 from "../../../src/index";
// import * as intermediate2 from "gulp-intermediate2";
import * as gulp from "gulp";
import path from "node:path";
import fs from "node:fs";

function build(cb: gulp.TaskFunctionCallback): void {
	gulp.src('**/*', { cwd: path.resolve(__dirname, '../../test-files-2') })
		.pipe(intermediate2.intermediate(
			{ output: 'output' },
			function (tempDir: string, callback: intermediate2.ProcessCallback): void {
				// Files processing...
				// For example, copy sources files to output directory
				fs.cp(
					tempDir,
					path.join(tempDir, '../output'),
					{ recursive: true },
					callback
				);
			}))
		.pipe(gulp.dest('../output'))
	cb();
};
build.description = 'Test gulp task which uses old gulp-intermediate interface';
build.flags = {
	'--test': 'Test task option'
};
gulp.task(build);
