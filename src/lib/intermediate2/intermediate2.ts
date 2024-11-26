/**
 * A gulp helper for tools that need files on disk
 *
 * Some tools require access to files on disk instead of working with `stdin` and `stdout`
 * (e.g., [Jekyll](http://jekyllrb.com/), [Ruby Sass](http://sass-lang.com/)).
 * `gulp-intermediate2` is a convenience plugin
 * that writes the current vinyl stream to a temporary directory,
 * lets you run commands on the file system, and pushes the results back into the pipe.
 *
 * @packageDocumentation
 */

import { promisify } from 'node:util';
import * as streams from 'node:stream';
import type { EventEmitter } from 'node:stream';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { ChildProcess } from 'node:child_process';
import { nanoid } from 'nanoid';
import PluginError from 'plugin-error';
import vfs from 'vinyl-fs';
import GulpFile from 'vinyl';
import asyncDone from 'async-done';
import gulplog from 'gulplog';

const PLUGIN_NAME = 'gulp-intermediate2';

/**
 * gulp-intermediate2 plugin options
 *
 * @remarks
 *
 * @see {@link intermediate2} for more details.
 *
 * @public
 */
export interface Intermediate2Options {

  /**
   * Process output dir relative path.
   * The directory read back into the stream when processing is finished.
   * Relative to tempDir.
   *
   * @defaultValue `'.'`
   *
   * @remarks
   *
   * @see {@link intermediate2} for more details.
   *
   * @public
   */
  output?: string;

  /**
   * Process input temp directory relative path.
   * The directory that files are written to,
   * relative to the operating system's temporary directory.
   * The container is emptied before every run.
   *
   * @defaultValue `'.'`
   *
   * @remarks
   *
   * @see {@link intermediate2} for more details.
   *
   * @public
   */
  container?: string;

  /**
   * Options for `gulp.dest`
   * for writing files to {@link Intermediate2Options.container| container}
   * temp directory before processing.
   *
   * @remarks
   *
   * @see `gulp.dest()` for more details.
   *
   * @public
   */
  destOptions?: vfs.DestOptions;

  /**
   * Process output files glob.
   * Glob for `gulp.src`
   * for reading files from {@link Intermediate2Options.output| output} temp directory after processing.
   *
   * @defaultValue `'**\*'`
   *
   * @remarks
   *
   * @see `gulp.src()` for more details.
   *
   * @public
   */
  srcGlobs?: string | string[];

  /**
   * `gulp.src` options for process output files.
   * Options for `gulp.src`
   * for reading files from {@link Intermediate2Options.output| output} temp directory after processing.
   *
   * @remarks
   *
   * @see `gulp.src()` for more details.
   *
   * @public
   */
  srcOptions?: vfs.SrcOptions;
};

/**
 * {@link intermediate2} {@link Process} function callback
 *
 * @param Error - error (if failure) or null (if success)
 *
 * @remarks
 *
 * @see {@link intermediate2} for more details.
 *
 * @public
 */
export type ProcessCallback = (Error?: Error | null) => void;

/**
 * {@link intermediate2} Process function.
 *
 * Process started after input files written to
 * `srcDirPath` directory
 * ({@link Intermediate2Options.container| pluginOptions.container} temp directory).
 *
 * Process must write output files to `destDirPath`
 * ({@link Intermediate2Options.output| pluginOptions.output} temp directory).
 *
 * After the process is completed, it need to call a callback.
 * Or process function can return `ChildProcess`, `EventEmitter`,
 * `Observable<R>`, `PromiseLike<R>`, `Stream` object.
 * `intermediate2` await processes, represented by returned object.
 *
 * After process finished, result files pushed to output stream.
 *
 * @param srcDirPath - {@link Intermediate2Options.container| pluginOptions.container} temp directory path
 * @param destDirPath - {@link Intermediate2Options.output| pluginOptions.output} temp directory path
 * @param callback - process first-error {@link ProcessCallback| callback}
 *
 * @remarks
 *
 * @see {@link intermediate2}
 *
 * @public
 */
export type Process<R = any> =
  ((srcDirPath: string, destDirPath: string, callback: ProcessCallback) => void) |
  ((srcDirPath: string, destDirPath: string) =>
    ChildProcess |
    EventEmitter |
    asyncDone.Observable<R> |
    PromiseLike<R> |
    streams.Stream
  );

