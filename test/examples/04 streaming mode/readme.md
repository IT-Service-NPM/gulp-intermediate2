### Streaming mode support

In this example `intermediate2` copy binary files to
container temp directory in streaming mode.

```typescript file=./gulpfile.ts
import { intermediate2 } from '#gulp-intermediate2';
import type { ProcessCallback } from '#gulp-intermediate2';
import GulpClient from 'gulp';
import path from 'node:path';
import fs from 'node:fs';

function task1() {
  return GulpClient.src('**/*', {
    cwd: path.resolve(__dirname, 'test-files'),
    encoding: false,
    buffer: false
  })
    .pipe(intermediate2(
      function (srcDirPath: string, destDirPath: string, callback: ProcessCallback): void {
        // For example, copy sources files to output directory
        fs.cp(srcDirPath, destDirPath, { recursive: true }, callback);
      },
      {
        destOptions: { encoding: false },
        srcOptions: { encoding: false, buffer: false },
        container: 'test-container',
        output: 'test-output'
      }
    ))
    // processing output files in gulp style
    .pipe(GulpClient.dest('output', {
      cwd: __dirname,
      encoding: false
    }));
};
task1.description = 'Copy utf-8 and binary files';
GulpClient.task(task1);
```
