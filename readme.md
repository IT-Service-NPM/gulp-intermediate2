# gulp-intermediate2

[![Build and Test Status](https://github.com/IT-Service-NPM/gulp-intermediate2/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/IT-Service-NPM/gulp-intermediate2/actions/workflows/tests.yml)

[![GitHub release](https://img.shields.io/github/v/release/IT-Service-NPM/gulp-intermediate2.svg?sort=semver\&logo=github)](https://github.com/IT-Service-NPM/gulp-intermediate2/releases)
[![NPM release](https://img.shields.io/npm/v/gulp-intermediate2.svg?logo=npm)](https://www.npmjs.com/package/gulp-intermediate2)

[![Semantic Versioning](https://img.shields.io/badge/Semantic%20Versioning-v2.0.0-green.svg?logo=semver)](https://semver.org/lang/ru/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-v1.0.0-yellow.svg?logo=git)](https://conventionalcommits.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
[![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?logo=visual%20studio%20code)](https://code.visualstudio.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-333333.svg?logo=typescript)](http://www.typescriptlang.org/)
[![EditorConfig](https://img.shields.io/badge/EditorConfig-333333.svg?logo=editorconfig)](https://editorconfig.org)
[![ESLint](https://img.shields.io/badge/ESLint-3A33D1?logo=eslint)](https://eslint.org)

This plugin is a modern version of `gulp-intermediate`.
Fully support various encodings and streaming mode.

A gulp helper for tools that need files on disk.

Some tools require access to files on disk instead of working with `stdin` and `stdout`
(e.g., [Jekyll](http://jekyllrb.com/), [Ruby Sass](http://sass-lang.com/)).
`gulp-intermediate2` is a convenience plugin
that writes the current vinyl stream to a temporary directory,
lets you run commands on the file system, and pushes the results back into the pipe.

Writing intermediate files to disk is counter to the gulp philosophy.
If possible, use a tool that works with streams.
Use `gulp-intermediate2` only if other (better) options aren’t available.

## Contents

* [Install](#install)
* [Examples](#examples)
  * [Using old `intermediate` interface](#using-old-intermediate-interface)
  * [Examples with new interface](#examples-with-newinterface)
* [API](#api)
  * [intermediate2(\[process\], \[options\])](#intermediate2process-options)
    * [options](#options)
      * [destOptions](#destoptions)
      * [srcOptions](#srcoptions)
      * [output](#output)
      * [container](#container)
    * [process(srcDirPath, destDirPath, cb)](#processsrcdirpath-destdirpath-cb)
    * [Notes](#notes)
* [License](#license)

## Install

```sh
npm install --save-dev gulp-intermediate2
```

## Examples

### Using old `intermediate` interface

Old `intermediate` interface is supported now,
but deprecated.

In new `intermediate2` interface `process` has 3 parameters, not 2!
And options must be second parameter, not first
(as for `intermediate` interface).

```typescript file=test/examples/01\ compatibility\ mode/gulpfile.ts
/* eslint-disable @typescript-eslint/no-deprecated */

import { intermediate } from "../../../src";
// import { intermediate } from "gulp-intermediate2";
import * as gulp from "gulp";
import path from "node:path";
import fs from "node:fs";

function task1() {
	return gulp.src('**/*', { cwd: path.resolve(__dirname, 'test-files') })
		.pipe(intermediate.intermediate(
			{ output: 'out-sub-dir-in-temp' },
			function (tempDir: string, callback): void {
				// Files processing...
				// For example, copy sources files to output directory
				fs.copyFile(
					path.join(tempDir, 'testfile1.txt'),
					path.join(tempDir, 'out-sub-dir-in-temp/testfile1.txt'),
					callback
				);
			}))
		.pipe(gulp.dest('output', { cwd: __dirname }))
};
task1.description = 'Test gulp task which uses old gulp-intermediate interface';
task1.flags = {
	'--test': 'Test task option'
};
gulp.task(task1);

function task2() {
	return gulp.src('**/*', { cwd: path.resolve(__dirname, 'test-files') })
		.pipe(intermediate.intermediate(
			function (tempDir: string, callback): void {
				// Files processing on place
				callback();
			}))
		.pipe(gulp.dest(path.join(__dirname, 'output')))
};
task2.description = 'Second test task';
gulp.task(task2);
```

### Examples with new interface

You must rewrite Your gulpfile for modern `intermediate2` interface.

```js
var gulp = require('gulp');
var spawn = require('child-process').spawn;
var { intermediate2 } = require('gulp-intermediate2');

gulp.task('default', function () {
  return gulp.src('**/*', { encoding: false })
    .pipe(intermediate2(
      function (srcDirPath, destDirPath, callback) {
        // Run a command on the files in tempDir and write the results to
        // the specified output directory.
        spawn('a_command', ['--dest', '_site'], {cwd: tempDir});
          .on('close', cb);
      },
      {
        destOptions: { encoding: false },
        srcOptions: { encoding: false }
      }
    ))
    .pipe(gulp.dest(testDestFilesPath))
});
```

With streaming mode:

```js
var gulp = require('gulp');
var spawn = require('child-process').spawn;
var { intermediate2 } = require('gulp-intermediate2');

gulp.task('default', function () {
  return gulp.src('**/*', { encoding: false, buffer: false })
    .pipe(plugin.intermediate2(
      function (srcDirPath, destDirPath, callback) {
        // Run a command on the files in tempDir and write the results to
        // the specified output directory.
        spawn('a_command', ['--dest', '_site'], {cwd: tempDir});
          .on('close', cb);
      },
      {
        destOptions: { encoding: false },
        srcOptions: { encoding: false, buffer: false },
        container: 'test-container',
        output: 'test-output'
      }
    ))
    .pipe(gulp.dest(testDestFilesPath, { encoding: false }))
});
```

## API

<!-- TSDOC_START -->

<!-- TSDOC_END -->

### intermediate2(\[process], \[options])

#### options

Type: `object`
Optional

##### destOptions

Type: `object`
Optional

All options, supported by `gulp.dest`.
Options for writing input Vinyl files to temp directory.

##### srcOptions

Type: `object`
Optional

All options, supported by `gulp.src`.
Options for reading output files from the temp output directory
after the process is completed.

##### output

Type: `string`
Default: `'.'`

The directory read back into the stream when processing is finished.
Relative to `tempDir\<uniqueID>`.

##### container

Type: `string`
Default: random uuid

The directory that input files are written to.
Relative to `tempDir\<uniqueID>`.

The container is emptied before every run.

#### process(srcDirPath, destDirPath, cb)

Type: `function`

Run your commands.
`process` comes with three arguments:

* `srcDirPath`: The absolute path to the directory
  containing your input temporary files.
* `destDirPath`: The absolute path to the directory
  containing your output temporary files.
* `cb`: A callback function to call when the processing is finished.
  It pushes the output files (from destDirPath) back into the gulp stream.

#### Notes

The files are written to `tempDir` using the vinyl file object’s relative path,
with `gulp.dest()`.

## License

[MIT](LICENSE) © [Sergei S. Betke](https://github.com/sergey-s-betke)
