const fs = require('fs');
const path = require('path');

function applyPrice() {
  const jsonPath = path.join(__dirname, 'public', 'data', 'price-values.json');
  const outputPath = path.join(__dirname, 'public', 'price.html');

  const dataDir = path.dirname(jsonPath);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  if (!fs.existsSync(jsonPath)) {
    console.error('❌ price-values.json 파일 없음. 치환 중단');
    return;
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  let html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>💰 디아블로4 블랙마켓 가격표</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css" />
  <style>
    body { margin: 0; font-family: 'Pretendard Variable', sans-serif; color: #f4f4f4; padding: 0rem; }
    .menu-container { max-width: 800px; margin: auto; background: #2a2a2a; padding: 2rem; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
    .menu-section { margin-bottom: 2rem; }
    .section-title { font-size: 1.5rem; font-weight: 900; margin-bottom: 1rem; border-bottom: 2px solid #444; padding-bottom: 0.5rem; color: #eeee00; }
    .menu-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 0.75rem 0; border-bottom: 1px dashed #444; }
    .item-label { font-weight: 600; color: #fff; }
    .item-desc { font-size: 0.9rem; color: #aaa; margin-top: 0.25rem; }
    .item-price { color: #ffc400; font-weight: 700; }
  </style>
</head>
<body><div class="menu-container">
`;

  for (const section in data) {
    html += `<div class="menu-section">
`;
    html += `<div class="section-title">${section}</div>
`;

    const items = data[section];
    for (const label in items) {
      const price = items[label];
      html += `<div class="menu-item"><div class="item-label">${label}</div><div class="item-price">${price}</div></div>
`;
    }

    html += `</div>
`;
  }

  html += `</div></body></html>`;

  fs.writeFileSync(outputPath, html, 'utf-8');
  console.log(`✅ price.html 생성 완료 (${outputPath})`);
}

module.exports = applyPrice;
