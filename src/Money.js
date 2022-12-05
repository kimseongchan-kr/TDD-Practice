class Money {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  get amount() {
    return this.#amount;
  }

  equals(object) {
    const money = object;

    return this.#amount === money.amount && this.constructor.name === object.constructor.name;
  }

  static dollar(amount) {
    return new Dollar(amount);
  }
}

export default Money;

class Dollar {}
