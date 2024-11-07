/*jshint node:true */
/*jshint nomen:true */
"use strict";

import streams from "node:stream";
import * as intermediate2 from "./intermediate2";

const PLUGIN_NAME = 'gulp-intermediate2';

/**
 * gulp-intermediate plugin options
 *
 * @remarks
 *
 * See {@link intermediate2.Intermediate2Options| Intermediate2Options} for more details.
 *
 * @internal
 * @public
 * @deprecated
 *
 * Use new {@link intermediate2.intermediate2| intermediate2} interface.
 */
export interface IntermediateOptions {

	/**
	 * Process output dir relative path
	 *
	 * @remarks
	 *
	 * The directory read back into the stream when processing is finished.
	 * Relative to tempDir.
	 *
	 * See new {@link intermediate2.intermediate2| intermediate2} interface.
	 *
	 * @defaultValue `'.'`
	 */
	output?: string;

	/**
	 * Process input temp directory relative path
	 *
	 * @remarks
	 *
	 * The directory that files are written to,
	 * relative to the operating system's temporary directory.
	 * The container is emptied before every run.
	 *
	 * See new {@link intermediate2.intermediate2| intermediate2} interface.
	 *
	 * @defaultValue `''`
	 */
	container?: string;
};

/**
 * Old `intermediate` Process function type
 *
 * @internal
 * @public
 * @deprecated
 *
 * Use new {@link intermediate2.intermediate2| intermediate2} interface
 * and new process type.
 *
 * In new {@link intermediate2.intermediate2| intermediate2} interface
 * {@link intermediate2.Process| process} has 3 parameters!
 */
type Process = (tempDir: string, callback: intermediate2.ProcessCallback) => void;

/**
 * @internal
 */
function isProcess(process: any): process is Process {
	return (typeof process === 'function');
};

/**
 * Old `intermediate` plugin function
 *
 * @internal
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
 * @internal
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
 * @internal
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
		_process = process as Process;
		_options = optionsOrProcess;
	};

	function proxy(srcDirPath: string, destDirPath: string, callback: intermediate2.ProcessCallback): void {
		_process(srcDirPath, callback);
	};

	return intermediate2.intermediate2(proxy, _options);
};
