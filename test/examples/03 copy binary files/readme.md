### Copy binary files

In this example `intermediate2` copy binary files to
container temp directory, invokes example process function,
and put all files from output temp directory
to files pipe.

```typescript file=./gulpfile.ts
import { intermediate2 } from '#gulp-intermediate2';
import type { ProcessCallback } from '#gulp-intermediate2';
import GulpClient from 'gulp';
import path from 'node:path';
import fs from 'node:fs';

function task1() {
  return GulpClient.src('**/*', {
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
    .pipe(GulpClient.dest('output', { cwd: __dirname }));
};
task1.description = 'Copy utf-8 and binary files';
GulpClient.task(task1);
```
