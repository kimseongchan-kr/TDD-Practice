class Money {
  amount;

  constructor(amount) {
    this.amount = amount;
  }

  equals(object) {
    const money = object;

    return this.amount === money.amount && this.constructor.name === object.constructor.name;
  }
}

export default Money;
