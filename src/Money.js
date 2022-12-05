class Money {
  #amount;

  constructor(amount) {
    this.#amount = amount;
    if (this.times === undefined) {
      throw new TypeError('Must override method');
    }
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

  static franc(amount) {
    return new Franc(amount);
  }
}

class Dollar extends Money {
  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Dollar(super.amount * multiplier);
  }
}

class Franc extends Money {
  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Franc(super.amount * multiplier);
  }
}

export default Money;
