import Money from './Money';

class Franc extends Money {
  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }
}

export default Franc;
