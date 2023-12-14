class Food {
  constructor(pos) {
    this.pos = pos;
  }

  // Imagem da comida
  display() {
    fill(255, 255, 0);
    noStroke();
    ellipse(this.pos.x * 20 + 10, this.pos.y * 20 + 10, 15, 15);
  }
}