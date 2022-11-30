let qt; // quadtree
let capacity = 4; // quadtree capacity

let r; // square for quadtree area search
let rw = 200; // square starting width and height

let c; // circle for quadtree area search
let cr = 100; // circle starting radius

let w = 600; // canvas width
let h = 600; // canvas height

let points = []; // points in search area

let shape = ""; // type of search (c = circle, r = rectangle, p = nearest point)


// User Interface //

let infoLabel;

let fpsToggle;
let showFPS = false;
let frameCount = 0;
let fps = 0;

let clearButton;

let capacityLabel;
let capacitySlider;
let capacityCountLabel;
let rebuildButton;

let pointNumInput;
let generateButton;

let visualizeToggle;
let visualize = true;

let searchSelectLabel;
let searchSelect;

let rectSizeLabel;
let rectSizeSlider;
let rectSizeSliderLabel;

let circleSizeLabel;
let circleSizeSlider;
let circleSizeSliderLabel;

let pointsNearLabel;
let pointsNearSlider;
let pointsNearSliderLabel;
let pointsNearCheck;
let drawPointsLine = true;


function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent("sketch");

  // initialize quadtree
  qt = new QuadTree(w / 2, h / 2, w, h, capacity);

  // generatePoints(2000);

  // initialize quadtree area search rectangle
  r = new Rectangle(mouseX, mouseY, rw, rw);

  // initialize quadtree area search circle
  c = new Circle(mouseX, mouseY, cr);

  createUI();
}

function createUI() {

  infoLabel = createSpan("Click to add points");
  infoLabel.parent("controls");

  let p = createP();
  p.parent("controls");

  clearButton = createButton("Clear Tree");
  clearButton.parent("controls");
  clearButton.mousePressed(clearTree);

  p = createP();
  p.parent("controls");

  capacityLabel = createSpan("Node Capacity ");
  capacityLabel.parent("controls");

  capacitySlider = createSlider(1, 50, 4);
  capacitySlider.parent("controls");

  capacityCountLabel = createSpan("4");
  capacityCountLabel.parent("controls");

  rebuildButton = createButton("Rebuild Tree");
  rebuildButton.parent("controls");
  rebuildButton.mousePressed(rebuildTree);

  p = createP();
  p.parent("controls");

  pointNumInput = createInput(1000, "number");
  pointNumInput.parent("controls");

  generateButton = createButton("Generate Random Points");
  generateButton.parent("controls");
  generateButton.mousePressed(generatePoints);

  p = createP();
  p.parent("controls");

  visualizeToggle = createCheckbox("Visualize QuadTree", true);
  visualizeToggle.parent("controls");
  visualizeToggle.changed(toggleVis);

  p = createP();
  p.parent("controls");

  let fpsToggle = createCheckbox("Show FPS", false);
  fpsToggle.parent("controls");
  fpsToggle.changed(fpsChanged);

  p = createP();
  p.parent("controls");

  searchSelectLabel = createSpan("Find ");
  searchSelectLabel.parent("controls");

  searchSelect = createSelect();
  searchSelect.parent("controls");
  searchSelect.option("None");
  searchSelect.option("Points Within Square");
  searchSelect.option("Points Within Circle");
  searchSelect.option("Nearest Points");
  searchSelect.changed(searchSelectChanged);

  p = createP();
  p.parent("controls");

  rectSizeLabel = createSpan("Square Size ");
  rectSizeLabel.parent("square-settings");
  rectSizeSlider = createSlider(10, 300, rw);
  rectSizeSlider.parent("square-settings");
  rectSizeSliderLabel = createSpan(rw);
  rectSizeSliderLabel.parent("square-settings");

  circleSizeLabel = createSpan("Circle Radius ");
  circleSizeLabel.parent("circle-settings");
  circleSizeSlider = createSlider(10, 300, cr);
  circleSizeSlider.parent("circle-settings");
  circleSizeSliderLabel = createSpan(rw);
  circleSizeSliderLabel.parent("circle-settings");

  pointsNearLabel = createSpan("Number of Nearest Points ");
  pointsNearLabel.parent("point-settings");
  pointsNearSlider = createSlider(1, 10, 3);
  pointsNearSlider.parent("point-settings");
  pointsNearSliderLabel = createSpan(3);
  pointsNearSliderLabel.parent("point-settings");

  p = createP();
  p.parent("point-settings");

  pointsNearCheck = createCheckbox("Draw Lines to Points", drawPointsLine);
  pointsNearCheck.parent("point-settings");
  pointsNearCheck.changed(drawPointsLines);
}

