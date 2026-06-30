import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Fetching regions...');
  const regionsRes = await fetch('https://geo.api.gouv.fr/regions');
  const regions = await regionsRes.json();
  const regionMap = {};
  regions.forEach(r => {
    regionMap[r.code] = r.nom;
  });

  console.log('Fetching departments...');
  const deptRes = await fetch('https://geo.api.gouv.fr/departements');
  const depts = await deptRes.json();
  const deptMap = {};
  depts.forEach(d => {
    deptMap[d.code] = `${d.nom} (${d.code})`;
  });

  console.log('Fetching communes (this may take a few seconds)...');
  const communesRes = await fetch('https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,codeDepartement,codeRegion');
  const communes = await communesRes.json();

  console.log(`Loaded ${communes.length} communes. Processing...`);

  // Map and clean up
  const processed = communes.map((c, index) => {
    const postalCode = c.codesPostaux && c.codesPostaux.length > 0 ? c.codesPostaux[0] : '';
    const deptName = deptMap[c.codeDepartement] || c.codeDepartement || '';
    const regName = regionMap[c.codeRegion] || c.codeRegion || '';
    
    return {
      id: c.code || String(index),
      code: c.code || '',
      postalCode: postalCode,
      name: c.nom || '',
      department: deptName,
      region: regName
    };
  }).filter(c => c.name && c.postalCode);

  console.log(`Cleaned up list contains ${processed.length} valid communes.`);

  // Group by first letter (normalized)
  const groups = {};
  processed.forEach(c => {
    const normalizedName = c.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    let firstChar = normalizedName.trim().charAt(0).toLowerCase();
    
    if (!/^[a-z]$/.test(firstChar)) {
      firstChar = 'other';
    }

    if (!groups[firstChar]) {
      groups[firstChar] = [];
    }
    groups[firstChar].push(c);
  });

  // Ensure output directory exists
  const outputDir = path.resolve('./public/data/communes');
  fs.mkdirSync(outputDir, { recursive: true });

  // Write files
  console.log('Writing split JSON files...');
  Object.keys(groups).forEach(letter => {
    const filePath = path.join(outputDir, `${letter}.json`);
    groups[letter].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    fs.writeFileSync(filePath, JSON.stringify(groups[letter]));
  });

  // Also write the compact version of all communes in one file (minified)
  console.log('Writing compact minified communes_compact.json...');
  processed.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  fs.writeFileSync(path.resolve('./public/data/communes_compact.json'), JSON.stringify(processed));

  // Write index
  const indexInfo = {};
  Object.keys(groups).forEach(letter => {
    indexInfo[letter] = groups[letter].length;
  });
  fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(indexInfo, null, 2));

  console.log('Communes splitting completed successfully!');
}

main().catch(err => {
  console.error('Error generating communes data:', err);
  process.exit(1);
});
