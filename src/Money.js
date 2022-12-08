class Money {
  #amount;
  #currency;

  constructor(amount, currency) {
    this.#amount = amount;
    this.#currency = currency;

    if (!this.times) {
      throw new TypeError('Must override method');
    }
  }

  get amount() {
    return this.#amount;
  }

  get currency() {
    return this.#currency;
  }

  equals(object) {
    const money = object;

    return this.#amount === money.amount && this.constructor.name === object.constructor.name;
  }

  static dollar(amount) {
    return new Dollar(amount, 'USD');
  }

  static franc(amount) {
    return new Franc(amount, 'CHF');
  }
}

class Dollar extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    return Money.dollar(super.amount * multiplier, super.currency);
  }
}

class Franc extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    return new Franc(super.amount * multiplier, super.currency);
  }
}

export default Money;
