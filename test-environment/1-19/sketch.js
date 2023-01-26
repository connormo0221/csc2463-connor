function setup() {
  createCanvas(600, 400);
  // can use HSB instead of RGB by calling colorMode(HSB), should be done in setup
  colorMode(HSB);
}

function draw() {
  // drawing the background -> color is RGB format by default
  background(255, 0, 50);

  // drawing the eyes
  ellipse(200, 100, 50, 50);
  ellipse(400, 105, 50, 50);

  // drawing the irises -> don't forget to stop the color fill!
  // can either set the same color or make a loop using push & pop
  push();
  // noStroke() sets no outline for shapes
  noStroke();
  fill(120, 100, 100);
  ellipse(200, 100, 20, 20);
  ellipse(400, 105, 20, 20);
  fill(0);

  ellipse(200, 100, 10, 10);
  ellipse(400, 105, 10, 10);
  pop();
  //fill(255);

  // drawing the nose
  //triangle(300, 100, 290, 200, 310, 200);

  // drawing the mouth
  push();
  fill(325, 20, 90);
  arc(300, 220, 200, 40, 0, PI, PIE);
  pop();

  // drawing the eyebrows
  push();
  // strokeWeight() sets the size of the lines, strokeCap() changes the line edge style
  // strokeJoin() is for multiple vertex shapes and does the same thing for edge intersections
  strokeWeight(10);
  strokeCap(SQUARE);
  line(175, 65, 225, 65);
  line(375, 70, 425, 65);
  pop();

  // drawing the nose with beginShape()
  beginShape();
  vertex(295, 100);
  vertex(280, 200);
  vertex(300, 205);
  vertex(320, 200);
  vertex(305, 100);
  endShape(CLOSE);
  // CLOSE tells the shape to fill the remaining borders; otherwise, you will need to specify more vertices
}
