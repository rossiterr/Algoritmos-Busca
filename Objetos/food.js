class Food {
  constructor(pos) {
    this.pos = pos;
    this.cell = this.pos.x + this.pos.y * 20
  }

  // Imagem da comida
  display() {
    fill(255, 255, 0);
    noStroke();
    ellipse(this.pos.x * 20 + 10, this.pos.y * 20 + 10, 15, 15);
  }
}