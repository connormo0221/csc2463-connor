function setup() {
  createCanvas(600, 500);
}

function draw() {
  background(255);
  noStroke();
  
  // red circle
  push();
  fill(255, 0, 0, 127.5);
  circle(300, 150, 250);
  pop();

  // blue circle
  push();
  fill(0, 255, 0, 127.5);
  circle(400, 300, 250);
  pop();
  
  // green circle
  push();
  fill(0, 0, 255, 127.5);
  circle(200, 300, 250);
  pop();
  
}
