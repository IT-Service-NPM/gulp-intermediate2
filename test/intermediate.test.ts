/* eslint-disable @typescript-eslint/no-deprecated */

import { describe, it } from 'vitest';
import { expectDeprecated } from 'vite-plugin-vitest-typescript-assert/tsd';
import { intermediate } from '#gulp-intermediate2';

describe('intermediate', () => {

  it('must be marked as deprecated', () => {

    const dummyProcess: intermediate.Process =
      function (tempDir: string, callback: intermediate.ProcessCallback): void {
        callback();
      };

    expectDeprecated(intermediate.intermediate(dummyProcess));
    expectDeprecated(intermediate.intermediate({}, dummyProcess));

  });

});
