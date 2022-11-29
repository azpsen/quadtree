let qt; // quadtree
let capacity = 4; // quadtree capacity
let r; // rectangle for quadtree area search
let rw = 200; // rectangle width
let rh = 200; // rectangle height
let w = 600; // canvas width
let h = 600; // canvas height
let points = []; // points in search area

function setup() {
  createCanvas(w, h);

  // initialize quadtree
  qt = new QuadTree(w / 2, h / 2, w, h, capacity);

  generatePoints(1000);

  // initialize quadtree area search rectangle
  r = new Rectangle(mouseX, mouseY, rw, rh);
}

function generatePoints(n) {
  // add random points
  for (let i = 0; i < n; i++) {
    let p = new Point(randomGaussian(w / 2, w / 6), randomGaussian(h / 2, h / 6));
    qt.insert(p);
  }
}

function mousePressed() {
  // insert new points into quadtree on mouse press
  stroke(255);
  fill(255);
  point(mouseX, mouseY);
  qt.insert(new Point(mouseX, mouseY));
}

function draw() {
  background(0);

  qt.show();
  qt.visualize();

  r.x = mouseX;
  r.y = mouseY;
  r.show();
  
  points = qt.pointsWithinRect(r);
  for (let p of points) {
    strokeWeight(4);
    stroke(0, 255, 0);
    point(p.x, p.y);
  }
}
