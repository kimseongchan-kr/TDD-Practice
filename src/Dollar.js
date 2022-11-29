class Dollar {
  constructor(amount) {
    this.amount = amount;
  }

  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }

  equals(object) {
    const Dollar = object;
    return this.amount === Dollar.amount;
  }
}

export default Dollar;
