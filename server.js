const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 모든 요청은 index.html 또는 기타 파일로 처리
app.get('*', (req, res) => {
  const file = req.path === '/' ? 'index.html' : req.path;
  res.sendFile(path.join(__dirname, 'public', file));
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
