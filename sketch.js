let qt;
let capacity = 4;
let w = 600;
let h = 600;
let points = [];

function setup() {
  // put setup code here
  createCanvas(w, h);
  qt = new QuadTree(w / 2, h / 2, w, h, capacity);
  //
  // for (let i = 0; i < 10; i++) {
  //   let p = new Point(random(0, w), random(0, h));
  //   qt.insert(p);
  // }
}

function mousePressed() {
  stroke(255);
  fill(255);
  point(mouseX, mouseY);
  qt.insert(new Point(mouseX, mouseY));
}

function draw() {
  // put drawing code here

  background(0);
  qt.show();
  qt.visualize();
}
