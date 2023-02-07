let guySprite;
let greenSprite;
let vikingSprite;

let guyWalk;
let greenWalk;
let vikingWalk;

function preload() {
  guySprite = loadImage("assets/SpelunkyGuy.png");
  greenSprite = loadImage("assets/Green.png");
  vikingSprite = loadImage("assets/Viking.png");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);

  guyWalk = new WalkingAnimation(guySprite, 80, 80, 200, 200, 9);
  greenWalk = new WalkingAnimation(greenSprite, 80, 80, 100, 300, 9);
  vikingWalk = new WalkingAnimation(vikingSprite, 80, 80, 50, 100, 9);
}

function draw() {
  background(220);

  guyWalk.draw();
  greenWalk.draw();
  vikingWalk.draw();
}

function keyPressed() {
  guyWalk.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  greenWalk.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  vikingWalk.keyPressed(RIGHT_ARROW, LEFT_ARROW);
}

function keyReleased() {
  guyWalk.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  greenWalk.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  vikingWalk.keyReleased(RIGHT_ARROW, LEFT_ARROW);
}

class WalkingAnimation {
  constructor(spriteSheet, sw, sh, dx, dy, animationLength, offsetX = 0, offsetY = 0) {
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  draw() {
    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
    push();
    translate(this.dx, this.dy);
    scale(this.xDirection, 1);
  
    image(this.spriteSheet, 0, 0, this.sw, this.sh, this.u * this.sw + this.offsetX, this.v * this.sh + this.offsetY, this.sw, this.sh);
    pop();
    if (frameCount % 6 == 0) {
      this.currentFrame++;
    }
  
    this.dx += this.moving;
  }

  keyPressed(right, left) {
    if (keyCode == right) {
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    } else if (keyCode == left) {
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }

  keyReleased(right, left) {
    if (keyCode == right || keyCode == left) {
      this.moving = 0;
    }
  }
}
