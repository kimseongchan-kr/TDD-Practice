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

  plus(amount) {
    return new Money(this.#amount + amount, this.#currency);
  }

  static dollar(amount) {
    return new Money(amount, 'USD');
  }

  static franc(amount) {
    return new Money(amount, 'CHF');
  }
}

export default Money;
