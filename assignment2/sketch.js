let globalColor;
let paletteBoxes;
let paintObjects;

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
  paintObjects = [];
}

function draw() {
  background(255);
  for (let i = 0; i < paletteBoxes.length; i++) {
    paletteBoxes[i].draw();
  }
  for (let i = 0; i < paintObjects.length; i++) {
    paintObjects[i].draw();
  }
}

function mousePressed() {
  for (let i = 0; i < paletteBoxes.length; i++) {
    paletteBoxes[i].mousePressed();
  }
  if (paintObjects.length == 0) {
    paintObjects.push(new paintObject(mouseX, mouseY));
  }
  for (let i = 0; i < paintObjects.length; i++) {
    paintObjects[i].mousePressed();
  }
  //console.log("globalColor:", globalColor.toString());
}

function mouseReleased() {
  for (let i = 0; i < paintObjects.length; i++) {
    paintObjects[i].mouseReleased();
  }
}

function mouseDragged() {
  for (let i = 0; i < paintObjects.length; i++) {
    paintObjects[i].mouseDragged();
  }
}

class paletteBox {
  constructor(y, color) {
    this.y = y;
    this.color = color;
  }

  draw() {
    push();
    noStroke();
    fill(this.color);
    square(0, this.y, 50);
    pop();
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

class paintObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.dragging = false;
    this.dragStartX = -1;
    this.dragStartY = -1;
    this.characterStartX = -1;
    this.characterStartY = -1;
  }

  draw() {
    noStroke();
    fill(globalColor);
    circle(this.x, this.y, 20);
  }

  mousePressed() {
    let inside = dist(mouseX, mouseY, this.x, this.y) <= 10;
    if (inside) {
      this.dragging = true;
      this.dragStartX = mouseX;
      this.dragStartY = mouseY;
      this.characterStartX = this.x;
      this.characterStartY = this.y;
    }
  }

  mouseDragged() {
    if (this.dragging) {
      this.x = this.characterStartX + (mouseX - this.dragStartX);
      this.y = this.characterStartY + (mouseY - this.dragStartY);
      paintObjects.push(new paintObject(this.x, this.y));
    }
  }

  mouseReleased() {
    if (this.dragging) {
      this.dragging = false;
    }
  }
}