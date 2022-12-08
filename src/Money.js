class Money {
  #amount;

  constructor(amount) {
    this.#amount = amount;

    if (!this.times && !this.currency) {
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

  getCurrency() {
    return this.currency;
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
    super(amount);
    this.currency = currency;
  }

  times(multiplier) {
    return Money.dollar(super.amount * multiplier);
  }
}

class Franc extends Money {
  constructor(amount, currency) {
    super(amount);
    this.currency = currency;
  }

  times(multiplier) {
    return Money.franc(super.amount * multiplier);
  }
}

export default Money;
