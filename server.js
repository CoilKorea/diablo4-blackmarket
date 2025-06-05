const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 정적 파일 서빙
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '2mb' }));

// ✅ 루트 페이지 요청 시 admin.html 반환
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ✅ 저장 API
app.post('/api/save', (req, res) => {
  const { filename, content } = req.body;
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

    // Git 자동 커밋 및 푸시
    const gitCommands = `
      cd "${__dirname}" && \
      git add "${filename}" && \
      git commit -m "🔧 관리자에 의해 ${path.basename(filename)} 수정됨" && \
      git push origin main
    `;

    exec(gitCommands, (gitErr, stdout, stderr) => {
      if (gitErr) {
        console.error('❌ Git 푸시 실패:', gitErr);
        return res.status(500).json({ error: 'Git 푸시에 실패했습니다.' });
      }

      console.log('✅ Git 푸시 완료:', stdout);
      res.json({ success: true, message: '파일 저장 및 Git 푸시 완료!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
