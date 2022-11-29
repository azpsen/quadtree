class Circle {

  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
  }

  contains(point) {
    return dist(this.x, this.y, point.x, point.y) < this.radius;
  }

  show() {
    noFill();
    stroke(255);
    strokeWeight(1);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}
