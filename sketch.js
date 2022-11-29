let qt; // quadtree
let capacity = 4; // quadtree capacity

let r; // rectangle for quadtree area search
let rw = 200; // rectangle width
let rh = 200; // rectangle height

let c; // circle for quadtree area search
let cr = 100; // circle radius

let w = 600; // canvas width
let h = 600; // canvas height

let points = []; // points in search area

let shape = "c"; // type of shape to search with

function setup() {
  createCanvas(w, h);

  // initialize quadtree
  qt = new QuadTree(w / 2, h / 2, w, h, capacity);

  generatePoints(2000);

  // initialize quadtree area search rectangle
  r = new Rectangle(mouseX, mouseY, rw, rh);

  // initialize quadtree area search circle
  c = new Circle(mouseX, mouseY, cr);
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

  if (shape == "r") {
    r.x = mouseX;
    r.y = mouseY;
    r.show();

    points = qt.pointsWithinRect(r);
  } else if (shape == "c") {
    c.x = mouseX;
    c.y = mouseY;
    c.show();

    points = qt.pointsWithinCircle(c);
  }

  for (let p of points) {
    strokeWeight(4);
    stroke(0, 255, 0);
    point(p.x, p.y);
  }
}
