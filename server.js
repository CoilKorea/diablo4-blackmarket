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

  const savePath = path.join(__dirname, 'public', filename);  // ✅ 수정됨
  fs.writeFile(savePath, content, 'utf8', (err) => {
    if (err) return res.status(500).json({ error: '파일 저장 실패' });

    const gitCommands = `
      cd "${__dirname}" && \
      git add "public/${filename}" && \
      git commit -m "🔧 ${path.basename(filename)} 수정됨" && \
      git push origin main
    `;
    exec(gitCommands, (gitErr) => {
      if (gitErr) return res.status(500).json({ error: 'Git 푸시 실패' });
      res.json({ success: true, message: '저장 및 푸시 완료' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
