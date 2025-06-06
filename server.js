const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const PORT = process.env.PORT || 3000;

// 👉 정적 파일 제공
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '2mb' }));

// ✅ 루트 요청 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ 저장 API
app.post('/api/save', (req, res) => {
  const { filename, content } = req.body;
  const allowedFiles = ['sections/price.html', 'sections/items.html'];
  if (!allowedFiles.includes(filename)) {
    return res.status(400).json({ error: '허용되지 않은 파일입니다.' });
  }

  const savePath = path.join(__dirname, 'public', filename); // ✅ 수정됨

  fs.writeFile(savePath, content, 'utf8', (err) => {
    if (err) {
      console.error('파일 저장 실패:', err.message);
      return res.status(500).json({ error: '파일 저장 실패' });
    }

    console.log(`✅ 저장됨: ${savePath}`);
    res.json({ success: true, message: '파일 저장 성공' });
  });
});

});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
