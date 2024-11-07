/*jshint node:true */
/*jshint nomen:true */
"use strict";

import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";

const cwd: string = path.relative(process.cwd(), __dirname);
const rootPath: string = path.join(cwd, '../../');
const testFilesRootPath: string = path.join(rootPath, 'test');
const testSrcFilesPath2: string = path.join(testFilesRootPath, 'test-files-2');
const testDestFilesPath: string = path.join(testFilesRootPath, 'output');

let testSrcFiles: string[];

function gulpSync(gulpfile: string, task: string): Buffer {
	return execSync(
		`node --import tsx node_modules/gulp/bin/gulp --gulpfile "${path.resolve(__dirname, gulpfile)}" ${task}`,
		{ cwd: rootPath }
	);
};

describe('intermediate2', () => {

	beforeAll(async () => {
		testSrcFiles = (await fs.promises.readdir(testSrcFilesPath2, { recursive: true }))
			.filter((testPath: string) => fs.statSync(path.join(testSrcFilesPath2, testPath)).isFile());
	});

	beforeEach(async () => {
		await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
	});

	it('must be copies all utf-8 files without options', async () => {

		gulpSync('./compatibility mode/gulpfile.ts', 'build');

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
