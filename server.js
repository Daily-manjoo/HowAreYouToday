const express = require("express");
const path = require("path");

const app = express();
const port = 5050;

const staticPath = path.join(__dirname);

// 정적 파일 제공 설정
app.use(express.static(staticPath));

// login.html 라우트
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// index.html 라우트
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
