const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json({ limit: '2mb' }));

// ✅ Git 자동 커밋 및 푸시 함수
function gitCommitAndPush() {
  const githubToken = process.env.GITHUB_TOKEN;
  const repoURL = 'https://github.com/CoilKorea/diablo4-blackmarket.git';
  const remoteURL = repoURL.replace('https://', `https://${githubToken}@`);
  const commitMessage = `자동 저장: price.html, items.html 업데이트`;

  const commands = [
    'rm -rf .git', // 깔끔하게 초기화
    'git init',
    'git config user.name "render-bot"',
    'git config user.email "render@bot.com"',
    `git remote add origin ${remoteURL}`,
    'git fetch origin main || echo "무시: fetch 오류"',
    'git checkout -B main',
    'git pull origin main --allow-unrelated-histories || echo "무시: pull 오류"',
    'git add public/sections/price.html public/sections/items.html',
    `git commit -m "${commitMessage}" || echo "스킵: 변경 없음"`,
    'git push origin main'
  ].join(' && ');

  exec(commands, { cwd: __dirname }, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Git 푸시 실패:\n', stderr);
    } else {
      console.log('✅ Git 푸시 성공:\n', stdout);
    }
  });
}

// ✅ 저장 API
app.post('/api/save', (req, res) => {
  const { filename, content } = req.body;
  const allowed = ['sections/price.html', 'sections/items.html'];

  if (!allowed.includes(filename)) {
    return res.status(400).json({ error: '허용되지 않은 파일입니다.' });
  }

  const savePath = path.join(__dirname, 'public', filename);

  fs.writeFile(savePath, content, 'utf8', (err) => {
    if (err) {
      console.error('❌ 파일 저장 실패:', err);
      return res.status(500).json({ error: '파일 저장 실패' });
    }

    console.log(`✅ 저장 완료: ${filename}`);
    gitCommitAndPush(); // 저장 성공 시 자동 커밋
    res.json({ success: true });
  });
});

// ✅ 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
