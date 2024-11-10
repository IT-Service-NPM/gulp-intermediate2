import { describe, expect, it, beforeEach, beforeAll, afterAll } from "vitest";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";
import gulp from "gulp";
// import { gulpSync } from "../../lib/index";
import "./gulpfile";

const testSrcFilesPath: string = path.join(__dirname, 'test-files');
const testDestFilesPath: string = path.join(__dirname, 'output');

let testSrcFiles: string[];

describe('intermediate2', () => {

	beforeAll(async () => {
		testSrcFiles = (await fs.promises.readdir(testSrcFilesPath, { recursive: true }))
			.filter((testPath: string) => fs.statSync(path.join(testSrcFilesPath, testPath)).isFile());
	});

	beforeEach(async () => {
		await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
	});

	afterAll(async () => {
		await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
	});

	it('must be copies all utf-8 files without options', async () => {

		await promisify(gulp.series('task1'))();

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

	it('must be copies utf-8 files without options', async () => {

		await promisify(gulp.series('task2'))();

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
