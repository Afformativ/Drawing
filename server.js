console.log("My socket server is running");
var express = require('express');
var app = express();
var server = app.listen(3000);
function listen(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening at http://" + host + ":" + port);
}
app.use(express.static('public'));

var io = require("socket.io")(server);

io.sockets.on("connection", function(socket){
  console.log("New client: " + socket.id);
  socket.on('mouse', function(data){
    console.log("Received: " + data.x + " " + data.y);
    socket.broadcast.emit('mouse', data);
  });
  socket.on('disconnect', function(){
    console.log("Client disconnected: " + socket.id);
  })
})