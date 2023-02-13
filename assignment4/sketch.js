let bugSprite;
let numberOfSquish = 0;

let bugs = [];

function preload() {
  // loading bug sprite image
  bugSprite = loadImage("assets/BugSprite2xUpscale.png");
}

function setup() {
  createCanvas(1000, 1000);
  imageMode(CENTER);
  angleMode(DEGREES);

  // manually setting framerate to prevent issues
  frameRate(60);
  
  // initializing the bugs
  for(let i = 0; i < random(15, 25); i++) {
    bugs[i] = new Bug(random(40, width - 40), random(40, width - 40), random(1, 3), random([0, 1]));
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
        bugs[i].stop(1);
      }
    }
  }
}

class Bug {
  constructor(dx, dy, speed, vert) {
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
    this.vert = vert;

    this.spriteSheet = bugSprite;
    this.spriteNum = 0;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.hasBeenSquished = false;

    if (vert == 0) {
      this.degDirection = 90;
    } else {
      this.degDirection = 180;
    }
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
    image(this.spriteSheet, 0, 0, 80, 80, this.spriteNum * 80, 0, 80, 80);
    pop();
    
    // incrementing animation frame based on # of current frame
    if (frameCount % 6 == 0) {
      this.currentFrame++;
    }

    // updating dx or dy based on amount of movement & speed multiplier
    if (this.vert == 0) {
      this.dx += this.moving * this.speed;
    } else if (this.vert == 1) {
      this.dy += this.moving * this.speed;
    }

    // set bugs to move in the opposite direction upon hitting a wall
    if (this.dx < 40) {
      this.degDirection = 90;
      this.moveRight();
    } else if (this.dx > width - 40) {
      this.degDirection = 270;
      this.moveLeft();
    } else if (this.dy < 40) {
      this.degDirection = 180;
      this.moveRight();
    } else if (this.dy > height - 40) {
      this.degDirection = 0;
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

  stop(squish) {
    // set bug to stop moving
    this.moving = 0;
    
    if (squish == 1) {
      numberOfSquish++;
      // debug: print out # of squishes to console
      print("Squish Count: " + numberOfSquish);
    }
  }

  contains(x, y) {
    // check if bug is inside x & y coordinates
    let insideX = x >= this.dx - 40 && x <= this.dx + 40;
    let insideY = y >= this.dy - 40 && y <= this.dy + 40;
    return insideX && insideY;
  }
}