function fpsChanged() {
  showFPS = !showFPS;
}

function generatePoints() {
  let n = pointNumInput.value();
  let pointArray = [];

  // add random points
  for (let i = 0; i < n; i++) {
    let p = new Point(randomGaussian(w / 2, w / 6), randomGaussian(h / 2, h / 6));
    pointArray.push(p);
  }

  // build quadtree from random points
  qt.build(pointArray);
}

function clearTree() {
  qt.clearTree();
  qt.capacity = capacitySlider.value();
}

function rebuildTree() {
  let pts = qt.toArray();
  qt.clearTree();
  qt.capacity = capacitySlider.value();
  qt.build(pts);
}

function toggleVis() {
  visualize = !visualize;
}

function drawPointsLines() {
  drawPointsLine = !drawPointsLine;
}

function searchSelectChanged() {
  let sq = select("#square-settings");
  let ci = select("#circle-settings");
  let po = select("#point-settings");
  switch(searchSelect.value()) {
    case "Points Within Square":
      shape = "r";
      sq.style("display", "block");
      ci.style("display", "none");
      po.style("display", "none");
      break;
    case "Points Within Circle":
      shape = "c";
      ci.style("display", "block");
      sq.style("display", "none");
      po.style("display", "none");
      break;
    case "Nearest Points":
      shape = "p";
      po.style("display", "block");
      ci.style("display", "none");
      sq.style("display", "none");
      break;
    case "None":
      shape = "";
      sq.style("display", "none");
      ci.style("display", "none");
      po.style("display", "none");
      break;
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

  if (frameCount == 5) {
    fps = int(frameRate());
    frameCount = 0;
  }
  frameCount++;

  capacityCountLabel.html(" " + capacitySlider.value() + " ");

  rectSizeSliderLabel.html(" " + rectSizeSlider.value() + " ");
  r.width = rectSizeSlider.value();
  r.height = r.width;

  circleSizeSliderLabel.html(" " + circleSizeSlider.value() + " ");
  c.radius = circleSizeSlider.value();

  pointsNearSliderLabel.html(" " + pointsNearSlider.value() + " ");

  qt.show();
  if (visualize)
    qt.visualize();

  if (showFPS) {
    strokeWeight(1);
    fill(255, 255, 0);
    textSize(24);
    textAlign(LEFT, TOP);
    text("FPS: " + fps, 10, 10);
  }

  if (shape == "r") {
    // draw and search within rectangle
    r.x = mouseX;
    r.y = mouseY;
    r.show();

    points = qt.pointsWithinRect(r);
  } else if (shape == "c") {
    // draw and search within circle
    c.x = mouseX;
    c.y = mouseY;
    c.show();

    points = qt.pointsWithinCircle(c);
  } else if (shape == "p") {
    // search for nearest points
    points = qt.nearestPointsXY(mouseX, mouseY, pointsNearSlider.value());
  }

  for (let p of points) {
    if (p == null) continue;
    p.selected = true;

    // draw point green
    // strokeWeight(4);
    // stroke(0, 255, 0);
    // point(p.x, p.y);

    // draw lines to nearest points
    if (shape == "p" && drawPointsLine) {
      stroke(0, 255, 255)
      strokeWeight(1);
      line(mouseX, mouseY, p.x, p.y);
    }
  }
}
