import { describe, expect, it, beforeEach, beforeAll, afterAll } from 'vitest';
import { promisify } from 'node:util';
import path from 'node:path';
import fs from 'node:fs';
import gulp from 'gulp';
import * as testLib from '../../lib/index.ts';
import './gulpfile.mjs';

const testSrcFilesPath: string = path.join(__dirname, 'test-files');
const testDestFilesPath: string = path.join(__dirname, 'output');

let testSrcFiles: string[];

describe('intermediate', () => {

  beforeAll(async () => {
    testSrcFiles = await testLib.getFilesRelativePath(testSrcFilesPath);
  });

  beforeEach(async () => {
    await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
  });

  afterAll(async () => {
    await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
  });

  it('must be copies all utf-8 files to out-sub-dir-in-temp with options', () => {
    void (async () => {
      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
      await promisify(gulp.series('task1'))();

      expect(fs.existsSync(testDestFilesPath), 'output dir must be exists').toBeTruthy();

      const testDestFiles = await testLib.getFilesRelativePath(testDestFilesPath);

      expect(testDestFiles).toEqual(testSrcFiles);

      for (const testFilePath of testDestFiles) {
        const srcContent = await fs.promises.readFile(path.join(testSrcFilesPath, testFilePath), { encoding: null });
        const destContent = await fs.promises.readFile(path.join(testDestFilesPath, testFilePath), { encoding: null });
        expect(destContent.equals(srcContent), `content of ${testFilePath} test file must be the same as content of source file`).toBeTruthy();
      };
    })();
  });
});
