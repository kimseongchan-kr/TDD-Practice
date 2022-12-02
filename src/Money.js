class Money {
  amount;

  constructor(amount) {
    this.amount = amount;
  }

  equals(object) {
    const money = object;

    return this.amount === money.amount;
  }
}

export default Money;
