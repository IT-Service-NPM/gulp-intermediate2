import { intermediate2 } from '../../../src';
import type { ProcessCallback } from '../../../src';
// import { intermediate2 } from "gulp-intermediate2";
import * as gulp from 'gulp';
import path from 'node:path';
import fs from 'node:fs';

function task1() {
  return gulp.src('**/*', {
    cwd: path.resolve(__dirname, 'test-files'),
    encoding: false
  })
    .pipe(intermediate2(
      function (srcDirPath: string, destDirPath: string, callback: ProcessCallback): void {
        // For example, copy sources files to output directory
        fs.cp(srcDirPath, destDirPath, { recursive: true }, callback);
      },
      { srcOptions: { encoding: false } }
    ))
    // processing output files in gulp style
    .pipe(gulp.dest('output', { cwd: __dirname }));
};
task1.description = 'Copy utf-8 and binary files';
gulp.task(task1);
