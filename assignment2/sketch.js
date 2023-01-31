let paletteBoxes;
let circleObjects;
let globalColor;

function setup() {
  createCanvas(1280, 720);
  globalColor = color('black');
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
}

function draw() {
  background(220);
  for (let i = 0; i < paletteBoxes.length; i++) {
    paletteBoxes[i].draw();
  }
}

function mousePressed() {
  for (let i = 0; i < paletteBoxes.length; i++) {
    paletteBoxes[i].mousePressed();
  }
  //console.log("globalColor:", globalColor.toString());
}

class paletteBox {
  constructor(y, color) {
    this.y = y;
    this.color = color;
  }

  draw() {
    noLoop();
    noStroke();
    fill(this.color);
    square(0, this.y, 50);
    //console.log("boxColor:", this.color.toString());
  }

  contains(x, y) {
    let insideX = x >= 0 && x <= 50;
    let insideY = y >= this.y && y <= this.y + 50;
    return insideX && insideY;
  }

  mousePressed() {
    if (this.contains(mouseX, mouseY)) {
      globalColor = this.color;
    }
  }
}