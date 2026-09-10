const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const sourcePath = path.join(process.cwd(), "src", "lib", "blog-types.ts");
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const loaded = { exports: {} };
new Function("exports", "module", "require", compiled)(loaded.exports, loaded, require);
const { validateAndNormalizePost } = loaded.exports;

const directory = path.join(process.cwd(), "content", "blog");
const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
assert.ok(files.length >= 2, "Expected seed articles");
const slugs = new Set();

for (const file of files) {
  const input = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
  const result = validateAndNormalizePost(input);
  assert.deepEqual(result.errors, [], `${file}: ${result.errors.join(" ")}`);
  assert.equal(`${input.slug}.json`, file, `${file}: filename must match slug`);
  assert.ok(!slugs.has(input.slug), `${file}: duplicate slug`);
  slugs.add(input.slug);
}

console.log(`Blog checks passed: ${files.length} bilingual articles satisfy the publishing contract.`);
