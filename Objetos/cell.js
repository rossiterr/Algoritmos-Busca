class Cell {
  constructor(i, j, terrainType) {
    this.i = i;
    this.j = j;
    this.terrainType = terrainType;
    this.opacidade = 100
  }

  // Imagem do piso
  display() {
    let x = this.i * 20;
    let y = this.j * 20;
    stroke(0);
    strokeWeight(1);
    noFill();

    // Determina a cor do piso com base em sua característica
    if (this.terrainType === 0) {
      fill(102,102,102); // Obstáculo
    } else if (this.terrainType === 1) {
      fill(51, 204, 102, this.opacidade); // Grama
    } else if (this.terrainType === 2) {
      fill(153, 102, 51, this.opacidade); // Lama
    } else if (this.terrainType === 3) {
      fill(104, 188, 255, this.opacidade); // Água
    }

    rect(x, y, 20, 20);
  }
}