@echo off
cd /d %~dp0
echo ?? ���� ���丮: %cd%

echo ? ������� �߰� ��...
git add .

echo ?? Ŀ�� �޽��� �Է�:
set /p msg="> "
git commit -m "%msg%"

echo ?? GitHub�� Ǫ�� ��...
git push origin main

echo ?? ���� ��û �Ϸ�! Netlify���� �ڵ� �ݿ��˴ϴ�.
pause
