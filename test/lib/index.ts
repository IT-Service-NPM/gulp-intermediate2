import path from 'node:path';
import fs from 'node:fs';

export const rootPath: string = path.join(import.meta.dirname, '../..');

export async function getFilesRelativePath(
  directory: string
): Promise<string[]> {
  const fileItems = await fs.promises.readdir(directory, { recursive: true });
  const files = fileItems.filter(
    (testPath: string) => fs.statSync(path.join(directory, testPath)).isFile()
  );
  return files;
};
