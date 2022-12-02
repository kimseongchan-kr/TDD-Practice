class Dollar {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  get amount() {
    return this.#amount;
  }

  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }

  equals(object) {
    const dollar = object;

    return this.#amount === dollar.#amount;
  }
}

export default Dollar;
