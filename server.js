var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//

server.listen(process.env.PORT || 5000);

app.use(express.static('public'));

io.on('connection', function (socket) {


});
