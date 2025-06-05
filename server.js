const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // public 폴더 내 파일 정적 제공
app.use(bodyParser.json({ limit: '2mb' }));

// ✅ '/' 요청 시 admin.html을 응답
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ✅ 파일 저장 API 등 나머지 기존 코드 유지
app.post('/api/save', (req, res) => {
  const { filename, content } = req.body;

  const allowedFiles = ['sections/price.html', 'sections/items.html'];
  if (!allowedFiles.includes(filename)) {
    return res.status(400).json({ error: '허용되지 않은 파일입니다.' });
  }

  const savePath = path.join(__dirname, filename);
  fs.writeFile(savePath, content, 'utf8', (err) => {
    if (err) return res.status(500).json({ error: '저장 실패' });

    const gitCmd = `
      cd "${__dirname}" && \
      git add "${filename}" && \
      git commit -m "🔧 ${filename} 업데이트" && \
      git push origin main
    `;

    exec(gitCmd, (gitErr, stdout, stderr) => {
      if (gitErr) return res.status(500).json({ error: 'Git 푸시 실패' });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
