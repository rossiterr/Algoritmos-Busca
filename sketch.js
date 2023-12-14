let cols, rows;
let grid = [];
let agent;
let food;
let path = [];

function setup() {
  createCanvas(400, 400);
  cols = width / 20;
  rows = height / 20;

  // Passo 1: Gera o mapa aleatório
  generateMap();

  // Passo 2: O usuário escolhe qual tipo de busca será executada

  // Passo 3: Agente aparece em uma posição aleatória
  agent = new Agent(floor(random(cols)), floor(random(rows)));

  // Passo 4: Comida aparece em uma posição aleatória
  placeFood();

  // Passo 5: Agente percebe a comida
  agent.setGoal(food);

  // Passo 6: Agente realiza a busca

  // Passo 7: Resultado da busca (caminho)
  path = agent.getPath();

  // Definição do frame rate
  frameRate(5);
}

function draw() {
  background(255);

  // Desenha o ambiente
  drawGrid();

  // Passo 8: Agente se desloca em direção à comida
  agent.move();

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

// Cria o grid com os terrenos escolhidos aleatoriamente
function generateMap() {
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      let terrainType = floor(random(4)); // 0: obstáculo, 1: grama, 2: lama, 3: água
      grid[i][j] = new Cell(i, j, terrainType);
    }
  }
}

function placeFood() {
  let foodPos;

  do {
    foodPos = createVector(floor(random(cols)), floor(random(rows)));
  } while (grid[foodPos.x][foodPos.y].terrainType === 0);
  
  food = new Food(foodPos);
}