/**
 * Plugin fabric function.
 *
 * A gulp helper for tools that need files on disk.
 *
 * Some tools require access to files on disk instead of working with `stdin` and `stdout`
 * (e.g., {@link http://jekyllrb.com/| Jekyll}, {@link http://sass-lang.com/| Ruby Sass}).
 * `gulp-intermediate2` is a convenience plugin
 * that writes the current `Vinyl` stream to a temporary directory,
 * lets You run commands on the file system, and pushes the results back into the pipe.
 *
 * Returns Gulp stream.
 *
 * `intermediate2` writes (with `gulp.dest()`) input `Vinyl` file objects to
 * {@link Intermediate2Options.container| container} subdirectory in temporary directory
 * under system `Temp`.
 *
 * After all files are written, `intermediate2` run {@link Process| process}
 * and wait for it finish.
 *
 * {@link Process} must be read files from `srcDirPath` directory
 * ({@link Intermediate2Options.container| pluginOptions.container} temp directory),
 * and write output files to `destDirPath`
 * ({@link Intermediate2Options.output| pluginOptions.output} temp directory).
 *
 * After that `intermediate2` will read files (with `gulp.src()`) from
 * {@link Intermediate2Options.output| pluginOptions.output} directory
 * and will push they to gulp stream.
 *
 * @param process - contains the {@link Process| process} for files processing
 * @param pluginOptions - contains the {@link Intermediate2Options| options} for gulp plugin.
 * @public
 */
export function intermediate2(process: Process, pluginOptions?: Intermediate2Options): streams.Duplex {

  const optionsDefaults: Required<Intermediate2Options> = {
    destOptions: {},
    srcGlobs: '**/*',
    srcOptions: {},
    output: 'dest',
    container: 'src'
  };
  const _options: Required<Intermediate2Options> = { ...optionsDefaults, ...pluginOptions };
  const _process: Process = process;

  const tempDirectoryPath: string = path.join(tmpdir(), nanoid());
  const containerDirectoryPath: string = (_options.container) ?
    path.join(tempDirectoryPath, _options.container) :
    tempDirectoryPath;
  const outputDirectoryPath: string = (_options.output) ?
    path.join(tempDirectoryPath, _options.output) :
    tempDirectoryPath;
  if (!_options.srcOptions.cwd?.length) {
    _options.srcOptions.cwd = outputDirectoryPath;
  };

  gulplog.debug(`plugin ${PLUGIN_NAME} used temp directory ${tempDirectoryPath}`);

  const srcFilesStreamsFinishes: Promise<void>[] = [];
  const readable: streams.Duplex = new streams.PassThrough({ objectMode: true, emitClose: true });
  const writable: NodeJS.WritableStream = vfs.dest(containerDirectoryPath, _options.destOptions);

  // workaround for streamx streams
  // https://github.com/mafintosh/streamx/issues/92
  // TODO: remove this workaround after streamx fixing
  if (!('writableObjectMode' in writable) && !('objectMode' in writable)) {
    Object.defineProperty(writable, 'writableObjectMode', { enumerable: true, configurable: true, value: true });
  };

  const pluginStream = streams.Duplex.from({ writable, readable });

  writable
    .on('close', () => {
      void (async () => {
        try {
          await fs.mkdir(outputDirectoryPath, { recursive: true });

          await promisify(asyncDone)((done: ProcessCallback) => {
            return _process(containerDirectoryPath, outputDirectoryPath, done);
          })
            .catch((error: unknown) => {
              throw (error instanceof PluginError ? (error) :
                new PluginError(PLUGIN_NAME, `exception in temp files processing handler: ${error as string}`));
            });

          const outputTempFilesStream = vfs.src(_options.srcGlobs, _options.srcOptions)
            .on('error', (err) => {
              return;
            })
            .on('data', (file: GulpFile) => {
              if (file.isStream()) {
                // streamx doesn't emit 'close' event. Use 'end' event.
                // srcFilesStreamsFinishes.push(streams.promises.finished(file.contents));
                srcFilesStreamsFinishes.push(new Promise<void>((resolve, reject) => {
                  file.contents
                    .on('close', resolve)
                    .on('end', resolve)
                    .on('error', reject);
                }));
              };
            })
            .pipe(readable);
          await streams.promises.finished(outputTempFilesStream);
          await Promise.all(srcFilesStreamsFinishes);
        } catch (error: unknown) {
          pluginStream.destroy(
            error instanceof PluginError ? error as PluginError :
              error instanceof Error ? new PluginError(PLUGIN_NAME, error) :
                new PluginError(PLUGIN_NAME, error as string)
          );
        } finally {
          gulplog.debug(`plugin ${PLUGIN_NAME} deleted ${tempDirectoryPath}`);
          await fs.rm(tempDirectoryPath, { force: true, recursive: true });
        };
      })();
    });

  return pluginStream;
};
