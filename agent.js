class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.speed = 1;
  }

  // Define o objetivo
  setGoal(goal) {
    this.goal = goal;
  }

  // Algoritmos de busca (BFS, DFS, Dijkstra, Gulosa e A*)
  search() {}

  // Movimentação do agente
  move() {}

  // Checa se o agente chegou até a comida
  eats(food) {
    let d = dist(this.pos.x, this.pos.y, food.pos.x, food.pos.y);
    return d == 0;
  }

  // Imagem do agente
  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x * 20 + 10, this.pos.y * 20 + 10, 15, 15);
  }

  // retorna o caminho
  getPath() {
    return this.path;
  }
}