let globalColor;
let paletteBoxes;

function setup() {
  // creating canvas to window size (minus 1 for no scroll bars)
  createCanvas(windowWidth - 1, windowHeight - 1);
  
  // setting default color
  globalColor = color('black');
  
  // creating the palette
  paletteBoxes = [
    new paletteBox(0, color('red')),
    new paletteBox(50, color('orange')),
    new paletteBox(100, color('yellow')),
    new paletteBox(150, color('lime')),
    new paletteBox(200, color('cyan')),
    new paletteBox(250, color('blue')),
    new paletteBox(300, color('magenta')),
    new paletteBox(350, color('brown')),
    new paletteBox(400, color('white')),
    new paletteBox(450, color('black'))
  ];

  // drawing the background
  background(255);
}

function draw() {
  // loop to draw the palette
  for (let i = 0; i < paletteBoxes.length; i++) {
    paletteBoxes[i].draw();
  }

  // drawing lines when mouse is pressed
  if (mouseIsPressed) {
    stroke(globalColor);
    strokeWeight(20);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mousePressed() {
  // loop to check for clicks on the palette
  for (let i = 0; i < paletteBoxes.length; i++) {
    paletteBoxes[i].mousePressed();
  }
}

class paletteBox {
  // setting the height & color of the palette box
  constructor(y, color) {
    this.y = y;
    this.color = color;
  }

  // drawing an individual palette box
  draw() {
    push();
    noStroke();
    fill(this.color);
    square(0, this.y, 50);
    pop();
  }

  // checking if the mouse is inside a palette box
  contains(x, y) {
    let insideX = x >= 0 && x <= 50;
    let insideY = y >= this.y && y <= this.y + 50;
    return insideX && insideY;
  }

  // changing color if mouse is inside a palette box
  mousePressed() {
    if (this.contains(mouseX, mouseY)) {
      globalColor = this.color;
    }
  }
}