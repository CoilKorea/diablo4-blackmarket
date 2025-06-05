// ✅ server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 정적 파일 서빙 (원하는 경우)
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '2mb' }));

// ✅ POST /api/save
app.post('/api/save', (req, res) => {
  const { filename, content } = req.body;

  // 보안 필터링 - 특정 파일만 허용
  const allowedFiles = ['sections/price.html', 'sections/items.html'];
  if (!allowedFiles.includes(filename)) {
    return res.status(400).json({ error: '허용되지 않은 파일입니다.' });
  }

  const savePath = path.join(__dirname, filename);

  fs.writeFile(savePath, content, 'utf8', (err) => {
    if (err) {
      console.error('파일 저장 실패:', err);
      return res.status(500).json({ error: '파일 저장에 실패했습니다.' });
    }
    console.log(`[✔] ${filename} 저장 완료.`);
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
