class Pair {
  #from;
  #to;

  constructor(from: string, to: string) {
    this.#from = from;
    this.#to = to;
  }

  get key() {
    return [this.#from, this.#to].sort().join('');
  }
}

export default Pair;
