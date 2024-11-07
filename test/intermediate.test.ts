/*jshint node:true */
/*jshint nomen:true */
"use strict";

import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import * as plugin from "../src/index";
import path from "node:path";
import streams from "node:stream/promises";
import fs from "node:fs";
import vfs from "vinyl-fs";

const cwd: string = path.relative(process.cwd(), __dirname);
const testSrcFilesPath2: string = path.join(cwd, 'test-files-2');
const testDestFilesPath: string = path.join(cwd, 'output');

let testSrcFiles: string[];

describe('intermediate2', () => {

	beforeAll(async () => {
		testSrcFiles = (await fs.promises.readdir(testSrcFilesPath2, { recursive: true }))
			.filter((testPath: string) => fs.statSync(path.join(testSrcFilesPath2, testPath)).isFile());
	});

	function copyAllFilesTestProcess(srcDirPath: string, callback: plugin.ProcessCallback): void {
		const destDirPath = path.join(srcDirPath, '../output');
		fs.cp(srcDirPath, destDirPath, { recursive: true }, callback);
	};

	it('must be defined named plugin export intermediate', () => {
		expect(plugin.intermediate, 'named plugin export intermediate').toBeDefined();
	});

	beforeEach(async () => {
		await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
	});

	it('must be copies all utf-8 files without options', async () => {

		expect.hasAssertions();

		try {
			await streams.finished(
				vfs.src('**/*', { cwd: testSrcFilesPath2 })
					.pipe(plugin.intermediate({ output: 'output' }, copyAllFilesTestProcess))
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
			const srcContent = await fs.promises.readFile(path.join(testSrcFilesPath2, testFilePath), { encoding: null });
			const destContent = await fs.promises.readFile(path.join(testDestFilesPath, testFilePath), { encoding: null });
			expect(destContent.equals(srcContent), `content of ${testFilePath} test file must be the same as content of source file`).toBeTruthy();
		};

	});

});
