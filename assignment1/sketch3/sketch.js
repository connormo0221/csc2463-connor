function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(0);
  noStroke();
  
  // drawing pacman
  push();
  fill(255, 255, 0);
  arc(100, 100, 150, 150, PI + QUARTER_PI, -QUARTER_PI - PI);
  pop();

  // drawing body of ghost
  push();
  fill(255, 0, 0);
  arc(300, 100, 150, 150, -PI, 0);
  rect(225, 100, 150, 75);
  pop();

  // drawing eyes
  push();
  fill(255);
  circle(265, 100, 50);
  circle(335, 100, 50);
  pop;

  // drawing pupils
  push();
  fill(0, 0, 255);
  circle(265, 100, 30);
  circle(335, 100, 30);
  pop;
}
