import Bank from './Bank';

interface Expression {
  reduce(bank: Bank, to: string): unknown;
}

export default Expression;
