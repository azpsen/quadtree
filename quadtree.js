class QuadTree {

  constructor(x, y, width, height, capacity=4) {
    this.width = width; // width of quadtree area
    this.height = height; // height of quadtree area
    this.capacity = capacity; // amount of points to hold in each section

    // set center of tree
    this.x = x;
    this.y = y;

    // declare subdivisions
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
  }

  subdivide() {
    // initialize subdivisions
    this.nw = new QuadTree(this.x - this.width / 4, this.y - this.height / 4,
                           this.width / 2, this.height / 2, this.capacity);
    this.ne = new QuadTree(this.x + this.width / 4, this.y - this.height / 4,
                           this.width / 2, this.height / 2, this.capacity);
    this.sw = new QuadTree(this.x - this.width / 4, this.y + this.height / 4,
                           this.width / 2, this.height / 2, this.capacity);
    this.se = new QuadTree(this.x + this.width / 4, this.y + this.height / 4,
                           this.width / 2, this.height / 2, this.capacity);
  }

  show() {
    // visualize the quadtree with rectangles
    stroke(255);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    if (this.nw) this.nw.show();
    if (this.ne) this.ne.show();
    if (this.sw) this.sw.show();
    if (this.se) this.se.show();
  }

}
