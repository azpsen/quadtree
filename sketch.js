let qt;
let capacity = 4;
let w = 600;
let h = 600;

function setup() {
  // put setup code here
  createCanvas(w, h);
  qt = new QuadTree(w, h, capacity);
}

function draw() {
  // put drawing code here
  background(0);
  qt.show();
}
