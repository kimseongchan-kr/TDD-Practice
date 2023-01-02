import Bank from './Bank';

interface Expression {
  reduce(bank: Bank, to: string): Expression;
  plus(addend: Expression): any;
}

export default Expression;
