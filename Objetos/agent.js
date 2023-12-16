class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.cell = this.pos.x + this.pos.y * 20
  }

  // Define o objetivo
  setGoal(goal) {
    this.goal = goal;
  }

  // Algoritmos de busca (BFS, DFS, Dijkstra, Gulosa e A*)
  search(type) {
    if (type == 'BFS') {
      print('Voce escolheu BFS');
    }
    
    if (type == 'DFS') {
      print('Voce escolheu DFS');
    }
    
    if (type == 'Dijkstra') {
      print('Voce escolheu Dijkstra');
    }
    
    if (type == 'Gulosa') {
      print('Voce escolheu Gulosa');
    }
    
    if (type == 'A*') {
      print('Voce escolheu A*');
    }
  }

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