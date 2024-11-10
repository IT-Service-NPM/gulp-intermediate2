### Using old `intermediate` interface

Old `intermediate` interface is supported now,
but deprecated.

```typescript file=./gulpfile.ts
import * as intermediate2 from "../../../src/index";
// import * as intermediate2 from "gulp-intermediate2";
import * as gulp from "gulp";
import path from "node:path";
import fs from "node:fs";

function task1() {
	return gulp.src('**/*', { cwd: path.resolve(__dirname, 'test-files') })
		.pipe(intermediate2.intermediate(
			{ output: 'out-sub-dir-in-temp' },
			function (tempDir: string, callback: intermediate2.ProcessCallback): void {
				// Files processing...
				// For example, copy sources files to output directory
				fs.copyFile(
					path.join(tempDir, 'testfile1.txt'),
					path.join(tempDir, 'out-sub-dir-in-temp/testfile1.txt'),
					callback
				);
			}))
		.pipe(gulp.dest('output', { cwd: __dirname }))
};
task1.description = 'Test gulp task which uses old gulp-intermediate interface';
task1.flags = {
	'--test': 'Test task option'
};
gulp.task(task1);

function task2() {
	return gulp.src('**/*', { cwd: path.resolve(__dirname, 'test-files') })
		.pipe(intermediate2.intermediate(
			function (tempDir: string, callback: intermediate2.ProcessCallback): void {
				// Files processing on place
				callback();
			}))
		.pipe(gulp.dest(path.join(__dirname, 'output')))
};
task2.description = 'Second test task';
gulp.task(task2);
```
