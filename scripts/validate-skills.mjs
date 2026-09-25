import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const skillsRoot = resolve(root, 'skills');
const retiredText = [
  ['docs', 'darwin', 'so'].join('.'),
  ['search', 'darwin', 'capabilities'].join('_'),
  ['execute', 'darwin', 'capability'].join('_'),
];

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => resolve(entry.parentPath, entry.name));
}

const skillDirectories = (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (skillDirectories.length === 0) throw new Error('No skills were found.');

const readme = await readFile(resolve(root, 'README.md'), 'utf8');
const plugin = JSON.parse(await readFile(resolve(root, 'plugin.json'), 'utf8'));
if (plugin.homepage !== 'https://darwin.so/docs') {
  throw new Error('plugin.json must use https://darwin.so/docs as its homepage.');
}
for (const directory of skillDirectories) {
  const source = await readFile(resolve(skillsRoot, directory, 'SKILL.md'), 'utf8');
  const metadata = await readFile(resolve(skillsRoot, directory, 'agents/openai.yaml'), 'utf8');
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) throw new Error(`${directory}/SKILL.md has no YAML frontmatter.`);
  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (name !== directory) throw new Error(`${directory} must use name: ${directory}.`);
  if (!description) throw new Error(`${directory} needs a discriminating description.`);
  if (!metadata.includes('display_name:') || !metadata.includes('short_description:')) {
    throw new Error(`${directory}/agents/openai.yaml is missing interface metadata.`);
  }
  if (!readme.includes(`\`${directory}\``)) throw new Error(`README.md does not list ${directory}.`);
}

const publicFiles = (await filesBelow(root)).filter((path) => !path.includes('/.git/'));
for (const path of publicFiles) {
  const source = await readFile(path, 'utf8');
  for (const retired of retiredText) {
    if (source.includes(retired)) {
      throw new Error(`${path.slice(root.length + 1)} contains retired text: ${retired}`);
    }
  }
}

const requiredTools = [
  'search',
  'get_account',
  'list_search_history',
  'start_action',
  'get_action',
  'list_actions',
  'continue_action',
  'authenticate_session',
  'pay_action',
  'approve_action',
  'end_action',
];
for (const tool of requiredTools) {
  if (!readme.includes(`\`${tool}\``)) throw new Error(`README.md does not document ${tool}.`);
}

const apiSkill = await readFile(resolve(skillsRoot, 'darwin-api', 'SKILL.md'), 'utf8');
const accountOperations = [
  'POST /account/api-keys',
  'GET /account/api-keys',
  'GET /account/api-keys/usage',
  'DELETE /account/api-keys/{apiKeyId}',
];
for (const operation of accountOperations) {
  if (!apiSkill.includes(`\`${operation}\``)) {
    throw new Error(`darwin-api/SKILL.md does not document ${operation}.`);
  }
}

console.log(`Validated ${skillDirectories.length} Darwin skills and ${publicFiles.length} public files.`);
