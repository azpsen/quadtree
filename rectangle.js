class Rectangle {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  contains(point) {
    return point.x < this.x + this.width / 2 &&
           point.x > this.x - this.width / 2 &&
           point.y < this.y + this.height / 2 &&
           point.y > this.y - this.height / 2;
  }

  show() {
    noFill();
    stroke(255);
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
  }

}
