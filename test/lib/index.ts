import path from 'node:path';
import fs from 'node:fs';

export const rootPath: string = path.join(__dirname, '../..');

export async function getFilesRelativePath(directory: string): Promise<string[]> {
  const files =
    (await fs.promises.readdir(directory, { recursive: true }))
      .filter((testPath: string) => fs.statSync(path.join(directory, testPath)).isFile());
  return files;
};
