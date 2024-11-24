/* eslint-disable @typescript-eslint/no-deprecated */

import { describe, it } from 'vitest';
import { expectDeprecated } from 'vite-plugin-vitest-typescript-assert/tsd';
import { intermediate } from '#gulp-intermediate2/compat';
import type { Process, ProcessCallback } from '#gulp-intermediate2/compat';

describe('intermediate', () => {

  it('must be marked as deprecated', () => {

    const dummyProcess: Process =
      function (tempDir: string, callback: ProcessCallback): void {
        callback();
      };

    expectDeprecated(intermediate(dummyProcess));
    expectDeprecated(intermediate({}, dummyProcess));

  });

});
