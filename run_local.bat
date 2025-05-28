@echo off
SET "CURRENT_DIR=%~dp0"
CD /D "%CURRENT_DIR%client"

echo 필요한 패키지를 설치합니다...
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo npm install 중 오류 발생!
    pause
    exit /b %ERRORLEVEL%
)

echo 클라이언트 애플리케이션을 빌드합니다...
npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo 클라이언트 빌드 중 오류 발생!
    pause
    exit /b %ERRORLEVEL%
)

echo 통합 Node.js 서버를 시작합니다...
npm start
IF %ERRORLEVEL% NEQ 0 (
    echo 서버 실행 중 오류 발생!
    pause
    exit /b %ERRORLEVEL%
)

pause 