class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  // Adiciona um elemento à fila com uma determinada prioridade
  put(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  // Remove e retorna o elemento com a maior prioridade
  get() {
    if (this.empty()) {
      return null;
    }
    return this.elements.shift().element;
  }

  // Verifica se a fila está vazia
  empty() {
    return this.elements.length === 0;
  }
}