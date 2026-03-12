/* eslint-disable @typescript-eslint/no-deprecated */

import { intermediate } from 'gulp-intermediate2/compat';
import GulpClient from 'gulp';
import path from 'node:path';
import fs from 'node:fs';

function task1() {
  return GulpClient.src(
    '**/*', {
    cwd: path.resolve(import.meta.dirname, 'test-files')
  })
    .pipe(intermediate(
      { output: 'out-sub-dir-in-temp' },
      function (temporaryDirectory: string, callback): void {
        // Files processing...
        // For example, copy sources files to output directory
        fs.copyFile(
          path.join(temporaryDirectory, 'testfile1.txt'),
          path.join(temporaryDirectory, 'out-sub-dir-in-temp/testfile1.txt'),
          callback
        );
      }))
    .pipe(GulpClient.dest('output', { cwd: import.meta.dirname }));
};
task1.description = 'Test gulp task which uses old gulp-intermediate interface';
task1.flags = {
  '--test': 'Test task option'
};
GulpClient.task(task1);


function task2() {
  return GulpClient.src(
    '**/*', {
    cwd: path.resolve(import.meta.dirname, 'test-files')
  })
    .pipe(intermediate(
      function (temporaryDirectory: string, callback): void {
        // Files processing on place
        callback();
      }))
    .pipe(GulpClient.dest(path.join(import.meta.dirname, 'output')));
};
task2.description = 'Second test task';
GulpClient.task(task2);
