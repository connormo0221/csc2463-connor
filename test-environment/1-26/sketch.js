let characters;

function setup() {
  createCanvas(400, 400);

  characters = [
    new Character(100, 100, 50),
    new Character(300, 300, 80),
    new Character(100,300,100)
  ];
}

// making the character
function draw() {
  background(220);

  // moves character if arrows are pressed, code doesn't work
  //if (keyIsDown(LEFT_ARROW)) {
  //  x -= 1;
  //}
  //else if (keyIsDown(RIGHT_ARROW)) {
  //  x += 1;
  //}
  for ( let i = 0; i < characters.length; i++) {
    characters[i].draw();
  }
}

// check if character is being clicked on
function mousePressed() {
  for ( let i = 0; i < characters.length; i++) {
    characters[i].mousePressed();
  }
}

// reset state after mouse is released
function mouseReleased() {
  for ( let i = 0; i < characters.length; i++) {
    characters[i].mouseReleased();
  }
}


// moving character using mouse
function mouseDragged() {
  for ( let i = 0; i < characters.length; i++) {
    characters[i].mouseDragged();
  }
}

class Character {
  // need constructor when making a class
  constructor(x, y, size) {
    // creating variables
    this.x = x;
    this.y = y;
    this.size = size;
    
    // creating dragging related variables
    this.dragging = false;
    this.dragStartX = -1;
    this.dragStartY = -1;
    this.characterStartX = -1;
    this.characterStartY = -1;
  }

  // drawing the character
  draw() {
    fill(255);
    square(this.x, this.y, this.size);
    fill(0);
    circle(this.x + 10, this.y + 10, 10);
    circle(this.x + this.size - 10, this.y + 10, 10);
    stroke(0);
    line(this.x + this.size / 4, this.y + this.size - 15, this.x + this.size - this.size / 4, this.y + this.size - 15);
  }

  // check if mouse cursor is in character
  contains(x, y) {
    // check between l & r of point, defines a boolean
    let insideX = x >= this.x && x <= this.x + this.size;
    let insideY = y >= this.y && y <= this.y + this.size;
    return insideX && insideY;

    // square version inside
    //let inside = insideX && insideY;
    
    // circle version
    //let d = dist(mouseX, mouseY, x, y);
    //inside = d <= size / 2;
  }

  // check if character is being clicked on
  mousePressed() {
    let inside = this.contains(mouseX, mouseY);
    
    if (inside) {
      this.dragging = true;
      this.dragStartX = mouseX;
      this.dragStartY = mouseY;
      this.characterStartX = this.x;
      this.characterStartY = this.y;
    }
  }

  // reset state after mouse is released
  mouseReleased() {
    if (this.dragging) {
      this.dragging = false;
    }
  }

  // moving character using mouse
  mouseDragged() {
    // char moves to mouse position
    //this.x = mouseX;
    //this.y = mouseY;
    
    // char moves independently of cursor position
    //this.x += mouseX - pmouseX;
    //this.y += mouseY - pmouseY;
  
    // char moves if clicked on only
    //if (dragging) {
    //  this.x += mouseX - pmouseX;
    //  this.y += mouseY - pmouseY;
    //}
  
    // char moves if clicked on, more accurate
    if (this.dragging) {
      this.x = this.characterStartX + (mouseX - this.dragStartX);
      this.y = this.characterStartY + (mouseY - this.dragStartY);
    }
  }
}