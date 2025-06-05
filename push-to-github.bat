@echo off
cd /d %~dp0
echo ?? 현재 디렉토리: %cd%

echo ? 변경사항 추가 중...
git add .

echo ?? 커밋 메시지 입력:
set /p msg="> "
git commit -m "%msg%"

echo ?? GitHub로 푸시 중...
git push origin main

echo ?? 배포 요청 완료! Netlify에서 자동 반영됩니다.
pause
