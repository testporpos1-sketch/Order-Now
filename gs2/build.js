const fs = require('fs');
const path = require('path');

// ENV
const SB_URL     = process.env.SUPABASE_URL || '';
const SB_KEY     = process.env.SUPABASE_KEY || '';
const OWNER_PASS = process.env.OWNER_PASS   || 'owner@ghorer2024';

// Check ENV
if (!SB_URL || !SB_KEY) {
  console.error('❌ SUPABASE_URL এবং SUPABASE_KEY সেট করুন!');
  process.exit(1);
}

// Replace function
function inject(src) {
  return fs.readFileSync(src, 'utf8')
    .replace(/__SUPABASE_URL__/g, SB_URL)
    .replace(/__SUPABASE_KEY__/g, SB_KEY)
    .replace(/__OWNER_PASS__/g, OWNER_PASS);
}

// Helper
function mk(p) { fs.mkdirSync(p, { recursive: true }); }
function cp(src, dst) { if (fs.existsSync(src)) fs.copyFileSync(src, dst); }

// Create folders (gs2)
mk('gs2');
mk('gs2/restaurant');
mk('gs2/rider');
mk('gs2/owner');
mk('gs2/apply-restaurant');
mk('gs2/apply-rider');

// Generate HTML
fs.writeFileSync('gs2/index.html',                  inject('customer/index.html'));
fs.writeFileSync('gs2/restaurant/index.html',       inject('restaurant/index.html'));
fs.writeFileSync('gs2/rider/index.html',            inject('rider/index.html'));
fs.writeFileSync('gs2/owner/index.html',            inject('owner/index.html'));
fs.writeFileSync('gs2/apply-restaurant/index.html', inject('apply-restaurant/index.html'));
fs.writeFileSync('gs2/apply-rider/index.html',      inject('apply-rider/index.html'));

// Copy static files
const statics = ['manifest.json', 'sw.js', 'icon-192.png', 'icon-512.png'];
const dirs = [
  'gs2',
  'gs2/restaurant',
  'gs2/rider',
  'gs2/owner',
  'gs2/apply-restaurant',
  'gs2/apply-rider'
];

statics.forEach(file => {
  dirs.forEach(dir => {
    cp(path.join('static', file), path.join(dir, file));
  });
});

console.log('✅ Build successful! সব ফাইল gs2 এ তৈরি হয়েছে');
