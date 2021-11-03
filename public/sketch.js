var socket;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  socket = io.connect('http://localhost:3000');
  socket.on('mouse',
  function(data){
    console.log("Received: " + data.x + " " + data.y);
    fill(255, 0, 0);
    noStroke();
    ellipse(data.x, data.y, 10, 10);
  });
}

function mouseDragged(){
  fill(0, 0, 255);
  noStroke();
  ellipse(mouseX, mouseY, 10, 10);
  sendMouse(mouseX, mouseY);
}

function sendMouse(mx, my){
  console.log("Send: " + mx + " " + my);
  var data = {
    x : mx,
    y : my
  };
  socket.emit('mouse', data);
}