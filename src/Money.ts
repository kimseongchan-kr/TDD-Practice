import Bank from './Bank';
import Expression from './Expression';
import Sum from './Sum';

class Money {
  #amount: number;
  #currency: string;

  constructor(amount: number, currency: string) {
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

  equals(object: Money) {
    const money = object;

    return this.#amount === money.amount && this.#currency === object.currency;
  }

  times(multiplier: number) {
    return new Money(this.#amount * multiplier, this.#currency);
  }

  plus(object: Expression) {
    return new Sum(this, object);
  }

  reduce(bank: Bank, to: string) {
    const rate = bank.rate(this.#currency, to);
    return new Money(this.#amount / rate, to);
  }

  static dollar(amount: number) {
    return new Money(amount, 'USD');
  }

  static franc(amount: number) {
    return new Money(amount, 'CHF');
  }
}

export default Money;
