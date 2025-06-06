const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일만 서빙
app.use(express.static(path.join(__dirname, 'public')));

// 루트 접근 시 index.html로 이동
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 기타 잘못된 접근도 정적으로 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', req.path));
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
