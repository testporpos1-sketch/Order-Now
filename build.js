const fs = require('fs');
const path = require('path');

const SB_URL      = process.env.SUPABASE_URL    || '';
const SB_KEY      = process.env.SUPABASE_KEY    || '';
const SELLER_PASS = process.env.SELLER_PASS     || 'seller@ghorer2024';
const OWNER_PASS  = process.env.OWNER_PASS      || 'owner@ghorer2024';

if (!SB_URL || !SB_KEY) {
  console.error('SUPABASE_URL এবং SUPABASE_KEY সেট করুন!');
  process.exit(1);
}

function inject(src) {
  return fs.readFileSync(src, 'utf8')
    .replace(/__SUPABASE_URL__/g, SB_URL)
    .replace(/__SUPABASE_KEY__/g, SB_KEY)
    .replace(/__SELLER_PASS__/g, SELLER_PASS)
    .replace(/__OWNER_PASS__/g, OWNER_PASS);
}
function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }
function cp(src, dst) { if (fs.existsSync(src)) fs.copyFileSync(src, dst); }

mkdir('public'); mkdir('public/restaurant'); mkdir('public/rider');
mkdir('public/owner'); mkdir('public/apply');

fs.writeFileSync('public/index.html',            inject('customer/index.html'));
fs.writeFileSync('public/restaurant/index.html', inject('restaurant/index.html'));
fs.writeFileSync('public/rider/index.html',      inject('rider/index.html'));
fs.writeFileSync('public/owner/index.html',      inject('owner/index.html'));
fs.writeFileSync('public/apply/index.html',      inject('apply/index.html'));

const statics = ['manifest.json','sw.js','icon-192.png','icon-512.png'];
const dirs = ['public','public/restaurant','public/rider','public/owner','public/apply'];
statics.forEach(f => dirs.forEach(d => cp(path.join('static',f), path.join(d,f))));
console.log('Build done!');
