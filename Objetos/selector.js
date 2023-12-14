class Selector {
    constructor(){
      this.dropdown = createSelect();
      this.dropdown.option('BFS');
      this.dropdown.option('DFS');
      this.dropdown.option('Custo Uniforme');
      this.dropdown.option('Gulosa');
      this.dropdown.option('A*');
    }
  }