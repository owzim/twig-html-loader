// import diff from 'jest-diff';
import path from 'path';
import compiler from './compiler';

test('Basic template compiling', async () => {
  const filename = 'basic.twig';
  const stats = await compiler('index.js', filename);
  const fs = stats.compilation.compiler.outputFileSystem;
  const dirname = stats.compilation.compiler.outputPath;
  const buffer = fs.readFileSync(path.join(dirname, filename));
  const output = String(buffer);
  expect(output).toBe('Hello, world!');
});
