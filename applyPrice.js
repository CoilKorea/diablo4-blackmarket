// 치환 기능 (HTML 내부의 단어만 바꾸기용)
const fs = require('fs');
const path = require('path');

function applyPriceValues(htmlPath, valuesPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const values = JSON.parse(fs.readFileSync(valuesPath, 'utf8'));
  let result = html;

  for (const [key, val] of Object.entries(values)) {
    const regex = new RegExp(key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    result = result.replace(regex, val);
  }

  fs.writeFileSync(htmlPath, result, 'utf8');
}

module.exports = { applyPriceValues };
