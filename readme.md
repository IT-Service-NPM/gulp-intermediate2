# gulp-intermediate2

[![Build and Test Status](https://github.com/IT-Service-NPM/gulp-intermediate2/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/IT-Service-NPM/gulp-intermediate2/actions/workflows/tests.yml)

[![GitHub release](https://img.shields.io/github/v/release/IT-Service/gulp-intermediate2.svg?sort=semver&logo=github)](https://github.com/IT-Service/gulp-intermediate2/releases)
[![NPM release](https://img.shields.io/npm/v/gulp-intermediate2.svg?logo=npm)](https://www.npmjs.com/package/gulp-intermediate2)

[![Semantic Versioning](https://img.shields.io/static/v1?label=Semantic%20Versioning&message=v2.0.0&color=green&logo=semver)](https://semver.org/lang/ru/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-v1.0.0-yellow.svg?logo=git)](https://conventionalcommits.org)

This plugin is a modern version of `gulp-intermediate`.
Fully support various encodings and streaming mode.

A gulp helper for tools that need files on disk.

Some tools require access to files on disk instead of working with `stdin` and `stdout`
(e.g., [Jekyll](http://jekyllrb.com/), [Ruby Sass](http://sass-lang.com/)).
`gulp-intermediate2` is a convenience plugin
that writes the current vinyl stream to a temporary directory,
lets you run commands on the file system, and pushes the results back into the pipe.

**NOTE:** Writing intermediate files to disk is counter to the gulp philosophy.
If possible, use a tool that works with streams.
Use `gulp-intermediate2` only if other (better) options aren't available.

## Install

```sh
npm install --save-dev gulp-intermediate2
```

## Usage

```js
var gulp = require('gulp');
var spawn = require('child-process').spawn;
var intermediate2 = require('gulp-intermediate2');

gulp.task('default', function () {
  return gulp.src('**/*', { encoding: false })
    .pipe(intermediate2(
      {
        destOptions: { encoding: false },
        srcOptions: { encoding: false }
      },
      function (srcDirPath, destDirPath, callback) {
        // Run a command on the files in tempDir and write the results to
        // the specified output directory.
        spawn('a_command', ['--dest', '_site'], {cwd: tempDir});
          .on('close', cb);
      }
    ))
    .pipe(gulp.dest(testDestFilesPath))
});
```

With streaming mode:

```js
var gulp = require('gulp');
var spawn = require('child-process').spawn;
var intermediate2 = require('gulp-intermediate2');

gulp.task('default', function () {
  return gulp.src('**/*', { encoding: false, buffer: false })
    .pipe(plugin.intermediate2(
      {
        destOptions: { encoding: false },
        srcOptions: { encoding: false, buffer: false },
        container: 'test-container',
        output: 'test-output'
      },
      function (srcDirPath, destDirPath, callback) {
        // Run a command on the files in tempDir and write the results to
        // the specified output directory.
        spawn('a_command', ['--dest', '_site'], {cwd: tempDir});
          .on('close', cb);
      }
    ))
    .pipe(gulp.dest(testDestFilesPath, { encoding: false }))
});
```

## API

<!-- TSDOC_START -->

## :toolbox: Functions

- [intermediate2](#gear-intermediate2)
- [intermediate2](#gear-intermediate2)
- [intermediate2](#gear-intermediate2)

### :gear: intermediate2

Plugin fabric function, it returns transformation stream for gulp task with specified options

| Function | Type |
| ---------- | ---------- |
| `intermediate2` | `{ (process: Process): ReadWriteStream; (pluginOptions: Intermediate2Options, process: Process): ReadWriteStream; }` |

Parameters:

* `pluginOptions`: - contains the options for gulp plugin.
* `process`: - contains the process callback for files processing


[:link: Source](https://github.com/IT-Service-NPM/gulp-intermediate2/tree/main/src/lib/intermediate2/index.ts#L66)

### :gear: intermediate2

Plugin fabric function, it returns transformation stream for gulp task with specified options

| Function | Type |
| ---------- | ---------- |
| `intermediate2` | `{ (process: Process): ReadWriteStream; (pluginOptions: Intermediate2Options, process: Process): ReadWriteStream; }` |

Parameters:

* `pluginOptions`: - contains the options for gulp plugin.
* `process`: - contains the process callback for files processing


[:link: Source](https://github.com/IT-Service-NPM/gulp-intermediate2/tree/main/src/lib/intermediate2/index.ts#L74)

### :gear: intermediate2

Plugin fabric function, it returns transformation stream for gulp task with specified options

| Function | Type |
| ---------- | ---------- |
| `intermediate2` | `{ (process: Process): ReadWriteStream; (pluginOptions: Intermediate2Options, process: Process): ReadWriteStream; }` |

Parameters:

* `pluginOptions`: - contains the options for gulp plugin.
* `process`: - contains the process callback for files processing


[:link: Source](https://github.com/IT-Service-NPM/gulp-intermediate2/tree/main/src/lib/intermediate2/index.ts#L82)



## :tropical_drink: Interfaces

- [Intermediate2Options](#gear-intermediate2options)

### :gear: Intermediate2Options

gulp-intermediate2 plugin options

| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `output` | `string or undefined` | The directory read back into the stream when processing is finished. Relative to tempDir. defaultValue: `'.'` |
| `container` | `string or undefined` | The directory that files are written to, relative to the operating system's temporary directory. The container is emptied before every run. |
| `destOptions` | `any` | Options for gulp dest() for writing files to temp directory for processing. |
| `srcGlobs` | `string or string[] or undefined` | Globs for filter output files from output directory. defaultValue: `'**\/*'` |
| `srcOptions` | `any` | Options for gulp src() for reading files after processing. |


## :cocktail: Types

- [ProcessCallback](#gear-processcallback)
- [Process](#gear-process)

### :gear: ProcessCallback

| Type | Type |
| ---------- | ---------- |
| `ProcessCallback` | `(Error?: Error or null) => void` |

[:link: Source](https://github.com/IT-Service-NPM/gulp-intermediate2/tree/main/src/lib/intermediate2/index.ts#L53)

### :gear: Process

| Type | Type |
| ---------- | ---------- |
| `Process` | `(srcDirPath: string, destDirPath: string, callback: ProcessCallback) => void` |

[:link: Source](https://github.com/IT-Service-NPM/gulp-intermediate2/tree/main/src/lib/intermediate2/index.ts#L55)


<!-- TSDOC_END -->

### intermediate2([options], [process])

#### options

Type: `object`
Optional

##### destOptions

Type: `object`
Optional

All options, supported by `gulp.dest`.
Options for writing input Vinyl files to temp directory.

##### srcOptions

Type: `object`
Optional

All options, supported by `gulp.src`.
Options for reading output files from the temp output directory
after the process is completed.

##### output

Type: `string`
Default: `'.'`

The directory read back into the stream when processing is finished.
Relative to `tempDir\<uniqueID>`.

##### container

Type: `string`
Default: random uuid

The directory that input files are written to.
Relative to `tempDir\<uniqueID>`.

The container is emptied before every run.

#### process(srcDirPath, destDirPath, cb)

Type: `function`

Run your commands.
`process` comes with three arguments:

- `srcDirPath`: The absolute path to the directory
  containing your input temporary files.
- `destDirPath`: The absolute path to the directory
  containing your output temporary files.
- `cb`: A callback function to call when the processing is finished.
  It pushes the output files (from destDirPath) back into the gulp stream.

#### Notes

The files are written to `tempDir` using the vinyl file object's relative path,
with `gulp.dest()`.
