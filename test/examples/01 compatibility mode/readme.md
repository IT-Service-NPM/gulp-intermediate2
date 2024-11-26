### Using old `intermediate` interface

Old `intermediate` interface is supported now,
but deprecated.

```typescript file=./gulpfile.ts
/* eslint-disable @typescript-eslint/no-deprecated */

import { intermediate } from '#gulp-intermediate2/compat';
import GulpClient from 'gulp';
import path from 'node:path';
import fs from 'node:fs';

function task1() {
  return GulpClient.src('**/*', { cwd: path.resolve(__dirname, 'test-files') })
    .pipe(intermediate(
      { output: 'out-sub-dir-in-temp' },
      function (tempDir: string, callback): void {
        // Files processing...
        // For example, copy sources files to output directory
        fs.copyFile(
          path.join(tempDir, 'testfile1.txt'),
          path.join(tempDir, 'out-sub-dir-in-temp/testfile1.txt'),
          callback
        );
      }))
    .pipe(GulpClient.dest('output', { cwd: __dirname }));
};
task1.description = 'Test gulp task which uses old gulp-intermediate interface';
task1.flags = {
  '--test': 'Test task option'
};
GulpClient.task(task1);


function task2() {
  return GulpClient.src('**/*', { cwd: path.resolve(__dirname, 'test-files') })
    .pipe(intermediate(
      function (tempDir: string, callback): void {
        // Files processing on place
        callback();
      }))
    .pipe(GulpClient.dest(path.join(__dirname, 'output')));
};
task2.description = 'Second test task';
GulpClient.task(task2);
```
