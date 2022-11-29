class QuadTree {

  constructor(x, y, width, height, capacity=4) {
    this.width = width; // width of quadtree area
    this.height = height; // height of quadtree area
    this.capacity = capacity; // amount of points to hold in each section
    this.subdivided = false;
    this.points = [];

    // set center of tree
    this.x = x;
    this.y = y;

    // declare subdivisions
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
  }

  contains(point) {
    return point.x < this.x + this.width / 2 &&
           point.x > this.x - this.width / 2 &&
           point.y < this.y + this.height / 2 &&
           point.y > this.y - this.height / 2;
  }

  overlapsRect(r) {
    if (r.x - r.width / 2 > this.x + this.width / 2 || r.x + r.width / 2 < this.x - this.width / 2)
      return false;

    if (r.y - r.height / 2 > this.y + this.height / 2 || r.y + r.height / 2 < this.y - this.height / 2)
      return false;

    return true;
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
    this.subdivided = true;
  }

  insert(point) {
    // only insert if point is within this node
    if (!this.contains(point))
      return;

    if (this.points.length >= capacity) {
      if (!this.subdivided) {
        // create subdivisions
        this.subdivide();
      }

      // try inserting point in each subdivision
      this.nw.insert(point);
      this.ne.insert(point);
      this.sw.insert(point);
      this.se.insert(point);
    } else {
      this.points.push(point);
    }
  }

  pointsWithinRect(r) {
    if (!this.overlapsRect(r))
      return [];

    // check this node's points for overlap
    let points = [];
    for (let p of this.points) {
      if (r.contains(p))
        points.push(p);
    }

    // check child nodes for overlap
    if (this.nw) points = points.concat(this.nw.pointsWithinRect(r));
    if (this.ne) points = points.concat(this.ne.pointsWithinRect(r));
    if (this.sw) points = points.concat(this.sw.pointsWithinRect(r));
    if (this.se) points = points.concat(this.se.pointsWithinRect(r));

    return points;
  }

  show() {
    for (let p of this.points)
      p.show();

    if (this.nw) this.nw.show();
    if (this.ne) this.ne.show();
    if (this.sw) this.sw.show();
    if (this.se) this.se.show();
  }

  visualize() {
    // visualize the quadtree with rectangles
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    if (this.nw) this.nw.visualize();
    if (this.ne) this.ne.visualize();
    if (this.sw) this.sw.visualize();
    if (this.se) this.se.visualize();
  }

}
