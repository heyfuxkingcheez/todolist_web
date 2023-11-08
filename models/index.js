const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connect = () => {
    mongoose
        .connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@woogi.zmmpqdy.mongodb.net/?retryWrites=true&w=majority`,
            { dbName: `${process.env.DB_NAME}` },
            {
                userNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => console.log('MongoDB 연결 성공!'))
        .catch((err) => console.log('MongoDB 연결 실패!'));
};

mongoose.connection.on('error', (err) => {
    console.error('MongoDB 연결 에러!', err);
});

mongoose.connection.on('disconnecter', () => {
    console.err('MongoDB 연결 실패, 연결을 재시도합니다.');
    connect();
});

module.exports = connect;
