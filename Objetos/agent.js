class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.cell = this.pos.x + this.pos.y * 20
  }

  // Define o objetivo
  setGoal(goal) {
    this.goal = goal.cell;
  }
  
  // retorna a cell dado seu número
  cellPosition(n, grid) {
    let j = floor(n / 20);
    let i = n - j * 20;
    
    return grid[i][j];
  }
  
  // retorna o caminho em uma lista
  path(start, goal, cameFrom) {
  let current = goal;
  const path = [current];

  while (current !== start) {
    current = cameFrom[current];
    path.unshift(current);
  }

  return path;
}

  // Algoritmos de busca (BFS, DFS, Dijkstra, Gulosa e A*)
  search(type, graph, grid) {
    
    // BFS
    if (type == 'BFS') {      
      let founded = false;
      let start = this.cell;
      let frontier = [];
      frontier.push(start);
      
      let cameFrom = {};
      cameFrom[start] = null;
      
      while (frontier.length > 0) {
        let current = frontier.shift();
        this.cellPosition(current, grid).frontier = false;
        this.cellPosition(current, grid).reached = true;
        
        for (let neighbor of graph[current]){
          if (!(neighbor[0] in cameFrom)) {
            frontier.push(neighbor[0]);
            this.cellPosition(neighbor[0], grid).frontier = true;
            cameFrom[neighbor[0]] = current;
          }
        }
        
        if (current === this.goal) {
          founded = true;
          break;
        }
      }
      
      if (founded) {
        print('caminho encontrado!');
        return this.path(start, this.goal, cameFrom);
      } else {
        print('caminho não encontrado');
      }
    }
    
    //DFS
    if (type == 'DFS') {
      let founded = false;
      let start = this.cell;
      let frontier = [];
      frontier.push(start);
      
      let cameFrom = {};
      cameFrom[start] = null;
      
      while (frontier.length > 0) {
        let current = frontier.pop();
        this.cellPosition(current, grid).frontier = false;
        this.cellPosition(current, grid).reached = true;
        
        for (let neighbor of graph[current]){
          if (!(neighbor[0] in cameFrom)) {
            frontier.push(neighbor[0]);
            this.cellPosition(neighbor[0], grid).frontier = true;
            cameFrom[neighbor[0]] = current;
          }
        }
        
        if (current === this.goal) {
          founded = true;
          break;
        }
      }
      
      if (founded) {
        print('caminho encontrado!');
        return this.path(start, this.goal, cameFrom);
      } else {
        print('caminho não encontrado');
      }
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
  move(path) {}

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
}