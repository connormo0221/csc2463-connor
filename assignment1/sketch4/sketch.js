function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 0, 127.5);
  stroke(255);
  strokeWeight(5);

  // drawing circle
  push();
  fill(0, 127.5, 0);
  circle(200, 200, 200);
  pop();

  // drawing star
  push();
  fill(255, 0, 0);
  beginShape();
  vertex(100, 175);
  vertex(175, 175);
  vertex(200, 100);
  vertex(225, 175);
  vertex(300, 175);
  vertex(240, 215);
  vertex(260, 280);
  vertex(200, 240);
  vertex(140, 280);
  vertex(160, 215);
  endShape(CLOSE);
  pop();
}
