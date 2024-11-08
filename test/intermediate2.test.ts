/*jshint node:true */
/*jshint nomen:true */
"use strict";

import { vi, describe, expect, it, beforeEach, beforeAll } from "vitest";
import * as plugin from "../src/index";
import path from "node:path";
import streams from "node:stream/promises";
import fs from "node:fs";
import timers from 'node:timers/promises';
import { tmpdir } from "node:os";
import vfs from "vinyl-fs";
import PluginError from "plugin-error";

const cwd: string = path.relative(process.cwd(), __dirname);
const testSrcFilesPath: string = path.join(cwd, 'test-files');
const testSrcFilesPath2: string = path.join(cwd, 'test-files-2');
const testDestFilesPath: string = path.join(cwd, 'output');

let testSrcFiles: string[];

describe('intermediate2', () => {

	beforeAll(async () => {
		testSrcFiles = (await fs.promises.readdir(testSrcFilesPath, { recursive: true }))
			.filter((testPath: string) => fs.statSync(path.join(testSrcFilesPath, testPath)).isFile());
	});

	function copyAllFilesTestProcess(srcDirPath: string, destDirPath: string, callback: plugin.ProcessCallback): void {
		fs.cp(srcDirPath, destDirPath, { recursive: true }, callback);
	};

	it('must be defined named plugin export intermediate2', () => {
		expect(plugin.intermediate2, 'named plugin export intermediate2').toBeDefined();
	});

	// TODO: To enable typechecking, don't forget to pass down --typecheck flag.
	// it('must be defined default plugin export', () => {
	// 	expectTypeOf(require("../dist/index")).toBeFunction();
	// });

	beforeEach(async () => {
		await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
	});

	it('must be pushes all result files to output stream', async () => {

		expect.hasAssertions();

		try {
			await streams.finished(
				vfs.src('**/*', { cwd: testSrcFilesPath, encoding: false })
					.pipe(plugin.intermediate2(
						{ srcOptions: { encoding: false } },
						copyAllFilesTestProcess
					))
					.pipe(vfs.dest(testDestFilesPath))
			);
		}
		catch (err: any) {
			expect.unreachable('All exceptions must be handled in test');
		}

		expect(fs.existsSync(testDestFilesPath), 'output dir must be exists').toBeTruthy();

		const testDestFiles = (await fs.promises.readdir(testDestFilesPath, { recursive: true }))
			.filter((testPath: string) => fs.statSync(path.join(testDestFilesPath, testPath)).isFile());

		expect(testDestFiles).toEqual(testSrcFiles);

		for (const testFilePath of testDestFiles) {
			const srcContent = await fs.promises.readFile(path.join(testSrcFilesPath, testFilePath), { encoding: null });
			const destContent = await fs.promises.readFile(path.join(testDestFilesPath, testFilePath), { encoding: null });
			expect(destContent.equals(srcContent), `content of ${testFilePath} test file must be the same as content of source file`).toBeTruthy();
		};

	});

	it('must be copies all utf-8 files without options', async () => {

		const testSrcFiles2 = (await fs.promises.readdir(testSrcFilesPath2, { recursive: true }))
			.filter((testPath: string) => fs.statSync(path.join(testSrcFilesPath2, testPath)).isFile());

		expect.hasAssertions();

		try {
			await streams.finished(
				vfs.src('**/*', { cwd: testSrcFilesPath2 })
					.pipe(plugin.intermediate2(copyAllFilesTestProcess))
					.pipe(vfs.dest(testDestFilesPath))
			);
		}
		catch (err: any) {
			expect.unreachable('All exceptions must be handled in test');
		}

		expect(fs.existsSync(testDestFilesPath), 'output dir must be exists').toBeTruthy();

		const testDestFiles = (await fs.promises.readdir(testDestFilesPath, { recursive: true }))
			.filter((testPath: string) => fs.statSync(path.join(testDestFilesPath, testPath)).isFile());

		expect(testDestFiles).toEqual(testSrcFiles2);

		for (const testFilePath of testDestFiles) {
			const srcContent = await fs.promises.readFile(path.join(testSrcFilesPath2, testFilePath), { encoding: null });
			const destContent = await fs.promises.readFile(path.join(testDestFilesPath, testFilePath), { encoding: null });
			expect(destContent.equals(srcContent), `content of ${testFilePath} test file must be the same as content of source file`).toBeTruthy();
		};

	});

	it('must be support streaming files processing', async () => {

		expect.hasAssertions();

		try {
			await streams.finished(
				vfs.src('**/*', { cwd: testSrcFilesPath, encoding: false, buffer: false })
					.pipe(plugin.intermediate2(
						{
							destOptions: { encoding: false },
							srcOptions: { encoding: false, buffer: false },
							container: 'test-container',
							output: 'test-output'
						},
						copyAllFilesTestProcess
					))
					.pipe(vfs.dest(testDestFilesPath, { encoding: false }))
			);
		}
		catch (err: any) {
			expect.unreachable('All exceptions must be handled in test');
		}

		expect(fs.existsSync(testDestFilesPath), 'output dir must be exists').toBeTruthy();

		const testDestFiles = (await fs.promises.readdir(testDestFilesPath, { recursive: true }))
			.filter((testPath: string) => fs.statSync(path.join(testDestFilesPath, testPath)).isFile());

		expect(testDestFiles).toEqual(testSrcFiles);

		for (const testFilePath of testDestFiles) {
			const srcContent = await fs.promises.readFile(path.join(testSrcFilesPath, testFilePath), { encoding: null });
			const destContent = await fs.promises.readFile(path.join(testDestFilesPath, testFilePath), { encoding: null });
			expect(destContent.equals(srcContent), `content of ${testFilePath} test file must be the same as content of source file`).toBeTruthy();
		};

	});

	it('temp dir must be deleted after stream finished', async () => {

		const pluginDirsProcessor = vi.spyOn(vfs, 'dest');

		try {
			const pluginStream = plugin.intermediate2(
				{
					destOptions: { encoding: false },
					srcOptions: { encoding: false, buffer: false },
					container: 'test-container',
					output: 'test-output'
				},
				copyAllFilesTestProcess
			);
			const testPipeline = vfs.src('**/*', { cwd: testSrcFilesPath, encoding: false, buffer: false })
				.pipe(pluginStream)
				.pipe(vfs.dest(testDestFilesPath, { encoding: false }));
			await streams.finished(testPipeline);
			await streams.finished(pluginStream);
		}
		catch (err: any) {
			expect.unreachable('All exceptions must be handled in test');
		}

		expect(pluginDirsProcessor.mock.calls.length).toEqual(2);
		const tempDirPath = (pluginDirsProcessor.mock.calls[0] as any[])[0];

		await timers.scheduler.wait(1000);
		expect(fs.existsSync(tempDirPath), 'temp dir must be deleted').toBeFalsy();

	});

	it('must copy files to the OS temp subdirectory', async () => {

		const pluginDirsProcessor = vi.spyOn(vfs, 'dest');

		try {
			await streams.finished(
				vfs.src('**/*', { cwd: testSrcFilesPath, encoding: false, buffer: false })
					.pipe(plugin.intermediate2(
						{
							destOptions: { encoding: false },
							srcOptions: { encoding: false, buffer: false },
							container: 'test-container',
							output: 'test-output'
						},
						copyAllFilesTestProcess
					))
					.pipe(vfs.dest(testDestFilesPath, { encoding: false }))
			);
		}
		catch (err: any) {
			expect.unreachable('All exceptions must be handled in test');
		}

		expect(pluginDirsProcessor.mock.calls.length).toEqual(2);
		const tempDirPath = (pluginDirsProcessor.mock.calls[0] as any[])[0];

		const relative = path.relative(tmpdir(), tempDirPath);
		expect(relative && !relative.startsWith('..') && !path.isAbsolute(relative),
			'must use OS temp subdirectory').toBeTruthy();

	});

	it('must emit an error passed to the process callback', async () => {

		const pluginDirsProcessor = vi.spyOn(vfs, 'dest');
		const testErrorMessage = 'test error message';

		function errorTestProcess(srcDirPath: string, destDirPath: string, callback: plugin.ProcessCallback): void {
			callback(new Error(testErrorMessage));
		};

		const testStream = plugin.intermediate2(
			{
				destOptions: { encoding: false },
				srcOptions: { encoding: false }
			},
			errorTestProcess
		);
		vfs.src('**/*', { cwd: testSrcFilesPath, encoding: false, buffer: false })
			.pipe(testStream)
			.pipe(vfs.dest(testDestFilesPath, { encoding: false }));

		const err = await new Promise<any>((resolve, reject) => {
			testStream
				.on('error', (err) => resolve(err))
		});
		expect(err).toBeInstanceOf(PluginError);
		expect(err.message).toEqual(`exception in temp files processing handler: Error: ${testErrorMessage}`);

		expect(pluginDirsProcessor.mock.calls.length).toEqual(2);
		const tempDirPath = (pluginDirsProcessor.mock.calls[0] as any[])[0];

		await timers.scheduler.wait(1000);
		expect(fs.existsSync(tempDirPath), 'temp dir must be deleted').toBeFalsy();

	});

	it('must emit an error when after-processing failed', async () => {

		const pluginDirsProcessor = vi.spyOn(vfs, 'dest');
		const testErrorMessage = 'test error message';

		const testStream = plugin.intermediate2(
			{
				destOptions: { encoding: false },
				srcOptions: { encoding: false },
				srcGlobs: 'nonExistingFile'
			},
			copyAllFilesTestProcess
		);
		const testPipeline = vfs.src('**/*', { cwd: testSrcFilesPath, encoding: false })
			.pipe(testStream)
			.pipe(vfs.dest(testDestFilesPath, { encoding: false }));

		const err = await new Promise<any>((resolve, reject) => {
			testStream
				.on('error', (err) => resolve(err))
				.on('end', () => resolve(null))
		});
		expect(err).toBeInstanceOf(Error);

		expect(pluginDirsProcessor.mock.calls.length).toEqual(2);
		const tempDirPath = (pluginDirsProcessor.mock.calls[0] as any[])[0];

		await timers.scheduler.wait(1000);
		expect(fs.existsSync(tempDirPath), 'temp dir must be deleted').toBeFalsy();

	});

});
