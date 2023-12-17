let cols, rows;
let grid = [];
let grafo;
let agent;
let food;
let path;
let pathIndex = 0;
let noiseOffsetX = 0;
let noiseOffsetY = 0;

function setup() {
  createCanvas(400, 400);
  cols = width / 20;
  rows = height / 20;

  // Passo 1: Gera o mapa aleatório e a matriz de adjacência
  generateMap();
  grafo = createGraph();

  // Passo 2: O usuário escolhe qual tipo de busca será executada
  selector = new Selector();
  
  // Passo 3: Agente aparece em uma posição aleatória
  agent = placeAgente();

  // Passo 4: Comida aparece em uma posição aleatória
  placeFood();

  // Passo 5: Agente percebe a comida
  agent.setGoal(food);

  // Passo 6.1: Gera o botão para o gente iniciar a busca
  startButton = createButton('Iniciar Busca');
  
  // Definição do frame rate
  frameRate(5);
}

function draw() {
  background(255);

  // Desenha o ambiente
  drawGrid();
  
  // Passo 6.2: Agente inicia a busca
  startButton.mousePressed(() => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].reached = false;
        grid[i][j].frontier = false;
      }
    }
    
    path = agent.search(selector.dropdown.value(), grafo, grid);
  });
  
  // Passo 7: O agente recebe e desenha o caminho 
  if (path !== undefined){
    drawPath(path);
  }
  
  // Passo 8: Agente se desloca em direção à comida
  agent.move(path);

  // Passo 9: Colisão entre agente e comida
  if (agent.eats(food)) {
    food = null;
  }

  // Desenha agente e comida
  agent.display();
  food.display();
}

// Desenha o grid
function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].display();
    }
  }
}

/*


A PARTIR DAQUI ESTÃO AS FUNÇÕES RELACIONADAS AO GRID


*/

// Cria o grid com os terrenos escolhidos com base em perlin noise
function generateMap() {
  let terrainScale = 0.2;
  let obstacleThreshold = 0.3;
  let mudThreshold = 0.4;
  let grassThreshold = 0.6;

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      let noiseValue = noise(noiseOffsetX + i * terrainScale, noiseOffsetY + j * terrainScale);

      let terrainType;

      if (noiseValue < obstacleThreshold) {
        terrainType = 0; // Obstáculo
      } else if (noiseValue < mudThreshold) {
        terrainType = 1; // Areia
      } else if (noiseValue < grassThreshold) {
        terrainType = 2; // Atoleiro
      } else {
        terrainType = 3; // Água
      }

      grid[i][j] = new Cell(i, j, terrainType);
    }
  }

  noiseOffsetX += 0.01;
  noiseOffsetY += 0.01;
}

// Cria uma comida em uma posição aleatória
function placeFood() {
  let foodPos;

  do {
    foodPos = createVector(floor(random(cols)), floor(random(rows)));
  } while (grid[foodPos.x][foodPos.y].terrainType === 0);
  
  food = new Food(foodPos);
}

// Cria o agente em uma posição aleatória
function placeAgente() {
  let agentPos;

  do {
    agentPos = createVector(floor(random(cols)), floor(random(rows)));
  } while (grid[agentPos.x][agentPos.y].terrainType === 0);

  return new Agent(agentPos.x, agentPos.y);
}

// Cria a matriz de adjacência a partir do grid (desconsiderando os obstáculos)
function createGraph() {
  let graph = new Array(cols * rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      if (grid[i][j].terrainType !== 0) {
        graph[index] = [];
        // Adicione vizinhos válidos e seus custos
        addValidNeighbor(graph, index, i - 1, j, grid[i][j].cost);
        addValidNeighbor(graph, index, i + 1, j, grid[i][j].cost);
        addValidNeighbor(graph, index, i, j - 1, grid[i][j].cost);
        addValidNeighbor(graph, index, i, j + 1, grid[i][j].cost);
      }
    }
  }

  return graph;
}

// Adiciona vizinho válido ao grafo com custo
function addValidNeighbor(graph, currentIndex, i, j, cost) {
  if (i >= 0 && i < cols && j >= 0 && j < rows && grid[i][j].terrainType !== 0) {
    let neighborIndex = i + j * cols;
    let border = [neighborIndex, cost];
    graph[currentIndex].push(border);
  }
}

// desenha o caminho encontrado
function drawPath(path) {

  for (let i = 0; i < path.length - 1; i++) {
    let currentVertex = cellPos(path[i]);
    let nextVertex = cellPos(path[i + 1]);
    // Desenha uma linha entre os vértices consecutivos no caminho
    stroke(255, 0, 255);
    strokeWeight(4);
    line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y);
  }
}

// retorna a posição dos pixels de uma determinada cell
function cellPos(n) {
  let j = floor(n/20);
  let i = n - j * 20;
  return createVector(i * 20 + 10, j * 20 + 10);
}