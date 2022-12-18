import Expression from './Expression';
import Money from './Money';

class Bank {
  reduce(source: Expression, to: string) {
    return source.reduce(this, to);
  }

  rate(from: string, to: string) {
    return from === 'CHF' && to === 'USD' ? 2 : 1;
  }
}

export default Bank;
