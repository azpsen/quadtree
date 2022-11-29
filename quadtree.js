class QuadTree {

  constructor(width, height, capacity=4) {
    this.width = width; // width of canvas
    this.height = height; // height of canvas
    this.capacity = capacity; // amount of points to hold in each section

    // set center of tree
    this.x = this.width / 2;
    this.y = this.height / 2;

    // declare subdivisions
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
  }

  subdivide() {
    // initialize subdivisions 
  }

  show() {
    // visualize the quadtree with rectangles
    stroke(255);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }

}
