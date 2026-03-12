/* eslint-disable @typescript-eslint/no-deprecated */

import { intermediate } from 'gulp-intermediate2/compat';
import GulpClient from 'gulp';
import path from 'node:path';
import fs from 'node:fs';

function task1() {
  return GulpClient.src('**/*', { cwd: path.resolve(import.meta.dirname, 'test-files') })
    .pipe(intermediate(
      { output: 'out-sub-dir-in-temp' },
      function (temporaryDirectory, callback) {
        // For example, copy sources files to output directory
        fs.copyFile(
          path.join(temporaryDirectory, 'testfile1.txt'),
          path.join(temporaryDirectory, 'out-sub-dir-in-temp/testfile1.txt'),
          callback
        );
      }))
    .pipe(GulpClient.dest('output', { cwd: import.meta.dirname }));
};
task1.description = 'Simple copy task in ESM';
GulpClient.task(task1);
