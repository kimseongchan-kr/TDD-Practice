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
    return new Dollar(amount);
  }

  static franc(amount) {
    return new Franc(amount);
  }
}

class Dollar extends Money {
  currency = 'USD';

  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Dollar(super.amount * multiplier);
  }
}

class Franc extends Money {
  currency = 'CHF';

  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Franc(super.amount * multiplier);
  }
}

export default Money;
