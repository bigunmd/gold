import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../skills/gold-standard-development/', import.meta.url));
function markdownFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(dir, entry.name);
    return entry.isDirectory() ? markdownFiles(path) : entry.name.endsWith('.md') ? [path] : [];
  });
}
for (const file of markdownFiles(root)) {
  test(`bounded resource and relative links: ${relative(root, file)}`, () => {
    const text = readFileSync(file, 'utf8');
    assert.ok(text.length < 8192, 'resource would be pruned');
    // Templates describe target-project artifacts, not packaged resource dependencies.
    if (relative(root, file).startsWith(`templates${sep}`)) return;
    for (const [, link] of text.matchAll(/`((?:(?:references|templates)\/|\.\.\/templates\/)?[a-z][a-z0-9-]*\.md)`/g)) {
      const target = resolve(dirname(file), link);
      const rel = relative(root, target);
      assert.ok(rel !== '..' && !rel.startsWith(`..${sep}`), `escaped skill root: ${link}`);
      assert.ok(statSync(target).isFile(), `missing resource: ${link}`);
    }
  });
}
