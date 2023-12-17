class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  // Adiciona elemento 
  put(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  // Remove e retorna o elemento 
  get() {
    if (this.empty()) {
      return null;
    }
    return this.elements.shift().element;
  }

  // fila está vazia?
  empty() {
    return this.elements.length === 0;
  }
}