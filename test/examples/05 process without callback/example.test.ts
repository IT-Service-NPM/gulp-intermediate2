/* eslint-disable unicorn/no-null */
import {
  describe, it, beforeEach, before, after,
  type TestContext
} from 'node:test';
import { promisify } from 'node:util';
import path from 'node:path';
import fs from 'node:fs';
import gulp from 'gulp';
import * as testLibrary from '../../lib/index.ts';
import './gulpfile.ts';

const testSourceFilesPath: string = path.join(
  import.meta.dirname,
  'test-files'
);
const testDestinationFilesPath: string = path.join(
  import.meta.dirname,
  'output'
);

let testSourceFiles: string[];

async function cleanDestinationFilesPath() {
  return fs.promises.rm(
    testDestinationFilesPath,
    { force: true, recursive: true }
  );
}

await describe('intermediate2', async () => {

  before(async () => {
    testSourceFiles = await testLibrary.getFilesRelativePath(
      testSourceFilesPath
    );
  });
  beforeEach(cleanDestinationFilesPath);
  after(cleanDestinationFilesPath);

  await it('must be support async process functions',
    async (t: TestContext) => {

      const pluginDirectoriesProcessor = t.mock.method(gulp, 'dest');

      await t.assert.doesNotReject(
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async () => promisify(gulp.series('task1'))(),
        'All exceptions must be handled in test'
      );

      t.assert.ok(
        fs.existsSync(testDestinationFilesPath),
        'output dir must be exists'
      );

      const testDestinationFiles =
        await testLibrary.getFilesRelativePath(testDestinationFilesPath);

      t.assert.deepEqual(testDestinationFiles, testSourceFiles);

      for (const testFilePath of testDestinationFiles) {
        const sourceContent = await fs.promises.readFile(
          path.join(testSourceFilesPath, testFilePath), { encoding: null });
        const destinationContent = await fs.promises.readFile(
          path.join(testDestinationFilesPath, testFilePath),
          { encoding: null }
        );
        t.assert.deepEqual(destinationContent, sourceContent,
          // eslint-disable-next-line max-len
          `content of ${testFilePath} test file must be the same as content of source file`
        );
      };

      t.assert.strictEqual(pluginDirectoriesProcessor.mock.calls.length, 1);
      const temporaryDirectoriesPath =
        pluginDirectoriesProcessor.mock.calls[0]?.arguments[0] as string;

      t.assert.ok(
        !fs.existsSync(temporaryDirectoriesPath),
        'temp dir must be deleted'
      );

    }
  );
});
