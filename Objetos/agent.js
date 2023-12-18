class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.cell = this.pos.x + this.pos.y * 20
    this.pathIndex = 0;
    this.speed = 0.1;
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
  
  coordenadasDoGrid(n){
    let i = n % 20; // Coluna
    let j = Math.floor(n / 20); // Linha
    return createVector(i,j);
  }


  cellCords(n) {
    let j = floor(n/20);
    let i = n - j * 20;
    return createVector(i * 20 + 10, j * 20 + 10);
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
  heuristic(goal, next) {
    // Supondo que goal e next são objetos com propriedades x e y
    return (Math.abs(goal.x - next.x) + Math.abs(goal.y - next.y))/20;
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
    
    if (type == 'Custo Uniforme') {
      let frontier = new PriorityQueue();
      frontier.put(this.cell, 0);
    
      let noOrigem = {};
      let custoAteAgora = {};
      noOrigem[this.cell] = null;
      custoAteAgora[this.cell] = 0;
    
      while (!frontier.empty()) {
        let current = frontier.get();
        this.cellPosition(current, grid).frontier = false;
        this.cellPosition(current, grid).reached = true;
    
        for (let neighbor of graph[current]) {
          let newCost = custoAteAgora[current] + neighbor[1];
          if (!(neighbor[0] in custoAteAgora) || newCost < custoAteAgora[neighbor[0]]) {
            custoAteAgora[neighbor[0]] = newCost;
            let priority = newCost;
            frontier.put(neighbor[0], priority);
            this.cellPosition(neighbor[0], grid).frontier = true;
            noOrigem[neighbor[0]] = current;
          }
        }
    
        if (current == this.goal) {
          print('Caminho encontrado');
          return this.path(this.cell, this.goal, noOrigem);
        }
    }
    print('Caminho não encontrado');
    }
    
    if (type == 'Gulosa') {
      let frontier = new PriorityQueue();
      frontier.put(this.cell, 0);

      let noOrigem = {};
      noOrigem[this.cell] = null;

      while (!frontier.empty()) {
        let current = frontier.get();
        this.cellPosition(current, grid).frontier = false;
        this.cellPosition(current, grid).reached = true;

        if (current == this.goal) {
          print('Caminho encontrado');
          return this.path(this.cell, this.goal, noOrigem);
        }

        for (let neighbor of graph[current]) {
          if (!(neighbor[0] in noOrigem)) {
            let priority = this.heuristic(this.cellCords(this.goal), this.cellCords(neighbor[0]));
            frontier.put(neighbor[0], priority);
            this.cellPosition(neighbor[0], grid).frontier = true;
            noOrigem[neighbor[0]] = current;
          }
        }
      }
      print('Caminho não encontrado');   
    }
    
    if (type == 'A*') {
      let frontier = new PriorityQueue();
      frontier.put(this.cell, 0);

      let noOrigem = {};
      let custoAteAgora = {};
      noOrigem[this.cell] = null;
      custoAteAgora[this.cell] = 0;

      while (!frontier.empty()) {
        let current = frontier.get();
        this.cellPosition(current, grid).frontier = false;
        this.cellPosition(current, grid).reached = true;

        if (current == this.goal) {
          print('Caminho encontrado');
          print(noOrigem)
          return this.path(this.cell, this.goal, noOrigem);
        }

        for (let neighbor of graph[current]) {
          let newCost = custoAteAgora[current] + neighbor[1];
          if (!(neighbor[0] in custoAteAgora) || newCost < custoAteAgora[neighbor[0]]) {
            custoAteAgora[neighbor[0]] = newCost;
            let priority = newCost + this.heuristic(this.cellCords(this.goal), this.cellCords(neighbor[0]));
            frontier.put(neighbor[0], priority);
            this.cellPosition(neighbor[0], grid).frontier = true;
            noOrigem[neighbor[0]] = current;
          }
        }
      }
      print('Caminho não encontrado');
    }
  }




  // Movimentação do agente
  move(path) {
    // Verifica se ainda há elementos no array 'path'
    if (path.length > 0) {
      // Obtém a próxima posição no caminho
      let nextPosition = this.coordenadasDoGrid(path[0]);
      print(path[0]);
      print(nextPosition);
      // Move o agente para a próxima posição
      this.pos.x = nextPosition.x;
      this.pos.y = nextPosition.y;

      // Remove a posição atual do caminho
      path.shift();
    }
  }

  // Checa se o agente chegou até a comida
  eats(food) {
    let d = dist(this.pos.x, this.pos.y, (food!==null)?food.pos.x:this.pos.x, (food!==null)?food.pos.y:this.pos.y);
    return d == 0;
  }

  // Imagem do agente
  display() {
    fill(255, 0, 0); //vermelho
    noStroke();
    ellipse(this.pos.x * 20 + 10, this.pos.y * 20 + 10, 15, 15);
  }
}