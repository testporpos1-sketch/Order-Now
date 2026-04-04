const fs = require('fs');
const path = require('path');

const SB_URL = process.env.SUPABASE_URL || '';
const SB_KEY = process.env.SUPABASE_KEY || '';
const SELLER_PASS = process.env.SELLER_PASS || 'seller123';

if (!SB_URL || !SB_KEY) {
  console.error('тЭМ SUPABASE_URL ржПржмржВ SUPABASE_KEY ржжрж░ржХрж╛рж░!');
  process.exit(1);
}

function inject(file) {
  return fs.readFileSync(file, 'utf8')
    .replace(/__SUPABASE_URL__/g, SB_URL)
    .replace(/__SUPABASE_KEY__/g, SB_KEY)
    .replace(/__SELLER_PASS__/g, SELLER_PASS);
}

// Build customer site тЖТ /public/
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/index.html', inject('customer/index.html'));
console.log('тЬЕ Customer site built тЖТ public/index.html');

// Build seller site тЖТ /public/seller/
fs.mkdirSync('public/seller', { recursive: true });
fs.writeFileSync('public/seller/index.html', inject('seller/index.html'));
console.log('тЬЕ Seller panel built тЖТ public/seller/index.html');

// Copy static files
['manifest.json', 'sw.js', 'icon-192.png', 'icon-512.png'].forEach(f => {
  const src = path.join('static', f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join('public', f));
    fs.copyFileSync(src, path.join('public/seller', f));
  }
});

console.log('тЬЕ Build рж╕ржорзНржкржирзНржи!');
console.log('ЁЯУ▒ Customer: https://your-site.vercel.app/');
console.log('ЁЯФз Seller:   https://your-site.vercel.app/seller/');
