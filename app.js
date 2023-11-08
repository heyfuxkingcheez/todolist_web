// express
const express = require('express');
// dotenv
const dotenv = require('dotenv').config();
// cookie-parse
const cookieParser = require('cookie-parser');
const connect = require('./models/index.js');
const todoRouter = require('./routes/todos.router.js');

const jwt = require('jsonwebtoken');
const app = express();

connect();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ./assets 경로의 파일을 아무런 가공 없이 그대로  전달해주는 미들웨어
app.use(express.static('./assets'));

app.use((req, res, next) => {
    console.log('첫 번째 미들웨어');
    next();
});
app.use((req, res, next) => {
    console.log('두 번째 미들웨어');
    next();
});
app.use((req, res, next) => {
    console.log('세 번째 미들웨어');
    next();
});

app.use((req, res, next) => {
    console.log('Request URL', req.originalUrl, '-', new Date());
    next();
});

app.use('/api', (req, res, next) => {
    console.log('네 번째 미들웨어');
    next();
});
[todoRouter]; // API가 사용되기 위한 ROUTER를 등록

// // jwt를 이용해서 암호화
// const token = jwt.sign(
//     { myPayloadData: 1234 }, //jwt를 이용해서 payload 설정하는 부분
//     'mysecretkey',
//     { expiresIn: new Date().getSeconds() + 1 }
// );
// console.log('암호화 =>', token);
// // jwt를 이용해서 비밀키 복호화
// const decodeToken = jwt.decode(token);
// console.log('복호화 =>', decodeToken);
// // 1. jwt를 이용해서 변조 데이터 검증
// // 2. 해당하는 jwt가 만료되었는지 검증
// const decodedValueVerify = jwt.verify(token, 'mysecretkey');
// console.log('검증 =>', decodedValueVerify);

// // cookie 저장
// app.post('/set-key', (req, res) => {
//     const { key } = req.body;
//     const token = jwt.sign({ key }, 'sparta');
//     console.log(token);
//     res.cookie('token', token);
//     return res.status(200).send({ message: 'cookie post success' }).end();
// });
// // cookie 불러오기
// app.get('/get-key', (req, res) => {
//     const { token } = req.cookies;
//     const { key } = jwt.decode(token);
//     console.log(key);
//     return res.status(200).json({ key });
// });

// 서버 포트연결, 실행
app.listen(process.env.DB_PORT, () => {
    console.log('server on', Number(process.env.DB_PORT));
});
