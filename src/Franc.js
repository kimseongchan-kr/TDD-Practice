class Franc {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  get amount() {
    return this.#amount;
  }

  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }

  equals(object) {
    const franc = object;

    return this.#amount === franc.#amount;
  }
}

export default Franc;
