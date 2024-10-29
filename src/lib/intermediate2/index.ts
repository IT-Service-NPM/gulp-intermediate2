/*jshint node:true */
/*jshint nomen:true */
"use strict";

import streams from "node:stream";
import path from "node:path";
import fs from "node:fs/promises";
import { tmpdir } from "node:os";
import { nanoid } from "nanoid";
import PluginError from "plugin-error";
import vfs from "vinyl-fs";
import GulpFile from "vinyl";

const PLUGIN_NAME = 'gulp-intermediate2';

/**
 * gulp-intermediate2 plugin options
 */
export interface Intermediate2Options {
	/**
	 * The directory read back into the stream when processing is finished. Relative to tempDir.
	 *
	 * @defaultValue `'.'`
	 */
	output?: string;

	/**
	 *  The directory that files are written to, relative to the operating system's temporary directory.
	 *	The container is emptied before every run.
	 */
	container?: string;

	/**
	 *  Options for gulp dest() for writing files to temp directory for processing.
	 */
	destOptions?: vfs.DestOptions;

	/**
	 *  Globs for filter output files from output directory.
	 *
	 * @defaultValue `'*.*'`
	 */
	srcGlobs?: string | string[];

	/**
	 *  Options for gulp src() for reading files after processing.
	 */
	srcOptions?: vfs.SrcOptions;
};

export type ProcessCallback = (Error?: Error | null) => void;

type Process1 = (srcDirPath: string, callback: ProcessCallback) => void;
type Process2 = (srcDirPath: string, callback: ProcessCallback, destDirPath: string) => void;
export type Process = Process1 | Process2;

function isProcess(process: any): process is Process {
	return (typeof process === 'function');
};

/**
 * Plugin fabric function, it returns transformation stream for gulp task with default options
 * @param {ProcessCallback} [process] contains the process callback for files processing.
 * @returns {Intermediate2ProcessStream}
 */
export function intermediate2(process: Process): NodeJS.ReadWriteStream;

/**
 * Plugin fabric function, it returns transformation stream for gulp task with specified options
 * @param {Intermediate2Options} [pluginOptions] contains the options for gulp plugin.
 * @param {ProcessCallback} [process] contains the process callback for files processing.
 * @returns {Intermediate2ProcessStream}
 */
export function intermediate2(pluginOptions: Intermediate2Options, process: Process): NodeJS.ReadWriteStream;

export function intermediate2(processOrPluginOptions: Intermediate2Options | Process, process?: Process): NodeJS.ReadWriteStream {

	const optionsDefaults: Required<Intermediate2Options> = {
		destOptions: {},
		srcGlobs: '*.*',
		srcOptions: {},
		output: '',
		container: ''
	};
	let _options: Required<Intermediate2Options>;
	let _process: Process;
	if (isProcess(processOrPluginOptions)) {
		_options = optionsDefaults;
		_process = processOrPluginOptions;
	} else {
		_options = { ...optionsDefaults, ...processOrPluginOptions };
		_process = process as Process;
	};

	const tempDirectoryPath: string = path.join(tmpdir(), nanoid());
	const containerDirectoryPath: string = (_options.container) ?
		path.join(tempDirectoryPath, _options.container) :
		tempDirectoryPath;
	const outputDirectoryPath: string = (_options.output) ?
		path.join(tempDirectoryPath, _options.output) :
		tempDirectoryPath;
	if (!_options.srcOptions.cwd) {
		_options.srcOptions.cwd = outputDirectoryPath;
	};

	var srcFilesStreamsFinishes: Promise<void>[] = [];
	const readable: streams.Duplex = new streams.PassThrough({ objectMode: true, emitClose: true });
	const writable: NodeJS.WritableStream = vfs.dest(containerDirectoryPath, _options.destOptions);

	// workaround for streamx streams
	// https://github.com/mafintosh/streamx/issues/92
	// TODO: remove this workaround after streamx fixing
	if (!('writableObjectMode' in writable) && !('objectMode' in writable)) {
		Object.defineProperty(writable, 'writableObjectMode', { enumerable: true, configurable: true, value: true });
	};

	const pluginStream = streams.Duplex.from({ writable, readable });

	writable.on('close', async (): Promise<void> => {
		try {
			await fs.mkdir(outputDirectoryPath, { recursive: true });
			await (async (): Promise<void> => {
				return new Promise((resolve: (value: void | PromiseLike<void>) => void, reject: (reason?: any) => void): void => {
					try {
						_process(
							containerDirectoryPath,
							(Error?: Error | null): void => {
								if (Error) {
									reject(new PluginError(PLUGIN_NAME, Error));
								} else {
									return resolve();
								};
							},
							outputDirectoryPath
						);
					} catch (error) {
						reject(new PluginError(PLUGIN_NAME, `exception in temp files processing handler: ${error}`));
					}
				});
			})();

			const outputTempFilesStream = vfs.src(_options.srcGlobs, _options.srcOptions)
				.on('data', (file: GulpFile) => {
					if (file.isStream()) {
						srcFilesStreamsFinishes.push(streams.promises.finished(file.contents, { error: true }));
					};
				})
				.pipe(readable);

			srcFilesStreamsFinishes.push(streams.promises.finished(outputTempFilesStream, { error: true }));
		} catch (error) {
			const err = error instanceof PluginError ? error :
				new PluginError(PLUGIN_NAME, error as Error);
			pluginStream.destroy(err);
		};
	});

	pluginStream.on('close', async (): Promise<void> => {
		await Promise.all(srcFilesStreamsFinishes)
			.finally(async () => {
				return fs.rm(tempDirectoryPath, { force: true, recursive: true });
			});
	});

	return pluginStream;
};

export default intermediate2;
