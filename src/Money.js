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

    return this.#amount === money.amount && this.#currency === object.currency;
  }

  times(multiplier) {
    return new Money(this.#amount * multiplier, this.#currency);
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
    return new Money(super.amount * multiplier, super.currency);
  }
}

class Franc extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    return new Money(super.amount * multiplier, super.currency);
  }
}

export default Money;
