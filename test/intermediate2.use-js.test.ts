/*jshint node:true */
/*jshint nomen:true */
"use strict";

import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import * as plugin from "../dist/index";
import path from "node:path";
import streams from "node:stream/promises";
import fs from "node:fs";
import vfs from "vinyl-fs";

const cwd: string = path.relative(process.cwd(), __dirname);
const testSrcFilesPath: string = path.join(cwd, 'test-files');
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

});
