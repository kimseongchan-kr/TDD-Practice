import Bank from './Bank';

interface Expression {
  amount: number;
  reduce(bank: Bank, to: string): Expression;
}

export default Expression;
