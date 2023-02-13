let bugSprite;
let numberOfBugs = 15;
let numberOfSquish = 0;

let bugs = [];

function preload() {
  // loading bug sprite image
  bugSprite = loadImage("assets/bugsprite.png");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  angleMode(DEGREES);

  // manually setting framerate to prevent issues
  frameRate(60);
  
  // initializing the bugs
  for(let i = 0; i < numberOfBugs; i++) {
    bugs[i] = new Bug(random(100, 700), random(100, 700), random(0.5, 2));
  }
}

function draw() {
  background(220);
  for(let i = 0; i < bugs.length; i++) {
    bugs[i].draw();
  }
}

function mousePressed() {
  for (let i = 0; i < bugs.length; i++) {
    if (bugs[i].contains(mouseX, mouseY)) {
      if (bugs[i].moving != 0) {
        bugs[i].stop();
      }
    }
  }
}

class Bug {
  constructor(dx, dy, speed) {
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;

    this.spriteSheet = bugSprite;
    this.spriteNum = 0;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.degDirection = 90;
    this.hasBeenSquished = false;
  }

  draw() {
    // change sprite state each frame if bug is moving, otherwise display death sprites
    if (this.moving != 0) {
      this.spriteNum = this.currentFrame % 8;
    } else {
      if (mouseIsPressed & this.hasBeenSquished == false) {
        this.spriteNum = 8;
      } else {
        this.hasBeenSquished = true;
        this.spriteNum = 9;
      }
    }
    
    // drawing the bug
    push();
    translate(this.dx, this.dy);
    rotate(this.degDirection);
    scale(this.xDirection, 1);
    image(this.spriteSheet, 0, 0, 40, 40, this.spriteNum * 40, 0, 40, 40);
    pop();
    
    // incrementing animation frame based on # of current frame
    if (frameCount % 6 == 0) {
      this.currentFrame++;
    }

    // modifying dx based on amount of movement for translate() & speed multiplier
    this.dx += this.moving * this.speed;

    // set bugs to move in the opposite direction upon hitting a wall
    if (this.dx < 20) {
      this.degDirection = 90;
      this.moveRight();
    } else if (this.dx > width - 20) {
      this.degDirection = 270;
      this.moveLeft();
    }
  }

  moveRight() {
    // set bug to move right
    this.moving = 1;
    this.xDirection = 1;
  }

  moveLeft() {
    // set bug to move left
    this.moving = -1;
    this.xDirection = -1;
  }

  stop() {
    // set bug to stop moving
    this.moving = 0;
    numberOfSquish++;

    // debug: print out # of squishes to console
    print("Squish Count: " + numberOfSquish);
  }

  contains(x, y) {
    // check if bug is inside x & y coordinates
    let insideX = x >= this.dx - 20 && x <= this.dx + 20;
    let insideY = y >= this.dy - 20 && y <= this.dy + 20;
    return insideX && insideY;
  }
}