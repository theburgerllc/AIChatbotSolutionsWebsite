/* eslint-env node */
// create-sendgrid-templates.mjs
import fs from 'node:fs/promises';

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error("Missing SENDGRID_API_KEY in environment.");
  process.exit(1);
}

const [, , jsonPath] = process.argv;
if (!jsonPath) {
  console.error("Usage: node create-sendgrid-templates.mjs sendgrid-templates.json");
  process.exit(1);
}

const json = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
const out = [];

async function sg(path, init = {}) {
  const res = await fetch(`https://api.sendgrid.com/v3${path}`, {
    ...init,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SendGrid API error ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return await res.json();
}

for (const t of json.templates) {
  const created = await sg('/templates', {
    method: 'POST',
    body: JSON.stringify({ name: t.name }),
  });
  const templateId = created.id;
  await sg(`/templates/${templateId}/versions`, {
    method: 'POST',
    body: JSON.stringify({
      active: 1,
      name: 'v1',
      html_content: t.html,
      subject: t.subject,
      template_id: templateId,
    }),
  });
  out.push({ name: t.name, env_var: t.env_var, template_id: templateId });
  console.log(`Created: ${t.name} → ${templateId}`);
}

console.log('\n# Paste into your terminal to save Template IDs in Vercel:');
for (const row of out) {
  console.log(`vercel env add ${row.env_var} production <<< "${row.template_id}"`);
}
