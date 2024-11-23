import { describe, expect, it, beforeEach, beforeAll, afterAll } from "vitest";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";
import gulp from "gulp";
import * as testLib from "../../lib";
import "./gulpfile";

const testSrcFilesPath: string = path.join(__dirname, 'test-files');
const testDestFilesPath: string = path.join(__dirname, 'output');

let testSrcFiles: string[];

describe('intermediate2', () => {

	beforeAll(async () => {
		testSrcFiles = await testLib.getFilesRelativePath(testSrcFilesPath);
	});

	beforeEach(async () => {
		await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
	});

	afterAll(async () => {
		await fs.promises.rm(testDestFilesPath, { force: true, recursive: true });
	});

	it('must be support streaming files processing', () => {
		void (async () => {
			try {
				/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
				await promisify(gulp.series('task1'))();
			}
			catch {
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
		})();
	});
});
