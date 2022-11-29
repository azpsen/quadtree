class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = 255;
  }

  show() {
    stroke(this.color);
    strokeWeight(5);
    point(this.x, this.y);
  }

}
