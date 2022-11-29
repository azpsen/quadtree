class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    stroke(255);
    // fill(255);
    strokeWeight(5);
    point(this.x, this.y);
  }

}
