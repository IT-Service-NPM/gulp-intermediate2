/* eslint-disable @typescript-eslint/no-deprecated */

import { describe, it } from 'node:test';
import { expectDeprecated } from 'tsd';
import { intermediate } from 'gulp-intermediate2/compat';
import type { Process, ProcessCallback } from 'gulp-intermediate2/compat';

const dummyProcess: Process =
  function (temporaryDirectory: string, callback: ProcessCallback): void {
    callback();
  };

await describe('intermediate', async () => {

  await it('must be marked as deprecated', () => {

    expectDeprecated(intermediate(dummyProcess));
    expectDeprecated(intermediate({}, dummyProcess));

  });

});
