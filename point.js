class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.selected = false;
  }

  show() {
    if (this.selected) {
      stroke(0, 255, 0);
      this.selected = false;
    } else {
      stroke(255);
    }
    strokeWeight(5);
    point(this.x, this.y);
  }

}
