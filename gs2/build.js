const fs = require('fs');
const path = require('path');

const SB_URL    = process.env.SUPABASE_URL  || '';
const SB_KEY    = process.env.SUPABASE_KEY  || '';
const OWNER_PASS= process.env.OWNER_PASS    || 'owner@ghorer2024';

if (!SB_URL || !SB_KEY) {
  console.error('❌ SUPABASE_URL এবং SUPABASE_KEY সেট করুন!');
  process.exit(1);
}

function inject(src) {
  return fs.readFileSync(src, 'utf8')
    .replace(/__SUPABASE_URL__/g, SB_URL)
    .replace(/__SUPABASE_KEY__/g, SB_KEY)
    .replace(/__OWNER_PASS__/g, OWNER_PASS);
}

function mk(p) { fs.mkdirSync(p, { recursive: true }); }
function cp(src, dst) { if (fs.existsSync(src)) fs.copyFileSync(src, dst); }

mk('public'); mk('public/restaurant'); mk('public/rider');
mk('public/owner'); mk('public/apply-restaurant'); mk('public/apply-rider');

fs.writeFileSync('public/index.html',                    inject('customer/index.html'));
fs.writeFileSync('public/restaurant/index.html',         inject('restaurant/index.html'));
fs.writeFileSync('public/rider/index.html',              inject('rider/index.html'));
fs.writeFileSync('public/owner/index.html',              inject('owner/index.html'));
fs.writeFileSync('public/apply-restaurant/index.html',   inject('apply-restaurant/index.html'));
fs.writeFileSync('public/apply-rider/index.html',        inject('apply-rider/index.html'));

const statics = ['manifest.json','sw.js','icon-192.png','icon-512.png'];
const dirs = ['public','public/restaurant','public/rider','public/owner','public/apply-restaurant','public/apply-rider'];
statics.forEach(f => dirs.forEach(d => cp(path.join('static',f), path.join(d,f))));
console.log('✅ Build সম্পন্ন!');
