import Bank from './Bank';
import Money from './Money';

interface Expression {
  reduce(bank: Bank, to: string): Money;
  plus(addend: Expression): any;
}

export default Expression;
