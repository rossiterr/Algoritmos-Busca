let cols, rows;
let grid = [];
let agent;
let food;
let path = [];
let noiseOffsetX = 0;
let noiseOffsetY = 0;

function setup() {
  createCanvas(400, 400);
  cols = width / 20;
  rows = height / 20;

  // Passo 1: Gera o mapa aleatório
  generateMap();

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
    agent.search(selector.dropdown.value());
  });
  
  // Passo 7: O agente recebe o caminho

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

function placeFood() {
  let foodPos;

  do {
    foodPos = createVector(floor(random(cols)), floor(random(rows)));
  } while (grid[foodPos.x][foodPos.y].terrainType === 0);
  
  food = new Food(foodPos);
}

function placeAgente() {
  let agentPos;

  do {
    agentPos = createVector(floor(random(cols)), floor(random(rows)));
  } while (grid[agentPos.x][agentPos.y].terrainType === 0);

  return new Agent(agentPos.x, agentPos.y);
}