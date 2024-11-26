/* eslint-disable @typescript-eslint/no-deprecated */

import * as streams from 'node:stream';
import * as intermediate2 from '../intermediate2/index.ts';
import * as path from 'node:path';
import PluginError from 'plugin-error';

const PLUGIN_NAME = 'gulp-intermediate2';

/**
 * gulp-intermediate plugin options
 *
 * @see {@link intermediate2.Intermediate2Options| Intermediate2Options} for more details.
 *
 * @public
 * @deprecated
 *
 * @remarks
 *
 * Use new {@link intermediate2.intermediate2| intermediate2} interface.
 */
export interface IntermediateOptions {

  /**
   * Process output dir relative path
   *
   * The directory read back into the stream when processing is finished.
   * Relative to tempDir.
   *
   * @defaultValue `'.'`
   */
  output?: string;

  /**
   * Process input temp directory relative path
   *
   * The directory that files are written to,
   * relative to the operating system's temporary directory.
   * The container is emptied before every run.
   *
   * @defaultValue `'.'`
   */
  container?: string;
};

/**
 * Old `intermediate` Process callback function type
 *
 * @public
 * @deprecated
 *
 * Use new {@link intermediate2.intermediate2| intermediate2} interface
 * and new process type.
 *
 * @see {@link intermediate2.ProcessCallback}
 */
export type ProcessCallback = intermediate2.ProcessCallback;

/**
 * Old `intermediate` Process function type
 *
 * @public
 * @deprecated
 *
 * Use new {@link intermediate2.intermediate2| intermediate2} interface
 * and new process type.
 *
 * In new {@link intermediate2.intermediate2| intermediate2} interface
 * {@link intermediate2.Process| process} has 3 parameters!
 */
export type Process = (tempDir: string, callback: ProcessCallback) => void;

/**
 * @internal
 */
function isProcess(process: unknown): process is Process {
  return (typeof process === 'function');
};

/**
 * @internal
 */
function assertIsProcess(process: unknown): asserts process is Process {
  if (!isProcess(process)) {
    throw (new PluginError(PLUGIN_NAME, 'process expected'));
  };
}

/**
 * Old `intermediate` plugin function
 *
 * @public
 * @deprecated
 *
 * Use new {@link intermediate2.intermediate2| intermediate2} interface
 * and new process type.
 *
 * In new {@link intermediate2.intermediate2| intermediate2} interface
 * {@link intermediate2.Process| process} has 3 parameters!
 */
export function intermediate(options: IntermediateOptions, process: Process): streams.Duplex;

/**
 * Old `intermediate` plugin function
 *
 * @public
 * @deprecated
 *
 * Use new {@link intermediate2.intermediate2| intermediate2} interface
 * and new process type.
 *
 * In new {@link intermediate2.intermediate2| intermediate2} interface
 * {@link intermediate2.Process| process} has 3 parameters!
 */
export function intermediate(process: Process): streams.Duplex;

/**
 * Old `intermediate` plugin function
 *
 * @public
 * @deprecated
 *
 * Use new {@link intermediate2.intermediate2| intermediate2} interface
 * and new process type.
 *
 * In new {@link intermediate2.intermediate2| intermediate2} interface
 * {@link intermediate2.Process| process} has 3 parameters!
 */
export function intermediate(optionsOrProcess: IntermediateOptions | Process, process?: Process): streams.Duplex {
  let _options: IntermediateOptions;
  let _process: Process;

  if (isProcess(optionsOrProcess)) {
    _process = optionsOrProcess;
    _options = {};
  } else {
    assertIsProcess(process);
    _process = process;
    _options = optionsOrProcess;
  };
  const _container: string = _options.container ?? '';
  const _options2: intermediate2.Intermediate2Options = {
    container: _container,
    output: _options.output ? path.join(_container, _options.output) : _container
  };

  function proxy(srcDirPath: string, destDirPath: string, callback: intermediate2.ProcessCallback): void {
    _process(srcDirPath, callback);
  };

  return intermediate2.intermediate2(proxy, _options2);
};
