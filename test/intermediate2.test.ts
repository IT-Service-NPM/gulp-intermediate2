import { describe, it, beforeEach, type TestContext } from 'node:test';
import * as plugin from 'gulp-intermediate2';
import path from 'node:path';
import streams from 'node:stream/promises';
import fs from 'node:fs';
import timers from 'node:timers/promises';
import { tmpdir } from 'node:os';
import vfs from 'vinyl-fs';
import PluginError from 'plugin-error';
import plumber from 'gulp-plumber';

const cwd: string = path.relative(process.cwd(), import.meta.dirname);
const testSourceFilesPath: string = path.join(cwd, 'test-files');
const testDestinationFilesPath: string = path.join(cwd, 'output');

function copyAllFilesTestProcess(
  sourceDirectoryPath: string,
  destinationDirectoryPath: string,
  callback: plugin.ProcessCallback
): void {
  fs.cp(
    sourceDirectoryPath, destinationDirectoryPath,
    { recursive: true },
    callback
  );
};

await describe('intermediate2', async () => {

  await it('must be defined named plugin export intermediate2',
    (t: TestContext) => {
      t.assert.notStrictEqual(plugin.intermediate2, undefined,
        'named plugin export intermediate2'
      );
    }
  );

  beforeEach(async () => {
    await fs.promises.rm(
      testDestinationFilesPath,
      { force: true, recursive: true }
    );
  });

  await it('must copy files to the OS temp subdirectory',
    async (t: TestContext) => {

      const pluginDirectoriesProcessor = t.mock.method(vfs, 'dest');

      await t.assert.doesNotReject(
        streams.finished(
          vfs.src('**/*', {
            cwd: testSourceFilesPath,
            encoding: false,
            buffer: false
          })
            .pipe(plugin.intermediate2(
              copyAllFilesTestProcess,
              {
                destOptions: { encoding: false },
                srcOptions: { encoding: false, buffer: false },
                container: 'test-container',
                output: 'test-output'
              }
            ))
            .pipe(vfs.dest(testDestinationFilesPath, { encoding: false }))
        ),
        'All exceptions must be handled in test'
      );

      t.assert.strictEqual(pluginDirectoriesProcessor.mock.calls.length, 2);
      const temporaryDirectoriesPath =
        pluginDirectoriesProcessor.mock.calls[0]?.arguments[0] as string;

      const relative = path.relative(tmpdir(), temporaryDirectoriesPath);
      t.assert.ok(
        relative && !relative.startsWith('..') && !path.isAbsolute(relative),
        `must use OS temp subdirectory, but used "${temporaryDirectoriesPath}"`
      );

    }
  );

  await it('must emit an error passed to the process callback',
    async (t: TestContext) => {

      const pluginDirectoriesProcessor = t.mock.method(vfs, 'dest');
      const testErrorMessage = 'test error message';

      function errorTestProcess(
        sourceDirectoryPath: string,
        destinationDirectoryPath: string,
        callback: plugin.ProcessCallback): void {
        callback(new Error(testErrorMessage));
      };

      const testStream = plugin.intermediate2(
        errorTestProcess,
        {
          destOptions: { encoding: false },
          srcOptions: { encoding: false }
        }
      );
      vfs.src('**/*', {
        cwd: testSourceFilesPath, encoding: false, buffer: false
      })
        .pipe(testStream)
        .pipe(vfs.dest(testDestinationFilesPath, { encoding: false }));

      const error = await new Promise((resolve) => {
        testStream
          .on('error', (error) => {
            resolve(error);
          });
      });
      t.assert.ok(error instanceof PluginError);
      t.assert.strictEqual(
        (error as PluginError).message,
        `exception in temp files processing handler: Error: ${testErrorMessage}`
      );

      const temporaryDirectoriesPath =
        pluginDirectoriesProcessor.mock.calls[0]?.arguments[0] as string;

      await timers.scheduler.wait(1000);
      t.assert.ok(
        !fs.existsSync(temporaryDirectoriesPath),
        'temp dir must be deleted'
      );

    }
  );

  await it('must emit an error when after-processing failed',
    async (t: TestContext) => {

      const pluginDirectoriesProcessor = t.mock.method(vfs, 'dest');

      let error: Error | undefined;
      try {
        await streams.finished(
          vfs.src('**/*', { cwd: testSourceFilesPath, encoding: false })
            .pipe(plumber())
            .pipe(plugin.intermediate2(
              copyAllFilesTestProcess,
              {
                destOptions: { encoding: false },
                srcOptions: { encoding: false },
                srcGlobs: 'nonExistingFile'
              }
            ))
            .pipe(vfs.dest(testDestinationFilesPath, { encoding: false }))
            .on('error', (_error: Error) => {
              error = _error;
            })
        );
      } catch { /* empty */ };

      t.assert.ok(error ? error instanceof Error : false);

      const temporaryDirectoriesPath =
        pluginDirectoriesProcessor.mock.calls[0]?.arguments[0] as string;

      await timers.scheduler.wait(1000);
      t.assert.ok(
        !fs.existsSync(temporaryDirectoriesPath),
        'temp dir must be deleted'
      );

    }
  );

});
