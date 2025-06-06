const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// 저장 API
app.post('/api/save', (req, res) => {
  const { filename, content } = req.body;

  if (!filename || !content) {
    return res.status(400).json({ success: false, error: '파일명 또는 내용이 누락되었습니다.' });
  }

  const filePath = path.join(__dirname, 'public', filename);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('❌ 파일 저장 실패:', err);
      return res.status(500).json({ success: false, error: '파일 저장 실패' });
    }

    console.log(`✅ 저장 완료: ${filename}`);
    gitCommitAndPush(filename); // Git 자동 커밋 및 푸시
    res.json({ success: true });
  });
});

// Git 자동 커밋 및 푸시
function gitCommitAndPush(filePath) {
  const githubToken = process.env.GITHUB_TOKEN;
  const repoURL = 'https://github.com/CoilKorea/diablo4-blackmarket.git';
  const remoteURL = repoURL.replace('https://', `https://${githubToken}@`);
  const commitMessage = `자동 저장: ${filePath} 업데이트`;

  // ✅ .gitignore 자동 생성
  const ignorePath = path.join(__dirname, '.gitignore');
  if (!fs.existsSync(ignorePath)) {
    fs.writeFileSync(ignorePath, 'node_modules\nbuild\nCNAME\n*.log\n');
  }

  // ✅ Git 명령어
  const commands = `
    git init
    git config user.name "render-bot"
    git config user.email "render@bot.com"
    git remote remove origin || true
    git remote add origin ${remoteURL}
    git pull origin main --allow-unrelated-histories --no-edit --rebase=false || true
    git add public/${filePath}
    git commit -m "${commitMessage}" || echo "스킵: 변경 없음"
    git push origin main || echo "❌ 푸시 실패"
  `;

  exec(commands, { cwd: __dirname }, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Git 푸시 실패:', stderr);
    } else {
      console.log('✅ Git 푸시 성공:', stdout);
    }
  });
}

app.listen(PORT, () => {
  console.log(`서버가 실행 중입니다. http://localhost:${PORT}`);
});
