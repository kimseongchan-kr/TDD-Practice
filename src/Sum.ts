import Bank from './Bank';
import Expression from './Expression';
import Money from './Money';

class Sum implements Expression {
  augend: Expression;
  addend: Expression;

  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank: Bank, to: string) {
    const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
    return new Money(amount, to);
  }

  plus(addend: Expression) {
    return null;
  }
}

export default Sum;
