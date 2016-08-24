var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');
var custom_router = require('./routes/index')
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var http = require('http');
var path = require('path');

// 디비 시작
var db = mongoose.connection;
module.exports = db;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");// CONNECTED TO MONGODB SERVER
});
mongoose.connect('mongodb://master:78156827s@ds013206.mlab.com:13206/test1');

var User = require('./models/user'); //컬렉션 정의
// 디비종료

//  파서 시작
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// 파서 종료

// 라우트 연결, 포트설정, 서버 런 메세지 관련 시작
app.use(custom_router);

var httpServer =http.createServer(app).listen(8080, function(req,res){
  console.log('Socket IO server has been started');
});
// 라우트 연결, 포트설정, 서버 런 메세지 관련 종료

// 소켓
var io = require('socket.io').listen(httpServer);


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: '당신은 소켓을 통해 연결되었습니다.' });
  socket.on('give_me', function (data) {
    console.log(data);
});
})
