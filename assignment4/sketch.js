let bugSprite;
let bugs = [];

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = {
  score: 0, 
  highScore: 0, 
  maxTime: 30, 
  elapsedTime: 0, 
  speed: 0.5,
  state: GameState.Start
};

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
  
  // initialize first round
  reset();
}

function reset() {
  // reset game state without affecting highScore or maxTime
  game.elapsedTime = 0;
  game.score = 0;
  game.speed = 0.5;

  animations = [];
  for(let i = 0; i < 30; i++) {
    bugs[i] = new Bug(random(40, height - 40), random(40, width - 40), random([0, 1]));
  }
}

function draw() {
  switch(game.state) {
    case GameState.Start:
      background(0);
      fill(255);
      textAlign(CENTER);

      // draw Game Start text
      textSize(50);
      text("Bug Squish", width / 2, height / 2);
      textSize(30);
      text("Press any key to start!", width / 2, (height / 2) + 100);
      
      break;
    case GameState.Playing:
      let currentTime = game.maxTime - game.elapsedTime;  
      background(220);
      
      // drawing the bugs
      for(let i = 0; i < bugs.length; i++) {
        bugs[i].draw();
      }

      // drawing current score
      fill(0);
      textSize(40);
      text("Score: " + ('00' + game.score).slice(-2), 90, 40);
      
      // drawing current time
      text("Time Left: " + ('00' + ceil(currentTime)).slice(-2), width - 120, 40);
      game.elapsedTime += deltaTime / 1000;
      
      // if time hits 0, set Game Over state
      if (currentTime < 0) {
        game.state = GameState.GameOver;
      }
      break
    case GameState.GameOver:
      game.highScore = max(game.score, game.highScore);
      background(0);
      fill(255);
      textAlign(CENTER);

      // draw Game Over text
      textSize(40);
      text("Game Over!", width / 2, height / 2);
      textSize(35);
      text("Score: " + ('00' + game.score).slice(-2), width / 2, (height / 2) + 70);
      text("High Score: " + ('00' + game.highScore).slice(-2), width / 2, (height / 2) + 120);
      
      break;
  }
}

function keyPressed() {
  switch(game.state) {
    case GameState.Start:
      game.state = GameState.Playing;
      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      break;
  }
}

function mousePressed() {
  if (game.state == GameState.Playing) {
    for (let i = 0; i < bugs.length; i++) {
      if (bugs[i].contains(mouseX, mouseY)) {
        if (bugs[i].moving != 0) {
          bugs[i].stop();
        }
      }
    }
  }
}

class Bug {
  constructor(dx, dy, vert) {
    this.dx = dx;
    this.dy = dy;
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
      this.dx += this.moving * game.speed;
    } else if (this.vert == 1) {
      this.dy += this.moving * game.speed;
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

  stop() {
    // set bug to stop moving
    this.moving = 0;
    ++game.score;
    game.speed += 0.2;
  }

  contains(x, y) {
    // check if bug is inside x & y coordinates
    let insideX = x >= this.dx - 40 && x <= this.dx + 40;
    let insideY = y >= this.dy - 40 && y <= this.dy + 40;
    return insideX && insideY;
  }
}