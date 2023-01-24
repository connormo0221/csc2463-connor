function setup() {
  createCanvas(400, 200);
  // using HSB color mode
  colorMode(HSB);
}

function draw() {
  background(122, 100, 100);
  fill(255);
  strokeWeight(2);
  circle(100, 100, 175);
  square(210, 12.5, 175);
}
