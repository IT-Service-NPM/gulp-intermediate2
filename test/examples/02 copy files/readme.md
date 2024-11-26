### Copy UTF-8 files without options

In this example `intermediate2` copy source UTF-8 files to
container temp directory, invokes example process function,
and put UTF-8 files from output temp directory
to files pipe.

```typescript file=./gulpfile.ts
import { intermediate2 } from '#gulp-intermediate2';
import type { ProcessCallback } from '#gulp-intermediate2';
import GulpClient from 'gulp';
import path from 'node:path';
import fs from 'node:fs';

function task1() {
  return GulpClient.src('**/*', { cwd: path.resolve(__dirname, 'test-files') })
    .pipe(intermediate2(
      function (srcDirPath: string, destDirPath: string, callback: ProcessCallback): void {
        // Files processing...
        // For example, copy sources files to output directory
        fs.cp(srcDirPath, destDirPath, { recursive: true }, callback);
      }
    ))
    .pipe(GulpClient.dest('output', { cwd: __dirname }));
};
task1.description = 'Copy utf-8 files without options';
GulpClient.task(task1);
```
