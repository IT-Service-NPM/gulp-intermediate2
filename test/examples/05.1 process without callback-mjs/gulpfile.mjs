import { intermediate2 } from '#gulp-intermediate2';
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
      function (srcDirPath, destDirPath) {
        // For example, copy sources files to output directory
        // or
        // return spawn('a_command', ['--dest', '_site'], {cwd: tempDir});
        return fs.promises.cp(srcDirPath, destDirPath, { recursive: true });
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
