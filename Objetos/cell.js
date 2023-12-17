class Cell {
  constructor(i, j, terrainType) {
    this.i = i;
    this.j = j;
    this.terrainType = terrainType;
    this.opacidade = 120;
    this.reached = false;
    this.frontier = false;
    
    if (this.terrainType === 1) {
      this.cost = 1; // Grama
    } else if (this.terrainType === 2) {
      this.cost = 5; // Lama
    } else if (this.terrainType === 3) {
      this.cost = 10; // Água
    }
  }

  // Imagem do piso
  display() {
    let x = this.i * 20;
    let y = this.j * 20;
    stroke(0);
    strokeWeight(1);
    noFill();
    
    if(this.reached === true) {
      this.opacidade = 255;
    } else {
      this.opacidade = 120;
    }
    
    if(this.frontier === true) {
      stroke (0, 0, 255);
      strokeWeight(3);
    }
    
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