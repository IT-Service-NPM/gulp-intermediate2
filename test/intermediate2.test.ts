/*jshint node:true */
/*jshint nomen:true */
'use strict';

import { vi, describe, expect, it, beforeEach } from 'vitest';
import * as plugin from '#gulp-intermediate2';
import path from 'node:path';
import streams from 'node:stream/promises';
import fs from 'node:fs';
import timers from 'node:timers/promises';
import { tmpdir } from 'node:os';
import vfs from 'vinyl-fs';
import PluginError from 'plugin-error';

const cwd: string = path.relative(process.cwd(), __dirname);
const testSrcFilesPath: string = path.join(cwd, 'test-files');
const testDestFilesPath: string = path.join(cwd, 'output');

describe('intermediate2', () => {

  function copyAllFilesTestProcess(srcDirPath: string, destDirPath: string, callback: plugin.ProcessCallback): void {
    fs.cp(srcDirPath, destDirPath, { recursive: true }, callback);
  };

  it('must be defined named plugin export intermediate2', () => {
    expect(plugin.intermediate2, 'named plugin export intermediate2').toBeDefined();
  });

  beforeEach(async () => {
    await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
  });

  it('must copy files to the OS temp subdirectory', async () => {

    const pluginDirsProcessor = vi.spyOn(vfs, 'dest');

    try {
      await streams.finished(
        vfs.src('**/*', { cwd: testSrcFilesPath, encoding: false, buffer: false })
          .pipe(plugin.intermediate2(
            copyAllFilesTestProcess,
            {
              destOptions: { encoding: false },
              srcOptions: { encoding: false, buffer: false },
              container: 'test-container',
              output: 'test-output'
            }
          ))
          .pipe(vfs.dest(testDestFilesPath, { encoding: false }))
      );
    } catch {
      expect.unreachable('All exceptions must be handled in test');
    }

    expect(pluginDirsProcessor.mock.calls.length).toEqual(2);
    const tempDirPath = pluginDirsProcessor.mock.calls[0]?.[0] as string;

    const relative = path.relative(tmpdir(), tempDirPath);
    expect(relative && !relative.startsWith('..') && !path.isAbsolute(relative),
      'must use OS temp subdirectory').toBeTruthy();

  });

  it('must emit an error passed to the process callback', async () => {

    const pluginDirsProcessor = vi.spyOn(vfs, 'dest');
    const testErrorMessage = 'test error message';

    function errorTestProcess(srcDirPath: string, destDirPath: string, callback: plugin.ProcessCallback): void {
      callback(new Error(testErrorMessage));
    };

    const testStream = plugin.intermediate2(
      errorTestProcess,
      {
        destOptions: { encoding: false },
        srcOptions: { encoding: false }
      }
    );
    vfs.src('**/*', { cwd: testSrcFilesPath, encoding: false, buffer: false })
      .pipe(testStream)
      .pipe(vfs.dest(testDestFilesPath, { encoding: false }));

    const err = await new Promise((resolve) => {
      testStream
        .on('error', (err) => {
          resolve(err);
        });
    });
    expect(err).toBeInstanceOf(PluginError);
    expect((err as PluginError).message).toEqual(`exception in temp files processing handler: Error: ${testErrorMessage}`);

    expect(pluginDirsProcessor.mock.calls.length).toEqual(2);
    const tempDirPath = pluginDirsProcessor.mock.calls[0]?.[0] as string;

    await timers.scheduler.wait(1000);
    expect(fs.existsSync(tempDirPath), 'temp dir must be deleted').toBeFalsy();

  });

  it('must emit an error when after-processing failed', async () => {

    const pluginDirsProcessor = vi.spyOn(vfs, 'dest');

    const testStream = plugin.intermediate2(
      copyAllFilesTestProcess,
      {
        destOptions: { encoding: false },
        srcOptions: { encoding: false },
        srcGlobs: 'nonExistingFile'
      }
    );
    vfs.src('**/*', { cwd: testSrcFilesPath, encoding: false })
      .pipe(testStream)
      .pipe(vfs.dest(testDestFilesPath, { encoding: false }));

    const err = await new Promise((resolve) => {
      testStream
        .on('error', (err) => {
          resolve(err);
        })
        .on('end', () => {
          resolve(null);
        });
    });
    expect(err).toBeInstanceOf(Error);

    expect(pluginDirsProcessor.mock.calls.length).toEqual(2);
    const tempDirPath = pluginDirsProcessor.mock.calls[0]?.[0] as string;

    await timers.scheduler.wait(1000);
    expect(fs.existsSync(tempDirPath), 'temp dir must be deleted').toBeFalsy();

  });

});
