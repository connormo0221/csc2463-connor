let guySprite;
let greenSprite;
let vikingSprite;

let characters;

function preload() {
  // loading all images
  guySprite = loadImage("assets/SpelunkyGuy.png");
  greenSprite = loadImage("assets/Green.png");
  vikingSprite = loadImage("assets/Viking.png");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);

  // manually setting framerate to prevent issues
  frameRate(60);
  
  // initializing the characters
  characters = [
    new Character(guySprite, 400, 400),
    new Character(greenSprite, 100, 200),
    new Character(vikingSprite, 500, 600),
    new Character(guySprite, -30, 400),
    new Character(greenSprite, 600, 100),
    new Character(vikingSprite, 200, 700)
  ];
}

function draw() {
  background(220);
  for(i = 0; i < characters.length; i++) {
    characters[i].draw();
  }
}

function keyPressed() {
  for(i = 0; i < characters.length; i++) {
    characters[i].keyPressed();
  }
}

function keyReleased() {
  for(i = 0; i < characters.length; i++) {
    characters[i].keyReleased();
  }
}

class Character {
  constructor(spriteSheet, dx, dy) {
    this.spriteSheet = spriteSheet;
    this.dx = dx;
    this.dy = dy;

    this.sxMulti = 0;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }

  draw() {
    // set sx multiplier to switch character sprite if character is moving or to reset if not moving
    if (this.moving != 0) {
      this.sxMulti = this.currentFrame % 9;
    } else {
      this.sxMulti = 0;
    }
    
    // drawing the character
    push();
    translate(this.dx, this.dy);
    scale(this.xDirection, 1);
    image(this.spriteSheet, 0, 0, 80, 80, this.sxMulti * 80, 0, 80, 80);
    pop();
    
    // incrementing animation frame based on # of current frame
    if (frameCount % 6 == 0) {
      this.currentFrame++;
    }

    // modifying dx based on amount of movement for translate() 
    this.dx += this.moving;
  }

  keyPressed() {
    // set character to move right or left depending on key press
    if (keyCode == RIGHT_ARROW) {
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    } else if (keyCode == LEFT_ARROW) {
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }

  keyReleased() {
    // set character to stop moving if key released
    if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
      this.moving = 0;
    }
  }
}