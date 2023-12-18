# Projeto de Busca e Movimento em Ambiente Dinâmico

Este projeto implementa um ambiente de busca e movimento em JavaScript, utilizando a biblioteca p5.js para renderização gráfica. O objetivo do agente é encontrar e se deslocar em direção à comida em um ambiente dinâmico composto por diferentes tipos de terrenos.

## Funcionalidades Principais

1. **Geração Aleatória do Mapa:**
   - O mapa é gerado aleatoriamente usando Perlin Noise para definir os diferentes tipos de terrenos, incluindo obstáculos, areia, atoleiro e água.

2. **Busca no Grafo:**
   - O agente utiliza diferentes algoritmos de busca para encontrar o caminho até a comida no ambiente, considerando o mapa gerado.

3. **Movimento do Agente:**
   - Após a busca, o agente se move em direção à comida, adaptando sua velocidade com base no tipo de terreno.

4. **Interação do Usuário:**
   - O usuário pode iniciar a busca e o movimento do agente por meio de botões interativos na interface.

5. **Fila de Prioridade:**
   - A classe `PriorityQueue` foi implementada para auxiliar nos algoritmos de busca, garantindo uma ordenação eficiente dos elementos com base em prioridades.

6. **Classe Agente:**
   - A classe `Agent` representa o agente no ambiente. Ela inclui métodos para definir o objetivo, realizar buscas, movimentar-se e verificar se chegou à comida.

7. **Classe Cell:**
   - A classe `Cell` representa as células no ambiente. Cada célula possui características como tipo de terreno, custo associado, e métodos para exibir visualmente no mapa.

8. **Classe Food:**
   - A classe `Food` representa a comida no ambiente. Ela possui uma posição e métodos para exibir visualmente no mapa.

9. **Classe Selector:**
   - A classe `Selector` representa o seletor de algoritmos. Ela cria um dropdown que permite ao usuário escolher entre os algoritmos de busca disponíveis, incluindo BFS, DFS, Custo Uniforme, Gulosa e A*.

## Instruções de Uso

1. Abra o arquivo `index.html` em um navegador web.

## Dependências

- [p5.js](https://p5js.org/): Biblioteca JavaScript para facilitar a criação de gráficos e interações.

## Estrutura do Projeto

- `index.html`: Página principal que incorpora todos os scripts necessários.
- `sketch.js`: Contém o código principal do projeto.
- `PriorityQueue.js`: Implementação da classe de Fila de Prioridade.
- `Objetos/agent.js`: Definição da classe Agente.
- `Objetos/cell.js`: Definição da classe Cell.
- `Objetos/food.js`: Definição da classe Food.
- `Objetos/selector.js`: Definição da classe Selector.

## Desenvolvimento

O projeto foi desenvolvido como parte de um experimento para simular a movimentação de um agente em um ambiente dinâmico.

## Autores

- Juan Felipe Serafim dos Santos ([jfss](https://github.com/JuanFelipeSerafim))
- Rodrigo Rossiter Guimaraes Filho ([rrgf](https://github.com/rossiterr))

