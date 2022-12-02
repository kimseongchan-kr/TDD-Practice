import Money from './Money';

class Franc extends Money {
  get amount() {
    return this.amount;
  }

  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }
}

export default Franc;
